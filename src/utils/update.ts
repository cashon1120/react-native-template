import {Linking, Alert, Platform, PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from 'rn-fetch-blob';
import dayjs from 'dayjs';
import Http from './http';
import {IOS_APP_ID} from '../config/index';

const APP_NAME = DeviceInfo.getApplicationName();
const nowVersion: string = DeviceInfo.getVersion();
let newVersion: string = '';

// 对比版本号大小
const compareVersion = (nowV: string, newV: string): boolean => {
  let arr1 = nowV.split('.');
  let arr2 = newV.split('.');
  const length = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < length; ) {
    if (arr1[i] === arr2[i]) {
      i++;
    } else {
      if (arr1[i] && !arr2[i]) {
        return false;
      }
      if (arr2[i] && !arr1[i]) {
        return true;
      }
      if (Number(arr1[i]) < Number(arr2[i])) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
};

const checkAppVersion = async (
  checkCallback?: Function,
  notShowModal?: boolean,
) => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE']
    ) {
      getVersion('android', checkCallback, notShowModal);
    } else {
      Alert.alert('您未授权存储访问权限, 无法下载更新文件', '', [
        {text: '确认'},
      ]);
    }
  } else {
    getVersion('ios', checkCallback, notShowModal);
  }
};

const getVersion = (
  type: 'android' | 'ios',
  checkCallback?: Function,
  notShowModal?: boolean,
) => {
  switch (type) {
    case 'android':
      Http.request({
        url: 'api/v1.0/clientVersion/platform/last/get',
        params: {platformType: 1, version: true},
      }).then((res: any) => {
        if (res.errorCode === 0 && res.result) {
          if (compareVersion(nowVersion, res.result.version)) {
            newVersion = res.result.version;
            if (!notShowModal) {
              showUpdateModal(
                res.result.version,
                res.result.clientVersionId,
                res.result.url,
              );
            }
            checkCallback && checkCallback(true);
          } else {
            checkCallback && checkCallback(false);
          }
        } else {
          checkCallback && checkCallback(false);
        }
      });
      break;
    case 'ios':
      fetch(`https://itunes.apple.com/cn/lookup?id=${IOS_APP_ID}`)
        .then((res: any) => res.json())
        .then((res: any) => {
          if (res.resultCount >= 1) {
            const _version = res.results[0].version;
            if (compareVersion(nowVersion, _version)) {
              newVersion = _version;
              if (!notShowModal) {
                showUpdateModal(newVersion, 0);
              }
              checkCallback && checkCallback(true);
            } else {
              checkCallback && checkCallback(false);
            }
          } else {
            checkCallback && checkCallback(false);
          }
        });
      break;
    default:
      break;
  }
};

const showUpdateModal = (version: string, id: number, url?: string) => {
  const androidInfo =
    Platform.OS === 'android'
      ? '\n\n下载完成后会自动安装或从通知栏信息点击安装'
      : '';
  Alert.alert(
    '新版本安装提示',
    `\n检测到有新的版本, 是否更新?\n当前版本号: ${nowVersion}\n最新版本号: ${version}${androidInfo}`,
    [
      {text: '取消'},
      {
        text: '确认',
        onPress: () => {
          if (Platform.OS === 'android') {
            handleAndroidUpdate(version, url || '');
          } else {
            handleIOSUpdate();
          }
        },
      },
    ],
  );
};

const handleIOSUpdate = () => {
  const appStoreUrl = `itms-apps://apps.apple.com/us/app/apple-store/${IOS_APP_ID}`;
  const onError = () => {
    Alert.alert('', '无法打开该商店, 请从AppStore里搜索下载最新版本', [
      {text: '确认'},
    ]);
  };
  Linking.canOpenURL(appStoreUrl).then((supported: boolean) => {
    if (supported) {
      Linking.openURL(appStoreUrl).catch(() => {
        onError();
      });
    } else {
      onError();
    }
  });
};

const handleAndroidUpdate = (version: string, url: string) => {
  const android = RNFetchBlob.android;
  const filePath = `${
    RNFetchBlob.fs.dirs.DownloadDir
  }/mxly_manage_${version}_${dayjs().unix()}.apk`;
  const mime = 'application/vnd.android.package-archive';
  RNFetchBlob.config({
    addAndroidDownloads: {
      notification: true,
      mediaScannable: true,
      useDownloadManager: true,
      path: filePath,
      title: `${APP_NAME} ${version}`,
      mime,
    },
  })
    .fetch('GET', url)
    .then((res: any) => {
      android.actionViewIntent(res.path(), mime);
    });
};

export default checkAppVersion;
