import { IGooglePlusConfig } from '../interfaces/google-plus-config.interface';

export const defaultGooglePlusConfig: IGooglePlusConfig = {
  login_dialog_uri: 'https://accounts.google.com/o/oauth2/auth',
  client_id: '',
  client_secret: '',
  oauth_redirect_uri: '',
  access_token_uri: 'https://accounts.google.com/o/oauth2/token',
  response_type: 'code',
  scopes: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ],
  grant_type: 'authorization_code'
};
export const GOOGLE_PLUS_CONFIG_TOKEN: string = 'GooglePlusConfig';
