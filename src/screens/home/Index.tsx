import React from 'react';
import {Text} from 'react-native';
import {Header, Link, ListItem} from '@/components/common/Index';

const Index = () => {
  return (
    <>
      <Header text="首页" disableBack />
      <ListItem label="Button" to="Buttons" />
      <ListItem label="Toast" to="Toasts" />
      <ListItem label="Tabs" to="Tabs" />
      <ListItem label="Spinning" to="SpinningDemo" />
      <ListItem label="BottomSheet" to="BottomSheetDemo" />
      <ListItem label="Overlay" to="OverlayDemo" />
      <Link to="ReportDetail">
        <Text style={{padding: 15}}>Link组件, 跳转页面</Text>
      </Link>
    </>
  );
};

export default Index;
