// import type { QueryAccNameRequest, QueryAccNameResponse } from "../types/account.inq";
// import ValidateError from "../utils/validateError";
import {isAllowedCurrency} from "../utils/validate.currency";
import depositRepo from "../repo/deposit.repo";
// import transferRepo from "../repo/transfer.repo";
// import validTellers from "../repo/teller.repo";
import { extractAccount, extractCurrency } from "../utils/extract.account";


const queryAccNameService = {
	QueryAccNameService: {
		QueryAccNameServicePort: {
			// @ts-ignore
			QueryAccName: async function (args: any) {
				try {
					const { ATMID, AccNum } = args;
					if (!ATMID) {
						return {
							QueryAccNameResult: "12",
						};
					}
					if (!AccNum) {
						return {
							QueryAccNameResult: "12",
						};
					}
					let account = extractAccount(AccNum);
					let currency = extractCurrency(AccNum);
					
					switch (isAllowedCurrency(currency.fromCurrency)) {
						case true:
							console.log("You're use deposit case");
							const deposit = await depositRepo(ATMID, AccNum);
							// console.log(deposit);
							
							return {
								QueryAccNameResult: deposit.QueryAccNameResult,
							};
						case false:
							console.log("You're use transfer case");
							break;
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

export default queryAccNameService;
