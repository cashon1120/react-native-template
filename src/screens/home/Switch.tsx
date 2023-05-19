import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Switch, Header} from '@/library/Index';

const SwitchDemo = () => {
  const [checked, setChecked] = useState(true);
  const [smallChecked, setSmallChecked] = useState(false);
  const [colorChecked, setColorChecked] = useState(true);

  return (
    <>
      <Header text="Switch" />
      <View style={{padding: 15}}>
        <Text>size: default</Text>
        <Switch
          value={checked}
          onChange={(value: boolean) => setChecked(value)}
        />
        <View style={{height: 15}} />
        <Text>size: small</Text>
        <Switch
          value={smallChecked}
          size="small"
          onChange={(value: boolean) => setSmallChecked(value)}
        />
        <View style={{height: 15}} />
        <Text>activeColor: #1bc4a2</Text>
        <Switch
          value={colorChecked}
          activeColor="#1bc4a2"
          onChange={(value: boolean) => setColorChecked(value)}
        />
        <View style={{height: 15}} />
        <Text>disabled: true</Text>
        <Switch
          value={true}
          disabled
          onChange={(value: boolean) => setColorChecked(value)}
        />
      </View>
    </>
  );
};

export default SwitchDemo;
