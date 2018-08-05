export interface IFacebookConfig {
  readonly login_dialog_uri?: string;
  readonly access_token_uri?: string;
  readonly client_id: string;
  readonly client_secret: string;
  readonly oauth_redirect_uri: string;
  readonly state?: string;
}
