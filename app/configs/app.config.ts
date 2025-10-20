// import type {AppConfigs} from '../types';

import {config} from 'dotenv';
import path from 'path';


type DatabaseConfig = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

type AppDatabase = {
	internal?: Record<'cardzoneLog' | 'upi_service', DatabaseConfig>;
	external?: Record<"core" | "ods", DatabaseConfig>;
}

interface QueueConfig {
	host: string;
	port: number;
	user: string;
	password: string;
}

interface SlackConfig {
	token: string;
	id:string;
	clientId: string;
	clientSecret: string;
	signingSecret: string;
	verifyToken: string;
	bothAuthToken: string;
	channel?: string;
	webhookUrl: string;
}

interface AppConfigs {
	server: {
		httpHost: string;
		httpPort: number;
	},
	database?: AppDatabase,
	queue?: QueueConfig,
	externalApi?: string;
	slackConfig?: SlackConfig;
}

const env = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';
const result = config({
	path: path.resolve(process.cwd(), env),
})

if (result.error) {
	console.error('Error while running app config with load environment available :', result.error);
	throw result.error;
} else {
	console.log('Environment variable load successfully :', env);
}

const internalConfig = {
	host: process.env.S_DB_HOST as string,
	port: Number(process.env.DB_PORT),
	user: process.env.S_DB_USER as string,
	password: process.env.S_DB_PASS as string,
}

export const AppConfig: AppConfigs = {
	// server config
	server: {
		httpHost: process.env.HOST as string,
		httpPort: Number(process.env.PORT)
	},
	
	// database config
	database: {
		internal: {
			cardzoneLog: {
				...internalConfig,
				database: process.env.S_DB_NAME as string,
			},
			upi_service: process.env.NODE_ENV === 'development' ? {
				...internalConfig,
				database: process.env.S_UPI_NAME as string,
			} : {
				...internalConfig,
				database: process.env.S_UPI_NAME as string,
			}
		},
		external: {
			core: {
				host: process.env.DB_HOST as string,
				port: Number(process.env.DB_PORT),
				user: process.env.DB_USER as string,
				password: process.env.DB_PASS as string,
				database: process.env.DB_NAME as string,
			},
			ods: {
				host: process.env.ODS_DB_HOST as string,
				port: Number(process.env.ODS_DB_PORT),
				user: process.env.ODS_DB_USER as string,
				password: process.env.ODS_DB_PASS as string,
				database: process.env.ODS_DB_NAME as string,
			}
		}
	},
	
	// queue config
	queue: {
		host: process.env.RABBIT_HOST as string,
		port: Number(process.env.RABBIT_PORT),
		user: process.env.RABBIT_USER as string,
		password: process.env.RABBIT_PASSWORD as string,
	},
	externalApi: process.env.ATM_CLIENT_URL as string,
	
	slackConfig:{
		token:process.env.SLACK_TOKEN as string,
		id:process.env.SLACK_ID as string,
		clientId:process.env.SLACK_CLIENT_ID as string,
		clientSecret:process.env.SLACK_CLIENT_SECRET as string,
		signingSecret:process.env.SLACL_SIGING_SECRET as string,
		verifyToken:process.env.SLACK_VERIFY_TOKEN as string,
		bothAuthToken:process.env.SLACK_BOT_AUTH_TOKEN as string,
		webhookUrl: process.env.ATM_CROSS_CURRENCY_WEBHOOK_URL as string
	}
};