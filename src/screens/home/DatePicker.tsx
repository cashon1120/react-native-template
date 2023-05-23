import React, {useState} from 'react';
import dayjs from 'dayjs';
import {DatePicker, Button, Header, Col, Row, DateItem} from '@/library/Index';

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
  const [date3, setDate3] = useState('');
  const handleDateChange3 = (date: string) => {
    setDate3(dayjs(date).format('YYYY-MM-DD HH:mm'));
    setVisible3(false);
  };

  const [visible4, setVisible4] = useState(false);
  const [date4, setDate4] = useState('');
  const handleDateChange4 = (date: string) => {
    setDate4(dayjs(date).format('HH:mm'));
    setVisible4(false);
  };

  const [visible5, setVisible5] = useState(false);
  const [date5, setDate5] = useState({beginDate: '', endDate: ''});
  const handleDateChange5 = (date?: DateItem) => {
    if (date) {
      setDate5({
        beginDate: dayjs(date.beginDate.timestamp).format('YYYY-MM-DD'),
        endDate: dayjs(date.endDate.timestamp).format('YYYY-MM-DD'),
      });
    }
    setVisible5(false);
  };
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
          <Button
            title={`日期-时分 ${date3}`}
            onPress={() => setVisible3(true)}
          />
        </Row>
        <Row>
          <Button title={`时分 ${date4}`} onPress={() => setVisible4(true)} />
        </Row>
        <Row>
          <Button
            title={`时间段 ${date5.beginDate}${date5.beginDate ? '至' : ''}${
              date5.endDate
            }`}
            onPress={() => setVisible5(true)}
          />
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
        onChange={handleDateChange3}
      />

      <DatePicker
        mode="time"
        visible={visible4}
        title="选择时分"
        onCancel={() => setVisible4(false)}
        onChange={handleDateChange4}
      />

      <DatePicker
        mode="range"
        visible={visible5}
        title="选择时间段"
        rangeDate={date5}
        onCancel={() => setVisible5(false)}
        onChange={handleDateChange5}
      />
    </>
  );
};

export default BottomSheetDemo;
