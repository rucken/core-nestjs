import { AuthService } from '../services/auth.service';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';
import { TokenService } from '../services/token.service';

export const AUTH_SERVICES = [TokenService, AuthService, OauthTokensAccesstokensService];
