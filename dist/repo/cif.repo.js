"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpiCard = void 0;
const db_config_1 = require("../configs/db.config");
const validateError_1 = __importDefault(require("../utils/validateError"));
const validate_1 = require("../utils/validate");
const getUpiCard = async (cif, type) => {
    let connect = await db_config_1.PromisePool.getConnection();
    try {
        if ((0, validate_1.validateLetter)(cif)) {
            throw new validateError_1.default('Cif no must be do not have string character ', 400);
        }
        if ((0, validate_1.validateLength1)(cif)) {
            throw new validateError_1.default(`Cif no: ${cif} chars: ${cif.length},  must be 12 & 16 characters.`, 400);
        }
        const [rows] = await connect.execute('call proc_debit_credit_master(?,?)', [cif, type]);
        const cus = rows.map((val) => {
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
            };
        });
        const accountList = rows.map((acct) => {
            return {
                acct: acct.acct,
                acct_branchcode: acct.acct_branchcode,
                prod_code: acct.prod_code,
                acct_type: acct.acct_type,
                l_acname: acct.l_acname,
                e_acname: acct.e_acname,
                ccy: acct.ccy,
                ac_sts: acct.ac_sts
            };
        });
        return {
            cus: cus[0],
            accounts: accountList,
        };
    }
    catch (err) {
        console.error(err.stack);
        throw err.message;
    }
    finally {
        if (connect)
            await connect.release();
    }
};
exports.getUpiCard = getUpiCard;
//# sourceMappingURL=cif.repo.js.map