import * as React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export type BarStypeProps = StatusBarStyle;

interface Props {
  barStyle?: StatusBarStyle;
  translucent?: boolean;
}

const MyStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      backgroundColor="rgba(0,0,0,.0)"
      {...props}
      barStyle={props.barStyle || 'light-content'}
      translucent
    />
  ) : null;
};

export default MyStatusBar;
