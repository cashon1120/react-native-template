import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomSheet, Button, Header} from '@/library/Index';

const BottomSheetDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <>
      <Header text="BottomSheet" />
      <View style={{padding: 15}}>
        <Button title="Show1" onPress={() => setVisible1(true)} />
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Button title="Show2(speed = 500)" onPress={() => setVisible2(true)} />
      </View>
      <BottomSheet visible={visible1} onCancel={() => setVisible1(false)}>
        <View style={{display: 'flex', alignItems: 'center', padding: 15}}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
        </View>
        <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
          <Button title="hide" onPress={() => setVisible1(false)} />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={visible2}
        speed={500}
        onCancel={() => setVisible2(false)}>
        <View style={{display: 'flex', alignItems: 'center', padding: 15}}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
        </View>
        <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
          <Button title="hide" onPress={() => setVisible2(false)} />
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetDemo;
