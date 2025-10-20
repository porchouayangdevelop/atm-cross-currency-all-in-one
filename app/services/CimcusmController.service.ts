import {getUpiCard} from "../repo/cif.repo";
import ValidateError from "../utils/validateError";
import {validateCardType, validateNull, validateUpperCase} from "../utils/validate";
import {Accounts, Customer} from "../types/customer";
import {Cimcusm} from "../types/cimcusm";
import {getCountryCode} from "../repo/countrycode.repo";
// import {Cimcusm} from "../types/cimcusm";

const CimcusmControllerService = {
	CimcusmControllerService: {
		CimcusmControllerServicePort: {
			getCimcusmByCif: async (args: any, cb: any) => {
				try {
					const {cif, type} = args;
					validateNull(cif, 'cif');
					// validateNull(type, 'card type');
					validateUpperCase(type, 'card type');
					validateCardType(type, 'card type');
					
					
					const result = await getUpiCard(cif, type);
					
					if (!result) {
						throw new ValidateError('no data', 400);
					}
					
					const cus: Customer = result.cus;
					
					validateNull(cus.customer_engname, 'customer_engname');
					validateNull(cus.province_code, 'province_code');
					validateNull(cus.city_code, 'city_code');
					validateNull(cus.province_code, 'province_code');
					validateNull(cus.tel_no, 'tel_no');
					
					
					if (!result.accounts.length) {
						throw new ValidateError('No account', 400);
					}
					
					validateNull(result.accounts[0].e_acname, 'accounts.name');
					
					
					const processCard: Cimcusm = {
						accountCurrencyCode: result.accounts.map((ccy: Accounts) => ccy.ccy).join(';') + ';',
						accountName: result.accounts[0].e_acname,
						acct: result.accounts.map((act: Accounts) => act.acct).join(';') + ';',
						acctType: result.accounts.map((type: Accounts) => type.acct_type).join(';') + ';',
						address1: cus.address1,
						address2: cus.address2,
						birthOfDate: cus.date_birth,
						branch: cus.ci_branch,
						brn: result.accounts.map((br: Accounts) => br.acct_branchcode).join(';') + ';',
						cif: cif,
						countAcct: result.accounts.length,
						customerGender: cus.customer_gender,
						customerIDType: cus.customer_id_type,
						customerName: cus.customer_engname,
						customerTitle: cus.customer_title,
						email: cus.email,
						faxNo: cus.fax_no,
						handPhone: cus.tel_no,
						nationalityCode: await getCountryCode(cus.customer_nationality_code),
						status: result.accounts[0].ac_sts,
						tellNo: cus.tel_no,
						tellNo2: cus.tel_no2
					}
					
					console.log("processCard", processCard);
					
					
					cb(null, {
						'return': processCard
					});
				} catch (err: any) {
					cb({'return': err});
				}
			}
		}
	}
	
}

export default CimcusmControllerService;