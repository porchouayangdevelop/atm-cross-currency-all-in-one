"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';
const result = (0, dotenv_1.config)({
    path: path_1.default.resolve(process.cwd(), env),
});
if (result.error) {
    console.error('Error while running app config with load environment available :', result.error);
    throw result.error;
}
else {
    console.log('Environment variable load successfully :', process.env.NODE_ENV, 'MODE');
}
const internalConfig = {
    host: process.env.S_DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.S_DB_USER,
    password: process.env.S_DB_PASS,
};
exports.AppConfig = {
    server: {
        httpHost: process.env.HOST,
        httpPort: Number(process.env.PORT)
    },
    database: {
        internal: {
            cardzoneLog: {
                ...internalConfig,
                database: process.env.S_DB_NAME,
            },
            upi_service: process.env.NODE_ENV === 'development' ? {
                ...internalConfig,
                database: process.env.S_UPI_NAME,
            } : {
                ...internalConfig,
                database: process.env.S_UPI_NAME,
            }
        },
        external: {
            core: {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            },
            ods: {
                host: process.env.ODS_DB_HOST,
                port: Number(process.env.ODS_DB_PORT),
                user: process.env.ODS_DB_USER,
                password: process.env.ODS_DB_PASS,
                database: process.env.ODS_DB_NAME,
            }
        }
    },
    queue: {
        host: process.env.RABBIT_HOST,
        port: Number(process.env.RABBIT_PORT),
        user: process.env.RABBIT_USER,
        password: process.env.RABBIT_PASSWORD,
    },
    externalApi: process.env.ATM_CLIENT_URL,
    slackConfig: {
        token: process.env.SLACK_TOKEN,
        id: process.env.SLACK_ID,
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACL_SIGING_SECRET,
        verifyToken: process.env.SLACK_VERIFY_TOKEN,
        bothAuthToken: process.env.SLACK_BOT_AUTH_TOKEN,
        webhookUrl: process.env.ATM_CROSS_CURRENCY_WEBHOOK_URL
    }
};
//# sourceMappingURL=app.config.js.map