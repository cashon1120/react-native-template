import React from 'react';
import {View} from 'react-native';
import {Header, Toast, Button} from '../../components/common/Index';

const Toasts = () => {
  return (
    <>
      <Header text="Toast" />
      <View style={{padding: 15}}>
        <Button
          title="top & delay: 3000(default: 2000)"
          onPress={() => Toast.show('top', {position: 'top', delay: 3000})}
        />
        <View style={{height: 15}} />
        <Button
          title="center(default)"
          onPress={() => Toast.show('center', {position: 'center'})}
        />
        <View style={{height: 15}} />
        <Button
          title="bottom"
          onPress={() => Toast.show('bottom', {position: 'bottom'})}
        />
      </View>
    </>
  );
};

export default Toasts;