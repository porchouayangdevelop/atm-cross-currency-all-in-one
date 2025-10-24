"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_currency_1 = require("../utils/validate.currency");
const deposit_repo_1 = __importDefault(require("../repo/deposit.repo"));
const extract_account_1 = require("../utils/extract.account");
const queryAccNameService = {
    QueryAccNameService: {
        QueryAccNameServicePort: {
            QueryAccName: async function (args) {
                try {
                    const { ATMID, AccNum } = args;
                    if (!ATMID) {
                        return {
                            QueryAccNameResult: "12",
                        };
                    }
                    if (!AccNum) {
                        return {
                            QueryAccNameResult: "12",
                        };
                    }
                    let account = (0, extract_account_1.extractAccount)(AccNum);
                    let currency = (0, extract_account_1.extractCurrency)(AccNum);
                    switch ((0, validate_currency_1.isAllowedCurrency)(currency.fromCurrency)) {
                        case true:
                            console.log("You're use deposit case");
                            const deposit = await (0, deposit_repo_1.default)(ATMID, AccNum);
                            return {
                                QueryAccNameResult: deposit.QueryAccNameResult,
                            };
                        case false:
                            console.log("You're use transfer case");
                            break;
                        default:
                            console.log("use unknown case", account);
                            break;
                    }
                }
                catch (error) {
                    console.log("Error with:", error);
                    return {
                        QueryAccNameResult: error.message,
                    };
                }
            },
        },
    },
};
exports.default = queryAccNameService;
//# sourceMappingURL=acctname.service.js.map