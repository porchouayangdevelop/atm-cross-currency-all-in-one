"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../configs/db.config");
const interestRateService = {
    InterestRateService: {
        InterestRateServicePort: {
            Interest_Rate: async function (callback) {
                let connection = await db_config_1.PromisePool.getConnection();
                try {
                }
                catch (error) {
                    console.log("Error with:", error);
                    callback(null, error);
                }
                finally {
                    if (connection)
                        await connection.release();
                }
            },
        },
    },
};
exports.default = interestRateService;
//# sourceMappingURL=interest_rate.service.js.map