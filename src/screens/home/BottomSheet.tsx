import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomSheet, Button, Header} from '@/components/common/Index';

const BottomSheetDemo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header text="BottomSheet" />
      <View style={{padding: 15}}>
        <Button title="Show" onPress={() => setVisible(true)} />
      </View>
      <BottomSheet visible={visible} onCancel={() => setVisible(false)}>
        <View style={{display: 'flex', alignItems: 'center', padding: 15}}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
        </View>
        <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
          <Button title="hide" onPress={() => setVisible(false)} />
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetDemo;
