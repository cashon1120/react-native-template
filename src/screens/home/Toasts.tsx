import React from 'react';
import {View} from 'react-native';
import {Header, Toast, Button} from '../../library/Index';

const Toasts = () => {
  return (
    <>
      <Header text="Toast" />
      <View style={{padding: 15}}>
        <Button
          title="top"
          onPress={() => Toast.show('top', {position: 'top'})}
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
        <View style={{height: 15}} />
        <Button
          title="delay: 3000(default: 2000)"
          onPress={() =>
            Toast.show('center', {position: 'center', delay: 3000})
          }
        />
      </View>
    </>
  );
};

export default Toasts;
