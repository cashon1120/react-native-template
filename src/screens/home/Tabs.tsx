import React from 'react';
import {Text} from 'react-native';
import {Tabs, Header} from '@/components/common/Index';
const TabDemo = () => {
  return (
    <>
      <Header text="tabs" />
      <Tabs active={1}>
        <Tabs.Item title="tab1">
          <Text>1</Text>
        </Tabs.Item>
        <Tabs.Item title="tab2">
          <Text>2</Text>
        </Tabs.Item>
        <Text>3</Text>
      </Tabs>
    </>
  );
};

export default TabDemo;
