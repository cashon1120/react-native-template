import React from 'react';
import {Text} from 'react-native';
import {Header, Link, ListItem, Toast} from '@/components/common/Index';

const Index = () => {
  return (
    <>
      <Header text="首页" disableBack />
      <ListItem label="按钮" to="Buttons" />
      <ListItem
        label="Toast"
        onPress={() => {
          Toast.show('show toast info');
        }}
      />
      <Link to="ReportDetail">
        <Text style={{padding: 15}}>导航</Text>
      </Link>
    </>
  );
};

export default Index;
