export interface IJwtConfig {
  authHeaderPrefix: string;
  expirationDelta: string;
  secretKey?: string;
}
