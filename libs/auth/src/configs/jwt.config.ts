import { IJwtConfig } from '../interfaces/jwt-config.interface';

export const DEFAULT_JWT_CONFIG: IJwtConfig = {
  authHeaderPrefix: 'JWT',
  expirationDelta: '7 days'
};
export const JWT_CONFIG_TOKEN = 'JwtConfigToken';
