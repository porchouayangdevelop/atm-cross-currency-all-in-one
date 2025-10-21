type DatabaseConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
};
type AppDatabase = {
    internal?: Record<'cardzoneLog' | 'upi_service', DatabaseConfig>;
    external?: Record<"core" | "ods", DatabaseConfig>;
};
interface QueueConfig {
    host: string;
    port: number;
    user: string;
    password: string;
}
interface SlackConfig {
    token: string;
    id: string;
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
    };
    database?: AppDatabase;
    queue?: QueueConfig;
    externalApi?: string;
    slackConfig?: SlackConfig;
}
export declare const AppConfig: AppConfigs;
export {};
//# sourceMappingURL=app.config.d.ts.map