import { IFacebookConfig } from '../interfaces/facebook-config.interface';

export const defaultFacebookConfig: IFacebookConfig = {
  login_dialog_uri: 'https://www.facebook.com/v2.12/dialog/oauth',
  access_token_uri: 'https://graph.facebook.com/v2.12/oauth/access_token',
  client_id: '',
  client_secret: '',
  oauth_redirect_uri: '',
  state: '{fbstate}'
};
export const FACEBOOK_CONFIG_TOKEN: string = 'FacebookConfig';
