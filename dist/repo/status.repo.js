"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStatusRepostiry = void 0;
const db_config_1 = require("../configs/db.config");
const validateError_1 = __importDefault(require("../utils/validateError"));
const validateStatusRepostiry = async (resource) => {
  if (typeof resource !== "string" || !resource || resource === undefined) {
    throw new validateError_1.default("the account invalid", 400);
  }
  let con = await db_config_1.PromisePool.getConnection();
  try {
    const [rows] = await con.execute(
      `select CASE
                                                 WHEN substring(AC_STS_WORD, 1, 1) = '1' THEN '1' -- Not audited
                                                 WHEN substring(AC_STS_WORD, 2, 1) = '1' THEN '2' -- Not activated
                                                 WHEN substring(AC_STS_WORD, 3, 1) = '1' THEN '3' -- Long time hanging
                                                 WHEN substring(AC_STS_WORD, 4, 1) = '1' THEN '4' -- Dormant Account
                                                 WHEN substring(AC_STS_WORD, 5, 1) = '1' THEN '5' -- PASSWORD LOCK
                                                 WHEN substring(AC_STS_WORD, 6, 1) = '1' THEN '6' -- Passbook loss
                                                 WHEN substring(AC_STS_WORD, 7, 1) = '1' THEN '7' -- Voucher verbal loss
                                                 WHEN substring(AC_STS_WORD, 8, 1) = '1' THEN '8' -- Voucher Loss Report
                                                 WHEN substring(AC_STS_WORD, 9, 1) = '1' THEN '9' -- BLOCK NO DEBIT
                                                 WHEN substring(AC_STS_WORD, 10, 1) = '1'
                                                     THEN '10' -- Account cancellation
                                                 WHEN substring(AC_STS_WORD, 12, 1) = '1' THEN '12' -- BLOCK NO CREDIT
                                                 WHEN substring(AC_STS_WORD, 13, 1) = '1' THEN '13' -- Annual inspection
                                                 WHEN substring(AC_STS_WORD, 14, 1) = '1'
                                                     THEN '14' -- Unannual inspection
                                                 WHEN substring(AC_STS_WORD, 15, 1) = '1'
                                                     THEN '15' -- Co-branded card logo
                                                 WHEN substring(AC_STS_WORD, 16, 1) = '1'
                                                     THEN '16' -- BLOCK ACCOUNT (bank)
                                                 WHEN substring(AC_STS_WORD, 17, 1) = '1'
                                                     THEN '17' -- BLOCK ACCOUNT (authority)
                                                 WHEN substring(AC_STS_WORD, 25, 1) = '1' THEN '25' -- AMOUNT BLOCKED
                                                 WHEN substring(AC_STS_WORD, 36, 1) = '1'
                                                     THEN '36' -- DORMANT ACCOUNT(INDIVIDUAL)
                                                 WHEN substring(AC_STS_WORD, 41, 1) = '1'
                                                     THEN '41' -- Social Security Card
                                                 WHEN substring(AC_STS_WORD, 42, 1) = '1'
                                                     THEN '42' -- Interbank Agreement
                                                 WHEN substring(AC_STS_WORD, 43, 1) = '1' THEN '43' -- Unit Agreement
                                                 WHEN substring(AC_STS_WORD, 44, 1) = '1'
                                                     THEN '44' -- Unit Smart Communication
                                                 WHEN substring(AC_STS_WORD, 46, 1) = '1' THEN '46' -- Industry regular
                                                 WHEN substring(AC_STS_WORD, 47, 1) = '1' THEN '47' -- Public account
                                                 WHEN substring(AC_STS_WORD, 49, 1) = '1' THEN '49' -- Group account
                                                 WHEN substring(AC_STS_WORD, 59, 1) = '1'
                                                     THEN '59' -- Off-site account opening
                                                 WHEN substring(AC_STS_WORD, 63, 1) = '1'
                                                     THEN '63' -- Electronic account
                                                 WHEN substring(AC_STS_WORD, 70, 1) = '1'
                                                     THEN '70' -- Characteristic interest rate
                                                 WHEN substring(AC_STS_WORD, 71, 1) = '1' THEN '71' -- FROZEN ACCOUNT
                                                 WHEN substring(AC_STS_WORD, 72, 1) = '1' THEN '72' -- Normal
                                                 WHEN substring(AC_STS_WORD, 94, 1) = '1'
                                                     THEN '94' -- Transfer household
                                                 WHEN substring(AC_STS_WORD, 95, 1) = '1' THEN '95' -- Exemption fee
                                                 WHEN substring(AC_STS_WORD, 96, 1) = '1'
                                                     THEN '96' -- Fixed account online
                                                 WHEN AC_STS_WORD REGEXP '^0+$' THEN '00' -- All normal
                                                 END AS \`responseStaus\`
                                      from ddtmst
                                      where AC_STS = 'N'
                                        and AC = ?;`,
      [resource]
    );
    if (!rows || rows.length === 0) {
      throw new validateError_1.default("Not found", 401);
    }
    return rows.responseStaus;
  } catch (error) {
    throw error.message;
  } finally {
    await con.release();
  }
};
exports.validateStatusRepostiry = validateStatusRepostiry;
//# sourceMappingURL=status.repo.js.map
