import {Dimensions, NativeModules, Platform} from 'react-native';

// 获取节点数据?
export const getComponentInfo = (event: any) => {
  let {x, y, width, height} = event.nativeEvent.layout;
  return {
    x,
    y,
    width,
    height,
  };
};

// 根据UI实际像素大小设置图片大小, 750 为效果图宽度
export const setUISize = (width: number, height?: number) => {
  const percent = width / 750;
  const screenWidth = Dimensions.get('window').width;
  const imgHeight = height ? (screenWidth * height) / width : 0;
  return {
    width: screenWidth * percent,
    height: imgHeight * percent,
  };
};

// 获取Bar高度
export const getBarHeight = () => {
  return new Promise((resolve: any) => {
    const {StatusBarManager} = NativeModules;
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight: any) => {
        resolve(statusBarHeight.height);
      });
    } else {
      resolve(StatusBarManager.HEIGHT);
    }
  });
};
