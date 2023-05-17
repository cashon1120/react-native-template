import React, {FC, PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import useNavigation from '@/hooks/useNavigation';
import {RootStackParamList} from '@/routes/types';

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
  to: keyof RootStackParamList;
  params?: any;
}

const Link: FC<PropsWithChildren<Props>> = ({to, params, children}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(to, params);
  };
  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

export default Link;
