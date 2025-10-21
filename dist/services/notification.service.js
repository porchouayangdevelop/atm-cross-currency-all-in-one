"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const app_config_1 = require("../configs/app.config");
class NotificationService {
    message;
    constructor(message) {
        this.message = message;
    }
    async sendMessageWithDeposit(message) {
        const channel = process.env.NODE_ENV === 'production' ? 'atm-cross-currency-prd' :
            'atm-cross-currency';
        await this.message.sendMessage(channel, app_config_1.AppConfig.slackConfig.webhookUrl, message);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map