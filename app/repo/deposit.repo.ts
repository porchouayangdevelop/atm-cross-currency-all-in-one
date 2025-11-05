import {PromisePool as CorePool} from "../configs/db.config";
import ValidateError from "../utils/validateError";
import {isAllowedCurrency} from "../utils/validate.currency";
import {extractCurrency} from "../utils/extract.account";
// import type {DepositItems} from "../types/account.inq";
// import { getValidateFailedMessage } from "../utils/mapping";
import validTellers from "./teller.repo";

const depositRepo = async (
	ATMID: string,
	AccNum: string
): Promise<any> => {
	let connection = await CorePool.getConnection();
	try {
		if (!ATMID) {
			throw new ValidateError("ATMID is required", 400);
		}
		if (!AccNum) {
			throw new ValidateError("AccNum is required", 400);
		}
		
		const isValidTeller = await validTellers(ATMID);
		if (!isValidTeller) {
			throw new ValidateError("Teller not found", 400);
		}
		
		const {fromCurrency, targetCurrency} = extractCurrency(AccNum);
		if (isAllowedCurrency(fromCurrency)) {
			const [rows] = await connection.execute(
				`CALL proc_deposit_cross_currency_inquiry(?,?)`,
				[fromCurrency, targetCurrency]
			);
			
			if (!rows || rows.length === 0) {
				throw new ValidateError("Not found", 401);
			}
			
			return rows[0]
			
			// const mapResult = rows.map((item: DepositItems) => {
			// 	return {
			// 		// ...item,
			// 		fromCurrency: item.from_ccy,
			// 		targetCurrency: item.to_ccy,
			// 		targetAccount: item.acct,
			// 		is_allow: item.is_allowed,
			// 		status: item.is_allowed == "1" ? "allowed" : "blocked",
			// 		transactionType: item.transaction_type,
			// 		QueryAccNameResult: item.name,
			// 	};
			// });
			//
			// return {
			// 	QueryAccNameResult:
			// 		mapResult[0].status === "allowed"
			// 			? mapResult[0].QueryAccNameResult
			// 			: "76",
			// };
		} else {
			throw new ValidateError("currency code is not valid", 400);
		}
	} catch (error: any) {
		console.log("Error processing deposit ", error);
		throw new ValidateError(`depositRepo error: ${error}`, 400);
	} finally {
		if (connection) await connection.release();
	}
};

export default depositRepo;
