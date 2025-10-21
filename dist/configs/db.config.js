"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryPromisePool = exports.storePromisePool = exports.odsPromisePool = exports.PromisePool = void 0;
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
    host: app_config_1.AppConfig.database?.external?.core.host,
    port: app_config_1.AppConfig.database?.external?.core.port,
    user: app_config_1.AppConfig.database?.external?.core.user,
    password: app_config_1.AppConfig.database?.external?.core.password,
    database: app_config_1.AppConfig.database?.external?.core.database,
    ...config,
    connectAttributes: {
        _CLIENT_NAME: "CORE_NAME",
    },
});
exports.odsPromisePool = (0, mariadb_1.createPool)({
    host: app_config_1.AppConfig.database?.external?.ods.host,
    port: app_config_1.AppConfig.database?.external?.ods.port,
    user: app_config_1.AppConfig.database?.external?.ods.user,
    password: app_config_1.AppConfig.database?.external?.ods.password,
    database: app_config_1.AppConfig.database?.external?.ods.database,
    ...config,
    connectAttributes: {
        _CLIENT_NAME: "ODS_NAME",
    },
});
exports.storePromisePool = (0, mariadb_1.createPool)({
    host: app_config_1.AppConfig.database?.internal?.cardzoneLog?.host,
    port: app_config_1.AppConfig.database?.internal?.cardzoneLog?.port,
    user: app_config_1.AppConfig.database?.internal?.cardzoneLog?.user,
    password: app_config_1.AppConfig.database?.internal?.cardzoneLog?.password,
    database: app_config_1.AppConfig.database?.internal?.cardzoneLog?.database,
    ...config,
    connectAttributes: {
        _CLIENT_NAME: "LOCAL_STORE_NAME",
    },
});
exports.countryPromisePool = (0, mariadb_1.createPool)({
    host: app_config_1.AppConfig.database?.internal?.upi_service?.host,
    port: app_config_1.AppConfig.database?.internal?.upi_service?.port,
    user: app_config_1.AppConfig.database?.internal?.upi_service?.user,
    password: app_config_1.AppConfig.database?.internal?.upi_service?.password,
    database: app_config_1.AppConfig.database?.internal?.upi_service?.database,
    ...config,
    connectAttributes: {
        _CLIENT_NAME: "COUNTRY_STORE_NAME",
    },
});
//# sourceMappingURL=db.config.js.map