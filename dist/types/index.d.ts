interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
interface QueueConfig {
    host: string;
    port: number;
    user: string;
    password: string;
}
interface ServerConfig {
    host: string;
    port: number;
}
export interface AppConfigs {
    server: ServerConfig;
    database?: DatabaseConfig;
    rabbitmq?: QueueConfig;
}
export {};
//# sourceMappingURL=index.d.ts.map