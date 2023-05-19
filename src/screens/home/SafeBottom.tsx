import React from 'react';
import {View} from 'react-native';
import {
  Header,
  Button,
  SafeBottom,
  FullScreenWrapper,
  FullScreenMain,
  Text,
} from '../../library/Index';

const SafeBottomDemo = () => {
  return (
    <FullScreenWrapper>
      <Header text="Button" />
      <FullScreenMain>
        <Text>注意和FullScreenWrapper, FullScreenMainsg配合使用</Text>
      </FullScreenMain>
      <SafeBottom>
        <View style={{padding: 15}}>
          <Button type="primary" title="确定" onPress={() => {}} />
        </View>
      </SafeBottom>
    </FullScreenWrapper>
  );
};

export default SafeBottomDemo;
