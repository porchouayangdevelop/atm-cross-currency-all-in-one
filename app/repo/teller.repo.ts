import { PromisePool as CorePool } from "../configs/db.config";

const validTellers = async (ATMID: string) => {
	let connect = await CorePool.getConnection();
	try {
		const rows = await connect.query(
			`select TLR FROM bpttlt where TLR_TYP = 'S' and TLR_CN_NM like 'ATM%' and TLR =?`,
			[ATMID]
		);
		if (rows.length === 0) {
			throw new Error("Teller not found");
		}
		return rows[0].TLR;
	} catch (error: any) {
		throw error.message;
	} finally {
		if (connect) connect.release();
	}
};

export default validTellers;
