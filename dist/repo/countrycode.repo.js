"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCode = void 0;
const db_config_1 = require("../configs/db.config");
const validate_1 = require("../utils/validate");
const validateError_1 = __importDefault(require("../utils/validateError"));
const getCountryCode = async (nationality) => {
    let connect = await db_config_1.countryPromisePool.getConnection();
    try {
        (0, validate_1.validateNull)(nationality, 'nationality code');
        (0, validate_1.validateUpperCase)(nationality, 'nationality code');
        const [rows] = await connect.execute(`Select *
                                          from country_code
                                          where alpha2_code = ? `, [nationality]);
        if (!rows) {
            throw new validateError_1.default('NationalCode not found', 400);
        }
        return rows.numeric_code;
    }
    catch (err) {
        throw err.message;
    }
    finally {
        if (connect)
            await connect.release();
    }
};
exports.getCountryCode = getCountryCode;
//# sourceMappingURL=countrycode.repo.js.map