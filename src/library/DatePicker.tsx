import React, {useState, useEffect, useRef, FC, PropsWithChildren} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {Col, Row} from './Flex';
import Modal from './Modal';
import TextInput from './TextInput';
import {DateMode} from './types';
import {isValidDate} from './utils';
import globalStyle, {PRIMARY_COLOR} from '@/globalStyle';
// import {DatePickerProps} from './types';
interface Props {
  onCancel?: Function;
  onChange: Function;
  defaultDate?: string;
  minimumDate?: string;
  maximumDate?: string;
  textColor?: string;
  title?: string;
  mode?: DateMode;
  placeholder?: string;
}

const DateSelecte: FC<PropsWithChildren<Props>> = ({
  onChange,
  onCancel,
  mode = 'date',
  title = '请选择时间',
  defaultDate,
  minimumDate,
  maximumDate,
  textColor,
  placeholder,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState<Date>(
    isValidDate(defaultDate) || new Date(),
  );
  const tempSelectedDate = useRef<Date>();

  const [selectedDate, setSelectedDate] = useState<string>(defaultDate || '');

  const handleSelectDate = () => {
    let newDate: any = date || dayjs();
    tempSelectedDate.current = date;
    let _date = '';
    switch (mode) {
      case 'date':
        _date = dayjs(newDate).format('YYYY-MM-DD');
        setSelectedDate(_date);
        break;
      case 'datetime':
        _date = dayjs(newDate).format('YYYY-MM-DD HH:mm');
        setSelectedDate(_date);
        break;
      case 'time':
        _date = dayjs(newDate).format('HH:mm');
        setSelectedDate(_date);
        break;
    }
    // 传回字符串
    // onChange(_date);
    // 传回时间格式
    onChange(newDate);
    setVisible(false);
    onCancel && onCancel();
  };

  const handleDateChange = (newDate: any) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setDate(tempSelectedDate.current as any);
    onCancel && onCancel();
  };

  useEffect(() => {
    if (tempSelectedDate.current) {
      setDate(tempSelectedDate.current);
    }
  }, [visible]);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {children || (
          <View>
            <TextInput
              placeholder={placeholder || '请选择时间'}
              value={selectedDate}
              disableFocus
              endIcon={<Icon name="calendar-outline" color="#999" size={16} />}
            />
          </View>
        )}
      </TouchableOpacity>
      <Modal visible={visible} onCancel={handleCancel} position="bottom">
        <View
          style={[
            globalStyle.contentCenter,
            {paddingBottom: Platform.OS === 'android' ? 12 : 0},
          ]}>
          <Col>
            <Row>
              <TouchableOpacity style={styles.btn} onPress={handleCancel}>
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
          <DatePicker
            date={date || new Date()}
            mode={mode}
            locale="zh"
            textColor={textColor}
            onDateChange={handleDateChange}
            minimumDate={isValidDate(minimumDate)}
            maximumDate={isValidDate(maximumDate)}
          />
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
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});
