import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Col, Row} from './Flex';
import Modal from './Modal';
import RangeDate from './RangeDate';
import globalStyle, {PRIMARY_COLOR} from '@/globalStyle';

interface Props {
  visible: boolean;
  onCancel: Function;
  onChange: Function;
  defaultDate?: string; // 默认日期
  minimumDate?: string; // 最小可选日期，如：2023-05-01
  maximumDate?: string; // 最大可选日期
  title?: string; // 标题
  mode?: 'datetime' | 'date' | 'time' | 'range';
  rangeDate?: {
    beginDate: string;
    endDate: string;
  };
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
    rangeDate,
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
  const selcetedRangeDate = useRef<any>();
  const handleRangeDateChange = (value: any) => {
    selcetedRangeDate.current = value;
  };
  const handleSelectDate = () => {
    if (mode === 'range') {
      onChange(selcetedRangeDate.current);
      return;
    }
    setDate(selectedDate.current as Date);
    onChange(selectedDate.current);
  };
  return (
    <>
      <Modal visible={visible} onCancel={onCancel} position="bottom">
        <View
          style={[
            globalStyle.contentCenter,
            {paddingBottom: Platform.OS === 'android' ? 12 : 0},
          ]}>
          <Col>
            <Row>
              <TouchableOpacity style={styles.btn} onPress={() => onCancel()}>
                <Text style={[styles.btn_text, styles.btn_cancel]}>取消</Text>
              </TouchableOpacity>
            </Row>
            <Row flex={1} justifyContent="center">
              <Text style={styles.title}>{title}</Text>
            </Row>
            <Row>
              <TouchableOpacity style={styles.btn} onPress={handleSelectDate}>
                <Text style={[styles.btn_text, styles.btn_submit]}>确认</Text>
              </TouchableOpacity>
            </Row>
          </Col>
          {mode === 'range' ? (
            <RangeDate onChange={handleRangeDateChange} rangeDate={rangeDate} />
          ) : (
            <DatePicker
              date={date}
              mode={mode}
              locale="zh"
              textColor="#000"
              onDateChange={handleDateChange}
              minimumDate={getDate(minimumDate)}
              maximumDate={getDate(maximumDate)}
            />
          )}
        </View>
      </Modal>
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
