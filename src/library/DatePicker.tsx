import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Col, Row} from './Flex';
import Modal from './Modal';
import globalStyle, {PRIMARY_COLOR} from '@/globalStyle';

interface Props {
  visible: boolean;
  onCancel: Function;
  onChange: Function;
  title?: string;
}

const DateSelecte = (props: Props) => {
  const {onChange, onCancel, visible, title = '请选择时间'} = props;
  const [date, setDate] = useState<Date>(new Date());

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
      <Modal visible={visible} onCancel={onCancel}>
        <View
          style={[
            globalStyle.contentCenter,
            {
              paddingBottom: Platform.OS === 'android' ? 12 : 0,
              backgroundColor: '#fff',
            },
          ]}>
          <Col>
            <Row>
              <TouchableOpacity style={styles.btn} onPress={() => onCancel()}>
                <Text style={[styles.btn_text, styles.btn_cancel]}>取消</Text>
              </TouchableOpacity>
            </Row>
            <Row flex={1}>
              <Text style={styles.title}>{title}</Text>
            </Row>
            <Row>
              <TouchableOpacity style={styles.btn} onPress={handleSelectDate}>
                <Text style={[styles.btn_text, styles.btn_submit]}>确认</Text>
              </TouchableOpacity>
            </Row>
          </Col>

          <DatePicker
            date={date}
            mode="date"
            locale="zh"
            textColor="#000"
            minimumDate={new Date('2022-01-01')}
            maximumDate={new Date()}
            onDateChange={handleDateChange}
          />
        </View>
      </Modal>
    </>
  );
};

export default DateSelecte;

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    top: 0,
    left: 0,
  },
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
