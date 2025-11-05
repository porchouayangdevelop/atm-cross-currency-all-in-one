"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../configs/db.config");
const validateError_1 = __importDefault(require("../utils/validateError"));
const validate_currency_1 = require("../utils/validate.currency");
const extract_account_1 = require("../utils/extract.account");
const teller_repo_1 = __importDefault(require("./teller.repo"));
const depositRepo = async (ATMID, AccNum) => {
    let connection = await db_config_1.PromisePool.getConnection();
    try {
        if (!ATMID) {
            throw new validateError_1.default("ATMID is required", 400);
        }
        if (!AccNum) {
            throw new validateError_1.default("AccNum is required", 400);
        }
        const isValidTeller = await (0, teller_repo_1.default)(ATMID);
        if (!isValidTeller) {
            throw new validateError_1.default("Teller not found", 400);
        }
        const { fromCurrency, targetCurrency } = (0, extract_account_1.extractCurrency)(AccNum);
        if ((0, validate_currency_1.isAllowedCurrency)(fromCurrency)) {
            const [rows] = await connection.execute(`CALL proc_deposit_cross_currency_inquiry(?,?)`, [fromCurrency, targetCurrency]);
            if (!rows || rows.length === 0) {
                throw new validateError_1.default("Not found", 401);
            }
            return rows[0];
        }
        else {
            throw new validateError_1.default("currency code is not valid", 400);
        }
    }
    catch (error) {
        console.log("Error processing deposit ", error);
        throw new validateError_1.default(`depositRepo error: ${error}`, 400);
    }
    finally {
        if (connection)
            await connection.release();
    }
};
exports.default = depositRepo;
//# sourceMappingURL=deposit.repo.js.map