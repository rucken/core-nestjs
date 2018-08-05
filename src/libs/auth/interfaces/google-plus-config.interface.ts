export interface IGooglePlusConfig {
  readonly login_dialog_uri: string;
  readonly client_id: string;
  readonly client_secret: string;
  readonly oauth_redirect_uri: string;
  readonly access_token_uri: string;
  readonly response_type: string;
  readonly scopes: string[];
  readonly grant_type: string;
}
