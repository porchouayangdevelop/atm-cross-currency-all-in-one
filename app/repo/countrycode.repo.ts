import {countryPromisePool} from "../configs/db.config";
import {validateNull, validateUpperCase} from "../utils/validate";
import validateError from "../utils/validateError";

export const getCountryCode = async (nationality:string) => {
	let connect = await countryPromisePool.getConnection();
	try {
		validateNull(nationality,'nationality code');
		validateUpperCase(nationality,'nationality code');
		const [rows] = await connect.execute(`Select *
                                          from country_code
                                          where alpha2_code = ? `,[nationality]);
		if(!rows){
			throw new validateError('NationalCode not found',400);
		}
		
		return rows.numeric_code;
	} catch (err: any) {
		throw err.message;
	} finally {
		if (connect) await connect.release();
	}
}


