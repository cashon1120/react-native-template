import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import {PRIMARY_COLOR} from '@/globalStyle';

// 配置颜色
const DANGER_COLOR = '#f77474';
const SAFE_COLOR = '#47d382';

type ButtonType =
  | 'primary'
  | 'default'
  | 'primary-line'
  | 'danger'
  | 'danger-line'
  | 'safe'
  | 'safe-line';
type ButtonSize = 'large' | 'middle' | 'small' | 'mini';

/**
 * interface Props
 * @param onPress 点击回调
 * @param title 按钮文本
 * @param radius 是否圆角, 默认是5, 如果设置了radius 就是20
 * @param disabled 是否禁用
 * @param loading 是否显示加载
 * @param loadingColor 加载图标颜色
 * @param type 按钮样式, 参考 ButtonType
 * @param size 按钮大小, 参考 ButtonSize
 */
interface IProps {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
  radius?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  type?: ButtonType;
  size?: ButtonSize;
  style?: ViewStyle | ViewStyle[];
}
type TypeStyle = {
  [key in ButtonType]: TextStyle | TextStyle[];
};

type SizeStyle = {
  [key in ButtonSize]: TextStyle | TextStyle[];
};

interface Style extends TypeStyle {}

interface Style extends SizeStyle {
  [prop: string]: TextStyle | TextStyle[];
}

const Button = (props: IProps) => {
  const {
    onPress = () => {},
    title = '确认',
    disabled,
    size = 'middle',
    type = 'default',
    loading,
    loadingColor = '#fff',
    radius,
    style,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{borderRadius: radius ? 20 : 5}]}
      disabled={disabled}
      activeOpacity={0.7}>
      <View
        style={[
          styles.wrapper,
          disabled ? styles.disabled : null,
          radius ? styles.raidusWrapper : null,
          styles[type ? type : ''],
          styles[size],
          style,
        ]}>
        <Text style={{...styles[`text-${type}`], ...styles[`text-${size}`]}}>
          {title}
        </Text>
        {loading ? (
          <ActivityIndicator
            style={{transform: [{scale: 0.8}]}}
            size="small"
            color={loadingColor}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles: Style = StyleSheet.create({
  large: {padding: 10, borderRadius: 5},
  middle: {padding: 8, borderRadius: 4},
  small: {padding: 6, borderRadius: 3},
  mini: {padding: 4, paddingHorizontal: 8, borderRadius: 2},
  'text-large': {
    fontSize: 18,
  },
  'text-middle': {
    fontSize: 16,
  },
  'text-small': {
    fontSize: 14,
  },
  'text-mini': {
    fontSize: 12,
  },
  wrapper: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  default: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  'text-default': {color: '#333'},
  primary: {
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  'text-primary': {color: '#fff'},
  'primary-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  'text-primary-line': {color: PRIMARY_COLOR},
  danger: {
    backgroundColor: DANGER_COLOR,
    borderWidth: 1,
    borderColor: DANGER_COLOR,
  },
  'text-danger': {color: '#fff'},
  'danger-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: DANGER_COLOR,
    color: DANGER_COLOR,
  },
  'text-danger-line': {color: DANGER_COLOR},
  safe: {
    backgroundColor: SAFE_COLOR,
    borderWidth: 1,
    borderColor: SAFE_COLOR,
  },
  'text-safe': {color: '#fff'},
  'safe-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: SAFE_COLOR,
  },
  'text-safe-line': {color: SAFE_COLOR},
  raidusWrapper: {
    borderRadius: 20,
  },

  disabled: {
    opacity: 0.5,
  },
});
