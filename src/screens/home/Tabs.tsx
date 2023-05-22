import React, {useState} from 'react';
import {View} from 'react-native';
import {Tabs, Header, Text, PlacehoderView} from '@/library/Index';
const TabDemo = () => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Header text="tabs" />
      <View style={{padding: 15}}>
        <Text>切换事件: index = {index}</Text>
        <PlacehoderView height={15} />
        <Tabs onChange={(value: number) => setIndex(value)}>
          <Tabs.Item title="tab1">
            <Text>tab1</Text>
          </Tabs.Item>
          <Tabs.Item title="tab2">
            <Text>tab2</Text>
          </Tabs.Item>
        </Tabs>

        <PlacehoderView height={25} />
        <Tabs activeIndex={1}>
          <Tabs.Item title="tab1">
            <Text>tab1</Text>
          </Tabs.Item>
          <Tabs.Item title="tab2">
            <Text>activeIndex: 1</Text>
          </Tabs.Item>
        </Tabs>

        <PlacehoderView height={25} />
        <Tabs activeColor="#2eb274">
          <Tabs.Item title="tab1">
            <Text>activeColor: #2eb274</Text>
          </Tabs.Item>
          <Tabs.Item title="tab2">
            <Text>2</Text>
          </Tabs.Item>
        </Tabs>
      </View>
    </>
  );
};

export default TabDemo;
