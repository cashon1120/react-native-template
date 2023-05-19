import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import useNavigation from '@/hooks/useNavigation';
import {RootStackParamList} from '@/routes/types';

import Image from './Image';

/**
 * @interface Props
 * @property label 左侧文本
 * @property icon 左侧图标
 * @property info 右侧文本内容
 * @property additionalInfo 附加文本
 * @property showRedDot 是否显示右侧小红圆点
 * @property placeholder 右侧默认文本
 * @property to 要跳转的页面地址
 * @property params 跳转参数
 * @property underlayColor 点击背景色
 * @property hideLine 是否隐藏底部线条
 */

interface Props {
  label: string;
  icon?: string;
  info?: string | number;
  additionalInfo?: string;
  children?: React.ReactNode;
  showRedDot?: boolean;
  hideLine?: boolean;
  placeholder?: string | null;
  to?: keyof RootStackParamList;
  params?: any;
  underlayColor?: 'string';
  onPress?: () => void;
}

const ListItem = (props: Props) => {
  const navigation = useNavigation();
  const {
    label,
    onPress,
    info,
    additionalInfo,
    placeholder,
    showRedDot,
    children,
    hideLine,
    to,
    params,
    underlayColor = '#fafafa',
  } = props;
  const handlePress = () => {
    if (to) {
      navigation.navigate(to, params);
      return;
    }
    onPress && onPress();
  };
  return (
    <View>
      <TouchableHighlight underlayColor={underlayColor} onPress={handlePress}>
        <View
          style={{
            ...styles.container,
            borderBottomColor: hideLine ? '#fff' : '#eee',
          }}>
          <Text style={[styles.label, children ? {flex: 1} : null]}>
            {label}
          </Text>
          {children ? (
            children
          ) : info || additionalInfo ? (
            <>
              {info ? <Text style={styles.info}>{info}</Text> : null}
              {additionalInfo ? (
                <Text style={styles.info}>{additionalInfo}</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          {showRedDot ? <View style={styles.redDot} /> : null}
          {onPress || to ? (
            <Image name="arrow" style={styles.arrow} width={30} height={30} />
          ) : null}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    minHeight: 46,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E75120',
    marginLeft: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    color: '#333',
    paddingRight: 15,
  },
  info: {
    color: '#888',
    fontSize: 15,
    marginRight: 1,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  placeholder: {
    color: '#999',
    fontSize: 15,
    marginRight: 1,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  arrow: {
    opacity: 0.6,
    position: 'relative',
    top: Platform.OS === 'android' ? 1 : 0,
  },
});
