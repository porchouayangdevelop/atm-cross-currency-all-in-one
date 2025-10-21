import http from "http";
import * as soap from "soap";
// import * as xml2js from "xml2js";
import fs from "fs";
import path from "path";
import {AppConfig} from "./configs/app.config";
// import validateCode from "./app/utils/validate.currency";
import queryAccNameService from "./services/acctname.service";
import CimcusmControllerService from "./services/CimcusmController.service";
import service from "./services/atm.service";
// import exchange_rateService from "./app/services/exchange_rate.service";
// import transferRepo from "./app/repo/transfer.repo";
// import {
// 	getValidateFailedMessage,
// 	getFaildedCode,
// } from "./app/utils/mapping";

//load xmlWSDL

const queryAccNameWSDL = fs.readFileSync(
	path.resolve(process.cwd(), "templates", "QueryAccName.wsdl"),
	"utf-8"
);

const cifWSDL = fs.readFileSync(
	path.resolve(process.cwd(), "templates", "CimcusmControllerService.wsdl"),
	'utf-8'
)

const serviceWSDL = fs.readFileSync(
	path.resolve(process.cwd(), "templates", "SMS4ATM_UAT.wsdl"), 'utf-8'
)

const httpPort = AppConfig.server.httpPort;
const httpHost = AppConfig.server.httpHost;

// const app: FastifyInstance = Fastify({
// 	logger: {
// 		transport: {
// 			target: "@fastify/one-line-logger",
// 		},
// 	},
// });
//
// app.register(import("@fastify/cors"), {
// 	origin: true,
// 	methods: ["GET", "POST"],
// 	allowedHeaders: ["Content-Type"],
// });
//

const initialServer = async () => {
	const server = http.createServer(async (request, reply) => {
		if (request.method === "OPTIONS") {
			reply.writeHead(200, {
				"access-control-allow-origin": "*",
				"access-control-allow-methods": "GET,POST,OPTIONS",
				"access-control-allow-headers": "Content-Type, SOAPAction",
			});
			reply.end();
			return;
		}
		
		reply.setHeader("access-control-allow-origin", "*");
		reply.setHeader("access-control-allow-methods", "GET,POST,OPTIONS");
		reply.setHeader("access-control-allow-headers", "Content-Type, SOAPAction");
	});
	
	// soap.listen(server, "/hello", helloService, helleServiceWSDL);
	soap.listen(server, "/QueryAccName", queryAccNameService, queryAccNameWSDL);
	soap.listen(server, '/Service', service, serviceWSDL)
	soap.listen(server, "/APBServiceCenter/CimcusmControllerService", CimcusmControllerService, cifWSDL);
	
	
	return server;
};

const startServer = async () => {
	try {
		const server = await initialServer();
		
		server.listen(httpPort, httpHost, () => {
			console.log(`server started on HTTP:${httpHost} PORT:${httpPort}`);
			// console.log(`Hello world available at http://localhost:${httpPort}/hello?wsdl`);
			//
			// console.log(
			// 	`Interest_rate available at http://localhost:${httpPort}/InterestRate?wsdl`
			// );
			// console.log(
			// 	`ExchangeRate available at http://localhost:${httpPort}/ExchangeRate?wsdl`
			// );
			// console.log(`Deposit available at http://localhost:${httpPort}/Deposit?wsdl`);
			// console.log(`Transfer available at http://localhost:${httpPort}/Transfer?wsdl`);
			// console.log(
			// 	`QueryAccName available at http://localhost:${httpPort}/QueryAccName?wsdl`
			// );
			console.log(
				`atm all in one available at http://localhost:${httpPort}/Service1.asmx?wsdl`
			);
			console.log(
				`Cif available at http://localhost:${httpPort}/APBServiceCenter/CimcusmControllerService?wsdl`
			);
			
		});
		
		
		// const extractAccount1 = extractAccount("418|0000100100101460");
		// console.log(
		// 	`from acct ${extractAccount1.fromAccount} target to : ${extractAccount1.targetAccount}`
		// );
		//
		// const deposit = await depositRepo("00100302", "418|0001100100012932");
		// console.log(deposit);
		// console.log(deposit.QueryAccNameResult);
		// const transfer = await transferRepo("00100103", "0000100100101460|0000301100045137");
		// const transfer1 = await transferRepo("00100103", "0000100100101460|0000208100156321");
		// console.log(transfer);
		// console.log(transfer1);
		
		// await getUpiCard('000040003451', 'D');
		
		// await exchangeClient();
		// await interestClient();
	} catch (error) {
		console.log("error starting server", error);
		process.exit(1);
	}
};

startServer().then().catch(console.error);
