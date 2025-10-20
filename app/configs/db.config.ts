import {createPool} from 'mariadb';

import {AppConfig} from './app.config'


const config = {
	connectTimeout: 30000,
	acquireTimeout: 5000,
	connectionLimit: 10,
	charset: 'utf8',
	idleTimeout: 5000,
	trace: true,
	socketTimeout: 5000,
	queryTimeout: 5000,
}

export const PromisePool = createPool({
	host: AppConfig.database?.external?.core.host,
	port: AppConfig.database?.external?.core.port,
	user: AppConfig.database?.external?.core.user,
	password: AppConfig.database?.external?.core.password,
	database: AppConfig.database?.external?.core.database,
	...config,
	connectAttributes: {
		_CLIENT_NAME: "CORE_NAME",
	},
});


export const odsPromisePool = createPool({
	host: AppConfig.database?.external?.ods.host,
	port: AppConfig.database?.external?.ods.port,
	user: AppConfig.database?.external?.ods.user,
	password: AppConfig.database?.external?.ods.password,
	database: AppConfig.database?.external?.ods.database,
	...config,
	connectAttributes: {
		_CLIENT_NAME: "ODS_NAME",
	},
})

export const storePromisePool = createPool({
	host: AppConfig.database?.internal?.cardzoneLog?.host,
	port: AppConfig.database?.internal?.cardzoneLog?.port,
	user: AppConfig.database?.internal?.cardzoneLog?.user,
	password: AppConfig.database?.internal?.cardzoneLog?.password,
	database: AppConfig.database?.internal?.cardzoneLog?.database,
	...config,
	connectAttributes: {
		_CLIENT_NAME: "LOCAL_STORE_NAME",
	},
})

export const countryPromisePool = createPool({
	host: AppConfig.database?.internal?.upi_service?.host,
	port: AppConfig.database?.internal?.upi_service?.port,
	user: AppConfig.database?.internal?.upi_service?.user,
	password: AppConfig.database?.internal?.upi_service?.password,
	database: AppConfig.database?.internal?.upi_service?.database,
	...config,
	connectAttributes: {
		_CLIENT_NAME: "COUNTRY_STORE_NAME",
	},
})