import { SendMessageService } from "./sendMessage.service";
export declare class NotificationService {
    private message;
    constructor(message: SendMessageService);
    sendMessageWithDeposit(message: string): Promise<void>;
}
//# sourceMappingURL=notification.service.d.ts.map