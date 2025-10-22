import {SendMessageService} from "./sendMessage.service";
import {AppConfig} from "../configs/app.config";


export class NotificationService {
	constructor(
		private message: SendMessageService) {
	}
	
	async sendMessageWithDeposit(
		message: string,
	) {
		const channel = process.env.NODE_ENV === 'production' ? 'atm-cross-currency-prd' :
			'atm-cross-currency';
		await this.message.sendMessage(channel, AppConfig.slackConfig!.webhookUrl, message);
		
	}
	
	
}