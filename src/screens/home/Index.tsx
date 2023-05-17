import React from 'react';
import {Header, ListItem} from '@/components/common/Index';

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
      <ListItem label="Link" to="LinkDemo" info="页面跳转" />
    </>
  );
};

export default Index;
