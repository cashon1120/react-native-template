import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import Text from '@/components/common/Text';
// 主色调
const PRIMARY_COLOR = '#466CF5';

type ButtonType =
  | 'primary'
  | 'default'
  | 'primary-line'
  | 'red-line'
  | 'red'
  | 'green';
type ButtonSize = 'large' | 'middle' | 'small' | 'mini-small';

/**
 * interface Props
 * @param onPress 点击回调
 * @param title 按钮文本
 * @param radius 是否圆角, 默认是5, 如果设置了radius 就是20
 * @param disabled 是否禁用
 * @param loading 是否显示加载
 * @param loadingText 加载时显示的文本
 * @param type 按钮样式, 参考 ButtonType
 * @param size 按钮大小, 参考 ButtonSize
 */
interface IProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  radius?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  type?: ButtonType;
  size?: ButtonSize;
}
type TypeStyle = {
  [key in ButtonType]: TextStyle;
};

type SizeStyle = {
  [key in ButtonSize]: TextStyle;
};

interface Style extends TypeStyle {}

interface Style extends SizeStyle {
  [prop: string]: TextStyle;
}

const Button = (props: IProps) => {
  const {
    onPress,
    title,
    disabled,
    size = 'middle',
    type,
    loading,
    loadingText = '加载中',
    radius,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{borderRadius: radius ? 20 : 5}}
      disabled={disabled}
      activeOpacity={0.7}>
      <View>
        <Text
          style={[
            styles.wrapper,
            disabled ? styles.disabled : null,
            radius ? styles.raidusWrapper : null,
            styles[type ? type : ''],
            styles[size],
          ]}>
          {loading ? loadingText : `${title || '确认'}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles: Style = StyleSheet.create({
  large: {padding: 12, fontSize: 18},
  middle: {padding: 10, fontSize: 16},
  small: {padding: 8, fontSize: 14},
  'mini-small': {padding: 3, fontSize: 12, paddingHorizontal: 10},
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
  },
  default: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#eee',
    borderWidth: 1,
  },
  primary: {
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  'primary-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    color: PRIMARY_COLOR,
  },
  'red-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F35713',
    color: '#F35713',
  },
  red: {
    backgroundColor: '#ff6363',
    color: '#fff',
  },
  green: {
    backgroundColor: '#47d382',
    color: '#fff',
  },
  raidusWrapper: {
    borderRadius: 20,
  },

  disabled: {
    opacity: 0.5,
  },
});
