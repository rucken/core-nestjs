export interface IJwtConfig {
    authHeaderPrefix: string;
    expirationDelta: string;
    secretKey?: string;
}
export interface IAuthConfig {
    jwt: IJwtConfig;
}
export const authConfig: IAuthConfig = {
    jwt: {
        authHeaderPrefix: 'JWT',
        expirationDelta: '7 days'
    }
};
export const AUTH_CONFIG_TOKEN: string = 'AuthConfigToken';