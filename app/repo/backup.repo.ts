import type {Credentials} from "../types/Backup";
import {storePromisePool} from "../configs/db.config";


export class BackupRepo {
	
	async backupQueryAccName(credential: Credentials): Promise<void> {
		let con = await storePromisePool.getConnection();
		try {
			const envPro = process.env.NODE_ENV === "production" ? "proc_atm_deposit_cross_currency" : "proc_atm_deposit_cross_currency_uat";
			
			await con.execute(`call ${envPro}(?,?,?,?,?,?,?,?,?,?)`,
				[
					credential.atm_id,
					credential.from_currency,
					credential.to_currency,
					credential.target_account,
					credential.target_account_name,
					credential.result_message,
					credential.target_currency,
					credential.result_ccy,
					credential.transaction_type,
					credential.is_allowed
				])
		} catch (error: any) {
			console.log(`Store to backup failures : `, error.message);
			throw error.message;
		} finally {
			await con.release();
		}
	}
	
}