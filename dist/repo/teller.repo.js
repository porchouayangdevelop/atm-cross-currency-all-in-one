"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../configs/db.config");
const validTellers = async (ATMID) => {
    let connect = await db_config_1.PromisePool.getConnection();
    try {
        const rows = await connect.query(`select TLR FROM bpttlt where TLR_TYP = 'S' and TLR_CN_NM like 'ATM%' and TLR =?`, [ATMID]);
        if (rows.length === 0) {
            throw new Error("Teller not found");
        }
        return rows[0].TLR;
    }
    catch (error) {
        throw error.message;
    }
    finally {
        if (connect)
            connect.release();
    }
};
exports.default = validTellers;
//# sourceMappingURL=teller.repo.js.map