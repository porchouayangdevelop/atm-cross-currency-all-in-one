import { PromisePool as CorePool } from "../configs/db.config";
import ValidateError from "../utils/validateError";

const interestRateService = {
	InterestRateService: {
		InterestRateServicePort: {
			Interest_Rate: async function (
				callback: (result: any, error?: any) => string
			) {
				let connection = await CorePool.getConnection();
				try {
				} catch (error) {
					console.log("Error with:", error);
					callback(null, error);
				} finally {
					if (connection) await connection.release();
				}
			},
		},
	},
};

export default interestRateService;
