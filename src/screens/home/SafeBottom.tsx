import React from 'react';
import {View} from 'react-native';
import {
  Header,
  Button,
  SafeBottom,
  FullScreenWrapper,
  FullScreenMain,
} from '../../library/Index';

const SafeBottomDemo = () => {
  return (
    <FullScreenWrapper>
      <Header text="Button" />
      <FullScreenMain />
      <SafeBottom>
        <View style={{padding: 15}}>
          <Button type="primary" title="确定" onPress={() => {}} />
        </View>
      </SafeBottom>
    </FullScreenWrapper>
  );
};

export default SafeBottomDemo;
