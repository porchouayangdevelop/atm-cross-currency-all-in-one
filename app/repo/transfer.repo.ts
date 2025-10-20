import {PromisePool as CorePool} from "../configs/db.config";
import ValidateError from "../utils/validateError";
// import validateCode from "../utils/validate.currency";
import {extractAccount} from "../utils/extract.account";
import validTellers from "./teller.repo";

const transferRepo = async (
	ATMID: string,
	AccNum: string
): Promise<any> => {
	let connection = await CorePool.getConnection();
	try {
		if (!ATMID || !AccNum) {
			throw new ValidateError("ATMID or AccNum is empty", 400);
		}
		
		const isValidTeller = await validTellers(ATMID);
		if (!isValidTeller) {
			throw new ValidateError("Teller not found", 400);
		}
		const {fromAccount, targetAccount} = extractAccount(AccNum);
		
		const [rows] = await connection.execute(`CALL proc_account_name_v1(?,?)`, [
			fromAccount,
			targetAccount,
		]);
		
		return rows[0];
	} catch (error: any) {
		console.log(`Error processing transafer`, error.message);
		// connection.close();
		throw error;
	} finally {
		if (connection) await connection.release();
	}
};

export default transferRepo;
