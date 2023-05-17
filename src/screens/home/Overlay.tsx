import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Overlay, Button, Header} from '@/components/common/Index';

const OverlayDemo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header text="Overlay" />
      <View style={{padding: 15}}>
        <Button title="Show" onPress={() => setVisible(true)} />
      </View>
      <Overlay visible={visible} onCancel={() => setVisible(false)}>
        <View style={{display: 'flex', alignItems: 'center', padding: 15}}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
        </View>
        <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
          <Button title="hide" onPress={() => setVisible(false)} />
        </View>
      </Overlay>
    </>
  );
};

export default OverlayDemo;
