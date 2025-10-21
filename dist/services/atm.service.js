"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exh_i_client_1 = require("../client/exh_i.client");
const extract_account_1 = require("../utils/extract.account");
const validate_currency_1 = __importDefault(require("../utils/validate.currency"));
const deposit_repo_1 = __importDefault(require("../repo/deposit.repo"));
const mapping_1 = require("../utils/mapping");
const sendMessage_service_1 = require("./sendMessage.service");
const notification_service_1 = require("./notification.service");
const transfer_repo_1 = __importDefault(require("../repo/transfer.repo"));
const validateError_1 = __importDefault(require("../utils/validateError"));
const service = {
    SMS4ATM_UAT: {
        SMS4ATM_UATSoap: {
            ExchangeRate: async function (_args, callback) {
                try {
                    const result = await (0, exh_i_client_1.exchangeClient)();
                    callback(null, { 'ExchangeRateResult': result });
                }
                catch (error) {
                    console.log(error);
                    callback(null, { 'ExchangeRateResult': error.message });
                }
            },
            Interest_Rate: async function (_args, callback) {
                try {
                    const result = await (0, exh_i_client_1.interestClient)();
                    callback(null, { 'Interest_RateResult': result });
                }
                catch (error) {
                    console.log(error);
                    callback(null, { 'Interest_RateResult': error.message });
                }
            },
            QueryAccName: async function (args) {
                try {
                    let message;
                    const { ATMID, AccNum } = args;
                    if (!ATMID) {
                        throw new validateError_1.default('Invalid ATM ID', 400);
                    }
                    if (!AccNum) {
                        throw new validateError_1.default('Invalid AccNum', 400);
                    }
                    let account = (0, extract_account_1.extractAccount)(AccNum);
                    let currency = (0, extract_account_1.extractCurrency)(AccNum);
                    const msgService = new sendMessage_service_1.SendMessageService();
                    const notificationService = new notification_service_1.NotificationService(msgService);
                    switch ((0, validate_currency_1.default)(currency.fromCurrency)) {
                        case true:
                            console.log("You're use deposit case");
                            const deposit = await (0, deposit_repo_1.default)(ATMID, AccNum);
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
								}`;
                                await notificationService.sendMessageWithDeposit(message);
                                return (0, mapping_1.getValidateFailedMessage)('01');
                            }
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
							}`;
                            await notificationService.sendMessageWithDeposit(message);
                            const response = {
                                QueryAccNameResult: deposit.is_allowed == '1' ? deposit.name : (0, mapping_1.getValidateFailedMessage)('76')
                            };
                            return {
                                QueryAccNameResult: response.QueryAccNameResult,
                            };
                        case false:
                            console.log("You're use transfer case");
                            const transfer = await (0, transfer_repo_1.default)(ATMID, AccNum);
                            if (transfer.is_allowed === 'blocked') {
                                return {
                                    QueryAccNameResult: (0, mapping_1.getValidateFailedMessage)('76')
                                };
                            }
                            return {
                                QueryAccNameResult: transfer.name
                            };
                        default:
                            console.log("use unknown case", account);
                            break;
                    }
                }
                catch (error) {
                    console.log("Error with:", error);
                    return {
                        QueryAccNameResult: error.message,
                    };
                }
            },
        },
    },
};
exports.default = service;
//# sourceMappingURL=atm.service.js.map