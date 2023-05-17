import {API_URL, VERSION_URL} from './envVariable';

// ios检查更新时用，在开发者网页上可找到
export const IOS_APP_ID = '1673328641';

interface IConfig {
  API_URL: string;
  VERSION_URL: string;
}

export const CONFIG: IConfig = {
  API_URL,
  VERSION_URL,
};
