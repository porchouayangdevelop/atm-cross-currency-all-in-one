import axios from "axios";
import {AppConfig} from "../configs/app.config";
import {XMLParser} from "fast-xml-parser";

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
			url: AppConfig.externalApi,
			headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'SOAPAction': 'http://www.apb.com.la/ExchangeRate'
			},
			data: exchangeRateStr
		};
		const response = await axios.request(config);
		
		const parserResponse = new XMLParser();
		const xmlContent = parserResponse.parse(response.data);
		
		const resultStr = xmlContent['soap:Envelope']['soap:Body']
		['ExchangeRateResponse']['ExchangeRateResult'];
		
		console.log(resultStr);
		
		// console.log(response.data)
		return resultStr;
	} catch (e: any) {
		console.log(e.message)
	}
}

const interestClient = async () => {
	try {
		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: AppConfig.externalApi,
			headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'SOAPAction': 'http://www.apb.com.la/Interest_Rate'
			},
			data: interestRateStr
		};
		const response = await axios.request(config);
		
		const parserResponse = new XMLParser();
		const xmlContent = parserResponse.parse(response.data);
		
		const resultStr = xmlContent['soap:Envelope']['soap:Body']
			['Interest_RateResponse']['Interest_RateResult'];
		console.log(resultStr);
		
		return resultStr;
	} catch (e: any) {
		console.log(e.message)
	}
}

export {
	exchangeClient,
	interestClient,
}