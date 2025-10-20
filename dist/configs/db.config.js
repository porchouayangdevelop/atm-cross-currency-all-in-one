"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromisePool = void 0;
const mariadb_1 = require("mariadb");
const app_config_1 = require("./app.config");
const config = {
    connectTimeout: 30000,
    acquireTimeout: 5000,
    connectionLimit: 10,
    charset: 'utf8',
    idleTimeout: 5000,
    trace: true,
    socketTimeout: 5000,
    queryTimeout: 5000,
};
exports.PromisePool = (0, mariadb_1.createPool)({
    host: app_config_1.AppConfig.database?.host,
    port: app_config_1.AppConfig.database?.port,
    user: app_config_1.AppConfig.database?.user,
    password: app_config_1.AppConfig.database?.password,
    database: app_config_1.AppConfig.database?.database,
    ...config
});
//# sourceMappingURL=db.config.js.map