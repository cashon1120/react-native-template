import React from 'react';
import {View} from 'react-native';
import {Button, Header, ListItem} from '@/library/Index';

const Setting = () => {
  return (
    <>
      <Header text="设置" />
      <ListItem label="清除缓存" onPress={() => {}} />
      <ListItem label="检查新版本" onPress={() => {}} />
      <View style={{padding: 15}}>
        <Button title="退出登录" onPress={() => {}} type="danger-line" />
      </View>
    </>
  );
};

export default Setting;
