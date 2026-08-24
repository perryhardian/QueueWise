declare enum Environment {
    Development = "development",
    Test = "test",
    Production = "production"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    API_PREFIX: string;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    FIREBASE_PROJECT_ID?: string;
    FIREBASE_CLIENT_EMAIL?: string;
    FIREBASE_PRIVATE_KEY?: string;
}
export declare function validateEnvironment(config: Record<string, unknown>): EnvironmentVariables;
export {};
