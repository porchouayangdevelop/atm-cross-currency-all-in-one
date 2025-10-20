import {WebClient} from '@slack/web-api';

import axios from "axios";
import {AppConfig} from "../configs/app.config";

const botAuthToken = AppConfig.slackConfig!.bothAuthToken;

if (!botAuthToken || !botAuthToken.startsWith('xoxb-')) {
	throw new Error(`SLACK_BOT_AUTH_TOKEN is not set or does not start with "xoxb-"`);
}

const client = new WebClient(botAuthToken);

export class SendMessageService {
	
	async sendMessage(channel: string, webhook_url: string, message: any): Promise<any> {
		try {
			if (!channel) {
				throw new Error("SLACK_CHANNEL No provided");
			}
			
			let result: any
			if (webhook_url) {
				const response = await axios.post(webhook_url, {
					channel,
					text: message,
				});
				
				
				if (response.status !== 200) {
					throw new Error("SLACK_CHANNEL Error: Failed to send message to Slack with unsuccessful");
				}
				result = {
					ts: new Date().getTime(),
				};
				
			} else {
				result = await client.chat.postMessage({
					channel,
					text: message,
				})
			}
			
			return result;
		} catch (error: any) {
			throw error.message;
		}
	}
}