import React from 'react';
import {Text} from 'react-native';
import {Header, Link, ListItem} from '@/components/common/Index';

const Index = () => {
  return (
    <>
      <Header text="首页" disableBack />
      <ListItem label="Button" to="Buttons" info="按钮" />
      <ListItem label="Toast" to="Toasts" info="轻提示" />
      <ListItem label="Tabs" to="Tabs" info="标签页" />
      <ListItem label="Spinning" to="SpinningDemo" info="加载效果" />
      <ListItem label="BottomSheet" to="BottomSheetDemo" info="底部弹窗" />
      <ListItem label="Overlay" to="OverlayDemo" info="对话框" />
      <ListItem label="Switch" to="SwitchDemo" info="滑动开关" />
      <Link to="ReportDetail">
        <Text style={{padding: 15}}>Link组件, 跳转页面</Text>
      </Link>
    </>
  );
};

export default Index;
