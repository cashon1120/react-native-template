import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Col, Row} from './Flex';
import BottomSheet from './BottomSheet';
import globalStyle, {PRIMARY_COLOR} from '@/globalStyle';

interface Props {
  visible: boolean;
  onCancel: Function;
  onChange: Function;
  defaultDate?: string; // 默认日期
  minimumDate?: string; // 最小可选日期，如：2023-05-01
  maximumDate?: string; // 最大可选日期
  title?: string; // 标题
  mode?: 'datetime' | 'date' | 'time';
}

const DateSelecte = (props: Props) => {
  const {
    onChange,
    onCancel,
    visible,
    mode = 'date',
    title = '请选择时间',
    defaultDate,
    minimumDate,
    maximumDate,
  } = props;
  const getDate = (date?: string) => {
    if (!date || isNaN(Date.parse(date))) {
      return undefined;
    }
    return new Date(date);
  };
  const [date, setDate] = useState<Date>(getDate(defaultDate) || new Date());
  const selectedDate = useRef<Date>();
  const handleDateChange = (value: Date) => {
    selectedDate.current = value;
  };

  const handleSelectDate = () => {
    setDate(selectedDate.current as Date);
    onChange(selectedDate.current);
  };
  return (
    <>
      <BottomSheet visible={visible} onCancel={onCancel}>
        <View
          style={[
            globalStyle.contentCenter,
            {paddingBottom: Platform.OS === 'android' ? 12 : 0},
          ]}>
          <Col>
            <TouchableOpacity style={styles.btn} onPress={() => onCancel()}>
              <Text style={[styles.btn_text, styles.btn_cancel]}>取消</Text>
            </TouchableOpacity>
            <Row flex={1} justifyContent="center">
              <Text style={styles.title}>{title}</Text>
            </Row>
            <TouchableOpacity style={styles.btn} onPress={handleSelectDate}>
              <Text style={[styles.btn_text, styles.btn_submit]}>确认</Text>
            </TouchableOpacity>
          </Col>

          <DatePicker
            date={date}
            mode={mode}
            locale="zh"
            textColor="#000"
            onDateChange={handleDateChange}
            minimumDate={getDate(minimumDate)}
            maximumDate={getDate(maximumDate)}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default DateSelecte;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  top: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: '#555',
    paddingRight: 2,
  },
  btn: {
    padding: 15,
  },
  btn_text: {
    fontSize: 14,
  },
  btn_cancel: {
    color: '#666',
  },
  btn_submit: {
    color: PRIMARY_COLOR,
  },
});
