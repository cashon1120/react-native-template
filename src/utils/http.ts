import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONFIG} from '../config/index';
import {Alert} from 'react-native';
import encryption from './encryption';

let globalErrorState = false;

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let defaultHeader = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=UTF-8',
};
/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch: any, timeout = 60000) => {
  let timeoutBlock = () => {};
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject('timeout promise');
    };
  });

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  let abortable_promise = Promise.race([original_fetch, timeout_promise]);
  setTimeout(() => {
    timeoutBlock();
  }, timeout);
  return abortable_promise;
};

interface Params {
  url: string;
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  params?: any;
  header?: any;
}

/**
 * 网络请求工具类
 */
class Http {
  /**
   * 基于fetch 封装的GET 网络请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns {Promise}
   */
  /**
   * 基于fetch 的 POST 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  /**
   * 自定义errorCode 说明
   * 2000: 请求结果已无效, 主要针对页面已卸载的情况
   * 2001: 没有权限
   * 2002: 请求失败, 如服务器出错
   * 2003: 网络异常
   */

  fetchKeys: any = {};
  request = async (options: Params) => {
    let {url, params, method = 'POST', header} = options;
    if (url[0] === '/') {
      url = url.replace('/', '');
    }
    if (method === 'GET' && params) {
      let queryString = '';
      Object.keys(params).forEach((key: string) => {
        if (params[key] !== '') {
          queryString = queryString + `${key}=${params[key]}&`;
        }
      });
      queryString = queryString.replace(/&$/, '');
      url = url + '?' + queryString;
    }
    this.addKey(url);
    let postUrl = CONFIG.API_URL;
    if (params && params.version) {
      postUrl = CONFIG.VERSION_URL;
      delete params.version;
    }
    postUrl = postUrl + '/';
    let headers: any = header || defaultHeader;

    if (params && params.formData) {
      headers['Content-Type'] = 'multipart/form-data;charset=utf-8';
    } else {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    const storageUserInfo = await AsyncStorage.getItem('@user_info');
    let token = '';
    if (storageUserInfo) {
      token = JSON.parse(storageUserInfo).token;
    }
    headers.Authorization = token;
    encryption(headers, url, method);
    let hasHttpError = false;
    const fetchParams: any = {
      method,
      headers,
    };
    if (method === 'POST' || method === 'PATCH') {
      fetchParams.body = JSON.stringify(params);
    }
    if (params && params.formData) {
      fetchParams.body = params.formData;
    }
    return timeoutFetch(fetch(postUrl + url, fetchParams))
      .then(response => {
        if (response.ok) {
          if (this.fetchKeys[url]) {
            return response.json();
          } else {
            return {erroCode: 2000};
          }
        } else {
          // new FormData()
          hasHttpError = true;
          let errorMsg = '';
          switch (response.status) {
            case 401:
              errorMsg = '抱歉, 当前账号没有权限进行该操作, 请重新登录!';
              break;
            default:
              errorMsg = '服务器繁忙或登录已过期, 请退出重新登录!';
              break;
          }
          if (!globalErrorState) {
            globalErrorState = true;
            Alert.alert('系统提示', errorMsg, [
              {
                text: '确认',
                onPress: () => {
                  globalErrorState = false;
                },
              },
            ]);
          }
          console.log('出错url:', url);
        }
      })
      .then(response => {
        if (hasHttpError || !response) {
          return {errorCode: -1};
        }
        if (response.errorCode === 1 && url.indexOf('user/login') === -1) {
          Alert.alert('系统提示', '会话失效, 请重新登录', [
            {
              text: '确定',
              // onPress: () => {
              //   global.navigation.reset({
              //     index: 0,
              //     routes: [{name: 'Login'}],
              //   });
              // },
            },
          ]);
          return {errorCode: 1};
        }
        return response;
      })
      .catch((error: any) => {
        if (!hasHttpError && !globalErrorState) {
          hasHttpError = true;
          console.log('catch 出错url:', url, error);
          Alert.alert('系统提示', '请求失败,请查看网络连接是否正常', [
            {
              text: '确定',
              onPress: () => {
                globalErrorState = false;
                setTimeout(() => {
                  hasHttpError = false;
                }, 3000);
              },
            },
          ]);
        }
        globalErrorState = true;
        return {erroCode: 2003};
      });
  };

  addKey = (url: string) => {
    this.fetchKeys[url] = true;
  };

  // 返回页面后终止页面发起的请求
  abortFetch = (url: string | string[]) => {
    if (typeof url === 'string') {
      delete this.fetchKeys[url];
    }
    if (Array.isArray(url)) {
      url.forEach((key: string) => {
        delete this.fetchKeys[key];
      });
    }
  };
}

export default new Http();
