import {PromisePool} from "../configs/db.config";
import ValidateError from "../utils/validateError";
import {Accounts, Customer} from "../types/customer";
import {validateLength1, validateLetter} from "../utils/validate";

export const getUpiCard = async (cif: string, type: string) => {
	let connect = await PromisePool.getConnection();
	try {
		
		if (validateLetter(cif)) {
			throw new ValidateError('Cif no must be do not have string character ', 400);
		}
		
		// if (validateLength(cif)) {
		// 	throw new ValidateError(`Cif no ${cif} is not match, when cif no startWith 0000 and chars begin ${cif.length}, must be 16 characters`, 400);
		// }
		
		if (validateLength1(cif)) {
			throw new ValidateError(`Cif no: ${cif} chars: ${cif.length},  must be 12 & 16 characters.`, 400);
		}
		
		const [rows] = await connect.execute('call proc_debit_credit_master(?,?)', [cif, type]);
		
		
		const cus = rows.map((val: Customer): Customer => {
			return {
				ci_no: val.ci_no,
				ci_branch: val.ci_branch,
				customer_title: val.customer_title,
				customer_engname: val.customer_engname,
				customer_gender: val.customer_gender,
				customer_id_type: val.customer_id_type,
				date_birth: val.date_birth,
				customer_nationality_code: val.customer_nationality_code,
				address1: val.address1,
				address2: val.address2,
				address3: val.address3,
				address4: val.address4,
				village_code: val.village_code,
				v_eng_name: val.v_eng_name,
				city_code: val.city_code,
				d_eng_name: val.d_eng_name,
				province_code: val.province_code,
				p_eng_name: val.p_eng_name,
				tel_no: val.tel_no,
				tel_no2: val.tel_no2,
				email: val.email,
				fax_no: val.fax_no
			}
		})
		
		const accountList = rows.map((acct: Accounts): Accounts => {
			return {
				acct: acct.acct,
				acct_branchcode: acct.acct_branchcode,
				prod_code: acct.prod_code,
				acct_type: acct.acct_type,
				l_acname: acct.l_acname,
				e_acname: acct.e_acname,
				ccy: acct.ccy,
				ac_sts: acct.ac_sts
			}
		})
		
		return {
			cus: cus[0],
			accounts: accountList,
		}
	} catch (err: any) {
		console.error(err.stack);
		throw err.message;
	} finally {
		if (connect) await connect.release();
	}
}

