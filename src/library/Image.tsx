import React, {useState, useEffect, memo} from 'react';
import {Image, ImageResizeMode, ImageProps, ImageStyle} from 'react-native';
import {setUISize} from '@/utils/commonUtils';
import Images, {ImagesProps} from '@/assets/Images';

export type NameProps = keyof ImagesProps;
interface IProps {
  width?: number;
  height?: number;

  absoluteWidth?: number;
  absoluteHeight?: number;
  // 本地图片
  name?: NameProps;
  // 网络图片
  url?: string;
  resizeMode?: ImageResizeMode;
  style?: ImageStyle;
  isAvatar?: boolean;
}

const MyImage: React.FC<IProps> = props => {
  const {
    width,
    height,
    url,
    name,
    resizeMode,
    style,
    isAvatar,
    absoluteWidth,
    absoluteHeight,
  } = props;
  const [error, setError] = useState(false);
  let source: any = null;
  if (url) {
    source = {
      uri: url,
    };
  }

  let imgStyle = {...style};
  if (width && height) {
    imgStyle = {
      ...imgStyle,
      ...setUISize(width, height),
    };
  }
  if (absoluteWidth && absoluteHeight) {
    imgStyle = {
      ...imgStyle,
      width: absoluteWidth,
      height: absoluteHeight,
    };
  }

  useEffect(() => {
    setError(false);
  }, [url]);
  const imageProps: ImageProps | null = name
    ? null
    : ({defaultSource: isAvatar ? Images.avatar : Images.no_img} as ImageProps);
  return (url || name) && !error ? (
    <Image
      style={imgStyle}
      resizeMode={resizeMode || 'cover'}
      onError={() => setError(true)}
      source={name ? Images[name] : source}
      {...imageProps}
    />
  ) : (
    <Image
      style={imgStyle}
      resizeMode="contain"
      source={isAvatar ? Images.avatar : Images.no_img}
    />
  );
};

export default memo(MyImage);
