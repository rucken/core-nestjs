// workaround: wrong inject token
export interface IAuthConfig {
  debug: boolean;
  demo: boolean;
  port?: number;
  externalPort?: number;
  domain?: string;
  protocol?: 'http' | 'https';
  indexFile?: string;
}
