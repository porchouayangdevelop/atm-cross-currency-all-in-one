import {exchangeClient, interestClient} from "../client/exh_i.client";
import {extractAccount, extractCurrency} from "../utils/extract.account";
import {
	allowedAccountLength,
	AllowedCCY,
	isAllowedCurrency,
	isDisallowedCurrency,
	isValidAccountsMatch,
	isValidateTargetAccountLength,
	isValidSourceAccountLength,
} from "../utils/validate.currency";
import depositRepo from "../repo/deposit.repo";
import {DepositItems, QueryAccNameResponse} from "../types/account.inq";
import {getValidateAccountMapping, getValidateFailedMessage} from "../utils/mapping";
import {SendMessageService} from "./sendMessage.service";
import {NotificationService} from "./notification.service";
import transferRepo from "../repo/transfer.repo";
import ValidateError from "../utils/validateError";
import {validateStatusRepostiry} from "../repo/status.repo";

const service = {
	SMS4ATM_UAT: {
		SMS4ATM_UATSoap: {
			// @ts-ignore
			ExchangeRate: async function (_args: any, callback: any) {
				try {
					const result = await exchangeClient();
					// console.log(result);
					callback(null, {'ExchangeRateResult': result});
				} catch (error: any) {
					console.log(error)
					callback(null, {'ExchangeRateResult': error.message});
				}
			},
			
			Interest_Rate: async function (_args: any, callback: any) {
				try {
					const result = await interestClient();
					callback(null, {'Interest_RateResult': result});
				} catch (error: any) {
					console.log(error);
					callback(null, {'Interest_RateResult': error.message});
				}
			},
			// @ts-ignore
			QueryAccName: async function (args: any) {
				try {
					let message: any;
					const {ATMID, AccNum} = args;
					if (!ATMID) {
						throw new ValidateError('Invalid ATM ID', 400);
					}
					if (!AccNum) {
						throw new ValidateError('Invalid AccNum', 400);
					}
					let account = extractAccount(AccNum);
					let currency = extractCurrency(AccNum);
					const msgService = new SendMessageService();
					const notificationService = new NotificationService(msgService);
					// let description: string;
					
					if (isDisallowedCurrency(currency.fromCurrency)) {
						return {
							QueryAccNameResult: getValidateFailedMessage('10') + `, must be one of [${AllowedCCY}]`
						}
					}
					
					switch (isAllowedCurrency(currency.fromCurrency)) {
						case true:
							const processRequest = {
								ATMID: ATMID,
								AccNum: AccNum,
							}
							
							if (isValidateTargetAccountLength(currency.targetCurrency)) {
								return {
									QueryAccNameResult: getValidateFailedMessage('09') + `, must be one of [${AllowedCCY}]`
								}
							}
							
							const deposit: DepositItems | any = await depositRepo(ATMID, AccNum);
							
							if (deposit.currency_name === 'ACCOUNT_NOT_FOUND' && deposit.status == 'ERROR') {
								message = `processing QueryAccountName : {
									processRequest: ${JSON.stringify(args)},
									result: {
										currency_code: ${deposit.currency_code},
										currency_name: ${deposit.currency_name},
										currency_symbol: ${deposit.currency_symbol},
										target_account: ${deposit.target_account},
										inquiry_timestamp: ${deposit.inquiry_timestamp},
										status: ${deposit.status},
										message: ${deposit.message},
									}
								}`
								
								console.log(`You're use deposit case. processRequest : ${JSON.stringify(processRequest)} `);
								// console.log(`From currency ${deposit.from_ccy} target to ${deposit.to_ccy}`);
								console.log(`Queue: ${deposit.currency_name}`)
								console.log(`Result: ${getValidateFailedMessage('01')}`);
								console.log('--'.repeat(20))
								
								await notificationService.sendMessageWithDeposit(message)
								return getValidateFailedMessage('01');
							}
							
							
							const isValidStatus = await validateStatusRepostiry(currency.targetCurrency);
							
							
							if (isValidStatus != '00') {
								return {
									QueryAccNameResult: `The targe account or currency status ${getValidateAccountMapping(isValidStatus)}, can not do transaction`
								}
							}
							
							
							const response: QueryAccNameResponse = {
								QueryAccNameResult: deposit.is_allowed == '1' ? deposit.name : getValidateFailedMessage('76')
							}
							
							console.log(`You're use deposit case. processRequest : ${JSON.stringify(processRequest)} `);
							console.log(`From currency ${deposit.from_ccy} target to ${deposit.to_ccy}`);
							console.log(`Queue: ${deposit.is_allowed == '1' ? 'Allowed' : getValidateFailedMessage('76')}`)
							console.log(`Result: ${response.QueryAccNameResult}`);
							console.log('--'.repeat(20))
							
							
							// sent o notification
							message = `processing QueryAccountName : {
								processRequest: ${JSON.stringify(args)},
								result: {
									acct: ${deposit.acct},
									ci: ${deposit.ci},
									name: ${deposit.name},
									ccy: ${deposit.ccy},
									transaction_type: ${deposit.transaction_type},
									is_allowed: ${deposit.is_allowed},
									from_ccy: ${deposit.from_ccy},
									to_ccy: ${deposit.to_ccy},
									status_message: ${deposit.status_message},
									timestamp: ${new Date().toISOString()},
								}
							}`
							await notificationService.sendMessageWithDeposit(message)
							return {
								QueryAccNameResult: response.QueryAccNameResult,
							}
						case false:
							console.log("You're use transfer case");
							if (isValidSourceAccountLength(account.fromAccount)) {
								return {
									QueryAccNameResult: getValidateFailedMessage('07') + `, must be one of [${allowedAccountLength}] digits length`
								}
							}
							
							if (isValidAccountsMatch(account.fromAccount, account.targetAccount)) {
								return {
									QueryAccNameResult: getValidateFailedMessage('08')
								}
							}
							
							if (isValidateTargetAccountLength(account.targetAccount)) {
								return {
									QueryAccNameResult: getValidateFailedMessage('09') + `, must be one of [${allowedAccountLength}] digits length`
								}
							}
							
							const transfer = await transferRepo(ATMID, AccNum);
							if (transfer.is_allowed === 'blocked') {
								return {
									QueryAccNameResult: getValidateFailedMessage('76')
								}
							}
							
							return {
								QueryAccNameResult: transfer.name
							}
						
						default:
							console.log("use unknown case", account);
							break;
					}
				} catch (error: any) {
					console.log("Error with:", error);
					return {
						QueryAccNameResult: error.message,
					};
				}
			},
		},
	},
};

export default service;
