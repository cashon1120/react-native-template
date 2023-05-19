import React, {useState} from 'react';
import dayjs from 'dayjs';
import {DatePicker, Button, Header, Col, Row} from '@/library/Index';

const BottomSheetDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [date1, setDate1] = useState('');
  const handleDateChange1 = (date: string) => {
    setDate1(dayjs(date).format('YYYY-MM-DD'));
    setVisible1(false);
  };
  const [visible2, setVisible2] = useState(false);
  const [date2, setDate2] = useState('2023-06-06');
  const handleDateChange2 = (date: string) => {
    setDate2(dayjs(date).format('YYYY-MM-DD'));
    setVisible2(false);
  };
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  return (
    <>
      <Header text="DatePicker" />
      <Col direction="column" x={15} y={15}>
        <Row>
          <Button
            title={`选择日期 ${date1}`}
            onPress={() => setVisible1(true)}
          />
        </Row>
        <Row>
          <Button
            title={`指定日期 ${date2}`}
            onPress={() => setVisible2(true)}
          />
        </Row>
        <Row>
          <Button title="日期-时分" onPress={() => setVisible3(true)} />
        </Row>
        <Row>
          <Button title="时分" onPress={() => setVisible4(true)} />
        </Row>
      </Col>

      <DatePicker
        visible={visible1}
        title="选择日期"
        onCancel={() => setVisible1(false)}
        onChange={handleDateChange1}
      />

      <DatePicker
        visible={visible2}
        title="选择日期"
        defaultDate={date2}
        onCancel={() => setVisible2(false)}
        onChange={handleDateChange2}
      />

      <DatePicker
        mode="datetime"
        visible={visible3}
        title="选择时间"
        onCancel={() => setVisible3(false)}
        onChange={() => {}}
      />

      <DatePicker
        mode="time"
        visible={visible4}
        title="选择时分"
        onCancel={() => setVisible4(false)}
        onChange={() => {}}
      />
    </>
  );
};

export default BottomSheetDemo;
