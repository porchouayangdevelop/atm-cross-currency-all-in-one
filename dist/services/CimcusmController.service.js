"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cif_repo_1 = require("../repo/cif.repo");
const validateError_1 = __importDefault(require("../utils/validateError"));
const validate_1 = require("../utils/validate");
const countrycode_repo_1 = require("../repo/countrycode.repo");
const CimcusmControllerService = {
    CimcusmControllerService: {
        CimcusmControllerServicePort: {
            getCimcusmByCif: async (args, cb) => {
                try {
                    const { cif, type } = args;
                    (0, validate_1.validateNull)(cif, 'cif');
                    (0, validate_1.validateUpperCase)(type, 'card type');
                    (0, validate_1.validateCardType)(type, 'card type');
                    const result = await (0, cif_repo_1.getUpiCard)(cif, type);
                    if (!result) {
                        throw new validateError_1.default('no data', 400);
                    }
                    const cus = result.cus;
                    (0, validate_1.validateNull)(cus.customer_engname, 'customer_engname');
                    (0, validate_1.validateNull)(cus.province_code, 'province_code');
                    (0, validate_1.validateNull)(cus.city_code, 'city_code');
                    (0, validate_1.validateNull)(cus.province_code, 'province_code');
                    (0, validate_1.validateNull)(cus.tel_no, 'tel_no');
                    if (!result.accounts.length) {
                        throw new validateError_1.default('No account', 400);
                    }
                    (0, validate_1.validateNull)(result.accounts[0].e_acname, 'accounts.name');
                    const processCard = {
                        accountCurrencyCode: result.accounts.map((ccy) => ccy.ccy).join(';') + ';',
                        accountName: result.accounts[0].e_acname,
                        acct: result.accounts.map((act) => act.acct).join(';') + ';',
                        acctType: result.accounts.map((type) => type.acct_type).join(';') + ';',
                        address1: cus.address1,
                        address2: cus.address2,
                        birthOfDate: cus.date_birth,
                        branch: cus.ci_branch,
                        brn: result.accounts.map((br) => br.acct_branchcode).join(';') + ';',
                        cif: cif,
                        countAcct: result.accounts.length,
                        customerGender: cus.customer_gender,
                        customerIDType: cus.customer_id_type,
                        customerName: cus.customer_engname,
                        customerTitle: cus.customer_title,
                        email: cus.email,
                        faxNo: cus.fax_no,
                        handPhone: cus.tel_no,
                        nationalityCode: await (0, countrycode_repo_1.getCountryCode)(cus.customer_nationality_code),
                        status: result.accounts[0].ac_sts,
                        tellNo: cus.tel_no,
                        tellNo2: cus.tel_no2
                    };
                    console.log("processCard", processCard);
                    cb(null, {
                        'return': processCard
                    });
                }
                catch (err) {
                    cb({ 'return': err });
                }
            }
        }
    }
};
exports.default = CimcusmControllerService;
//# sourceMappingURL=CimcusmController.service.js.map