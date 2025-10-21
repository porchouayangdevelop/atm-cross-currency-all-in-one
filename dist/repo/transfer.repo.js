"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../configs/db.config");
const validateError_1 = __importDefault(require("../utils/validateError"));
const extract_account_1 = require("../utils/extract.account");
const teller_repo_1 = __importDefault(require("./teller.repo"));
const transferRepo = async (ATMID, AccNum) => {
    let connection = await db_config_1.PromisePool.getConnection();
    try {
        if (!ATMID || !AccNum) {
            throw new validateError_1.default("ATMID or AccNum is empty", 400);
        }
        const isValidTeller = await (0, teller_repo_1.default)(ATMID);
        if (!isValidTeller) {
            throw new validateError_1.default("Teller not found", 400);
        }
        const { fromAccount, targetAccount } = (0, extract_account_1.extractAccount)(AccNum);
        const [rows] = await connection.execute(`CALL proc_account_name_v1(?,?)`, [
            fromAccount,
            targetAccount,
        ]);
        return rows[0];
    }
    catch (error) {
        console.log(`Error processing transafer`, error.message);
        throw error;
    }
    finally {
        if (connection)
            await connection.release();
    }
};
exports.default = transferRepo;
//# sourceMappingURL=transfer.repo.js.map