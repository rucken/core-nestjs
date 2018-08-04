export interface ITwitterConfig {
  readonly consumer_key: string;
  readonly consumer_secret: string;
  readonly request_token_uri: string;
  readonly login_dialog_uri: string;
  readonly access_token_uri: string;
  readonly oauth_redirect_uri: string;
}
