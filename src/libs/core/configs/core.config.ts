export interface ICoreConfig {
    debug: boolean;
    demo: boolean;
    port?: number;
    indexFile?: string;
}
export const coreConfig: ICoreConfig = {
    debug: false,
    demo: false,
    port: 5000
};
export const CORE_CONFIG_TOKEN: string = 'CoreConfigToken';