import React, {FC, PropsWithChildren} from 'react';
import {Text, TextStyle} from 'react-native';

interface Props {
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  textAlign?: 'center' | 'left' | 'right';
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'bold'
    | 'normal';
}

const MyText: FC<PropsWithChildren<Props>> = ({
  size = 14,
  color = '#333',
  fontWeight = 'normal',
  textAlign = 'left',
  children,
  style,
}) => {
  return (
    <Text
      allowFontScaling={false}
      style={[{fontSize: size, color, fontWeight, textAlign}, style]}>
      {children}
    </Text>
  );
};
export default MyText;
