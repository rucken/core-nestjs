import { IJwtConfig } from '../interfaces/jwt-config.interface';

export const defaultJwtConfig: IJwtConfig = {
  authHeaderPrefix: 'JWT',
  expirationDelta: '7 days'
};
export const JWT_CONFIG_TOKEN: string = 'JwtConfigToken';
