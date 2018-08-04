import { AuthService } from './auth.service';
import { OauthTokensAccesstokensService } from './oauth-tokens-accesstokens.service';
import { TokenService } from './token.service';

export const services = [
    TokenService,
    AuthService,
    OauthTokensAccesstokensService
];