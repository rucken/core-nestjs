import { IGoogleConfig } from '../interfaces/google-config.interface';

export const defaultGoogleConfig: IGoogleConfig = {
  login_dialog_uri: 'https://accounts.google.com/o/oauth2/auth',
  client_id: '307267520401-aoi5tjj1vcdav986l6khnstievg1ep0q.apps.googleusercontent.com',
  client_secret: 'O-t2gL9DIIm73UPwlrjoyAvj',
  oauth_redirect_uri: 'http://localhost:4200/recipes',
  access_token_uri: 'https://accounts.google.com/o/oauth2/token',
  response_type: 'code',
  scopes: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ],
  grant_type: 'authorization_code'
};
export const GOOGLE_CONFIG_TOKEN: string = 'GoogleConfig';
