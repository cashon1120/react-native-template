import React, {useState} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {DatePicker, Button, Header} from '@/library/Index';

const BottomSheetDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [date1, setDate1] = useState('');
  const handleDateChange = (date: string) => {
    setDate1(dayjs(date).format('YYYY-MM-DD'));
    setVisible1(false);
  };
  return (
    <>
      <Header text="DatePicker" />
      <View style={{padding: 15}}>
        <Button title={`选择日期 ${date1}`} onPress={() => setVisible1(true)} />
      </View>
      {/* <View style={{paddingHorizontal: 15}}>
        <Button title="Show2(speed = 500)" onPress={() => setVisible2(true)} />
      </View> */}
      <DatePicker
        visible={visible1}
        title="选择日期"
        minimumDate="abc"
        maximumDate="2023-05"
        onCancel={() => setVisible1(false)}
        onChange={handleDateChange}
      />
    </>
  );
};

export default BottomSheetDemo;
