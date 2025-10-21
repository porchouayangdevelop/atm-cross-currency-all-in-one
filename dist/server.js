"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const soap = __importStar(require("soap"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_config_1 = require("./configs/app.config");
const acctname_service_1 = __importDefault(require("./services/acctname.service"));
const CimcusmController_service_1 = __importDefault(require("./services/CimcusmController.service"));
const atm_service_1 = __importDefault(require("./services/atm.service"));
const queryAccNameWSDL = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), "templates", "QueryAccName.wsdl"), "utf-8");
const cifWSDL = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), "templates", "CimcusmControllerService.wsdl"), 'utf-8');
const serviceWSDL = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), "templates", "SMS4ATM_UAT.wsdl"), 'utf-8');
const httpPort = app_config_1.AppConfig.server.httpPort;
const httpHost = app_config_1.AppConfig.server.httpHost;
const initialServer = async () => {
    const server = http_1.default.createServer(async (request, reply) => {
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
    soap.listen(server, "/QueryAccName", acctname_service_1.default, queryAccNameWSDL);
    soap.listen(server, '/Service', atm_service_1.default, serviceWSDL);
    soap.listen(server, "/APBServiceCenter/CimcusmControllerService", CimcusmController_service_1.default, cifWSDL);
    return server;
};
const startServer = async () => {
    try {
        const server = await initialServer();
        server.listen(httpPort, httpHost, () => {
            console.log(`server started on HTTP:${httpHost} PORT:${httpPort}`);
            console.log(`atm all in one available at http://localhost:${httpPort}/Service?wsdl`);
            console.log(`Cif available at http://localhost:${httpPort}/APBServiceCenter/CimcusmControllerService?wsdl`);
        });
    }
    catch (error) {
        console.log("error starting server", error);
        process.exit(1);
    }
};
startServer().then().catch(console.error);
//# sourceMappingURL=server.js.map