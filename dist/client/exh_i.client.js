"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interestClient = exports.exchangeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const app_config_1 = require("../configs/app.config");
const fast_xml_parser_1 = require("fast-xml-parser");
const exchangeRateStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:ExchangeRate xmlns:tns="http://www.apb.com.la/"/>
  </soap:Body>
</soap:Envelope>
`;
const interestRateStr = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:Interest_Rate xmlns:tns="http://www.apb.com.la/"/>
  </soap:Body>
</soap:Envelope>
`;
const exchangeClient = async () => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: app_config_1.AppConfig.externalApi,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.apb.com.la/ExchangeRate'
            },
            data: exchangeRateStr
        };
        const response = await axios_1.default.request(config);
        const parserResponse = new fast_xml_parser_1.XMLParser();
        const xmlContent = parserResponse.parse(response.data);
        const resultStr = xmlContent['soap:Envelope']['soap:Body']['ExchangeRateResponse']['ExchangeRateResult'];
        console.log(resultStr);
        return resultStr;
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.exchangeClient = exchangeClient;
const interestClient = async () => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: app_config_1.AppConfig.externalApi,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.apb.com.la/Interest_Rate'
            },
            data: interestRateStr
        };
        const response = await axios_1.default.request(config);
        const parserResponse = new fast_xml_parser_1.XMLParser();
        const xmlContent = parserResponse.parse(response.data);
        const resultStr = xmlContent['soap:Envelope']['soap:Body']['Interest_RateResponse']['Interest_RateResult'];
        console.log(resultStr);
        return resultStr;
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.interestClient = interestClient;
//# sourceMappingURL=exh_i.client.js.map