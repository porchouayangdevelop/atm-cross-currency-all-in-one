"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageService = void 0;
const web_api_1 = require("@slack/web-api");
const axios_1 = __importDefault(require("axios"));
const app_config_1 = require("../configs/app.config");
const botAuthToken = app_config_1.AppConfig.slackConfig.bothAuthToken;
if (!botAuthToken || !botAuthToken.startsWith('xoxb-')) {
    throw new Error(`SLACK_BOT_AUTH_TOKEN is not set or does not start with "xoxb-"`);
}
const client = new web_api_1.WebClient(botAuthToken);
class SendMessageService {
    async sendMessage(channel, webhook_url, message) {
        try {
            if (!channel) {
                throw new Error("SLACK_CHANNEL No provided");
            }
            let result;
            if (webhook_url) {
                const response = await axios_1.default.post(webhook_url, {
                    channel,
                    text: message,
                });
                if (response.status !== 200) {
                    throw new Error("SLACK_CHANNEL Error: Failed to send message to Slack with unsuccessful");
                }
                result = {
                    ts: new Date().getTime(),
                };
            }
            else {
                result = await client.chat.postMessage({
                    channel,
                    text: message,
                });
            }
            return result;
        }
        catch (error) {
            throw error.message;
        }
    }
}
exports.SendMessageService = SendMessageService;
//# sourceMappingURL=sendMessage.service.js.map