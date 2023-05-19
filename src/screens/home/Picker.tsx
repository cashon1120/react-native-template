import React, {useState} from 'react';
import {View} from 'react-native';
import {Picker, Header, Button} from '@/library/Index';

const GridDemo = () => {
  const data = ['张三', '李四', '王五', '赵六', '孙七'];
  const [index, setIndex] = useState(-1);
  const handleYearChange = (value: number) => {
    setIndex(value);
  };
  return (
    <>
      <Header text="Picker" />
      <View style={{paddingHorizontal: 15, paddingTop: 15}}>
        <Picker onChange={handleYearChange} data={data} defaultIndex={0}>
          <Button title={`选择姓名${index >= 0 ? data[index] : ''}`} />
        </Picker>
      </View>
    </>
  );
};

export default GridDemo;
