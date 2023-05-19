import React from 'react';
import {Header, ListItem} from '@/library/Index';

const Index = () => {
  return (
    <>
      <Header text="首页" disableBack />
      <ListItem label="Flex" to="FlexDemo" info="布局" />
      <ListItem label="Button" to="ButtonsDemo" info="按钮" />
      <ListItem label="Toast" to="ToastsDemo" info="轻提示" />
      <ListItem label="Tabs" to="TabsDemo" info="标签页" />
      <ListItem label="Spinning" to="SpinningDemo" info="加载效果" />
      <ListItem label="BottomSheet" to="BottomSheetDemo" info="底部弹窗" />
      <ListItem label="Overlay" to="OverlayDemo" info="对话框" />
      <ListItem label="Switch" to="SwitchDemo" info="滑动开关" />
      <ListItem label="Link" to="LinkDemo" info="页面跳转" />
      <ListItem label="DatePicker" to="DatePickerDemo" info="日期选择" />
    </>
  );
};

export default Index;
