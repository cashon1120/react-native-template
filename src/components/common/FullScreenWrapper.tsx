import React, {FC, PropsWithChildren} from 'react';
import {View} from 'react-native';
const FullScreenWrapper: FC<PropsWithChildren> = ({children}) => {
  return <View style={{height: '100%', display: 'flex'}}>{children}</View>;
};
export const FullScreenMain: FC<PropsWithChildren> = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};
export default FullScreenWrapper;
