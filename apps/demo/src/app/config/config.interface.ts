import { Provider } from '@nestjs/common';
import { ConnectionString } from 'connection-string';

export interface IDemoConfig {
  env: {
    name: string;
    port: number;
    protocol: 'http' | 'https';
  };
  project: {
    path: string;
    tsconfig: {
      compilerOptions: { paths: { [key: string]: string[] } };
    };
    package: any;
    staticFolders: string[];
  };
  db: {
    connectionString: ConnectionString;
    file: string;
  };
  core: {
    providers: () => Provider[];
  };
  auth: {
    providers: () => Provider[];
    passportProviders: () => Provider[];
  };
}
