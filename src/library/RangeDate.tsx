/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, FC, PropsWithChildren} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {Col, Row} from './Flex';
import Text from './Text';
import Modal from './Modal';
import TextInput from './TextInput';
import Toast from './Toast';
import {isValidDate} from './utils';
import {RangeDate} from './types';
import {PRIMARY_COLOR} from '@/globalStyle';

export interface DateItem {
  date: number | '';
  timestamp: number;
  month: number;
  year: number;
  selected: boolean;
  disabled?: boolean;
}
export interface ReturnDate {
  beginDate: Omit<DateItem, 'selected'>;
  endDate: Omit<DateItem, 'selected'>;
}

const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const width = Dimensions.get('window').width;
const getMonthDates = (day: ReturnType<typeof dayjs>): DateItem[] => {
  const dates: DateItem[] = [];
  const startDay = day.date(0).day();
  const preMonthEndDate = day.add(-1, 'month').endOf('month').date();
  const endDate = day.endOf('month').date();
  const month = day.month() + 1;
  const year = day.year();
  for (let i = 0; i < startDay; i++) {
    dates.push({
      date: preMonthEndDate - startDay + i + 1,
      timestamp: day
        .startOf('month')
        .add(-(i + 1), 'day')
        .startOf('day')
        .valueOf(),
      month: 0,
      year: 0,
      selected: false,
      disabled: true,
    });
  }
  for (let i = 1; i <= endDate; i++) {
    dates.push({
      date: i,
      timestamp: dayjs(`${year}-${month}-${i}`).startOf('day').valueOf(),
      year,
      month,
      selected: false,
    });
  }
  const nextDatesLength = Math.ceil(dates.length / 7) * 7 - dates.length;
  for (let i = 0; i < nextDatesLength; i++) {
    dates.push({
      date: i + 1,
      timestamp: day
        .endOf('month')
        .add(i + 1, 'day')
        .startOf('day')
        .valueOf(),
      month: 0,
      year: 0,
      selected: false,
      disabled: true,
    });
  }
  return dates;
};
const getdDateStr = (date?: RangeDate): string => {
  if (!date || !isValidDate(date.beginDate) || isValidDate(date.endDate)) {
    return '';
  }
  if (new Date(date.beginDate).getTime() > new Date(date.endDate).getTime()) {
    return '';
  }
  return `${date.beginDate} - ${date.endDate}`;
};
const formatDate = (date: string) => {
  return {
    timestamp: dayjs(date).valueOf(),
  };
};

interface Props {
  // onChange: (date: RangeDate) => void;
  onChange: (date: any) => void;
  placeholder?: string;
  onCancel?: Function;
  defaultDate?: RangeDate;
  minimumDate?: string;
  maximumDate?: string;
  title?: string;
  activeColor?: string;
  activeBg?: string;
}

const getDate = (date?: string) => {
  if (!date || isNaN(Date.parse(date))) {
    return undefined;
  }
  return dayjs(date).valueOf();
};

const RangeDatePicker: FC<PropsWithChildren<Props>> = ({
  placeholder,
  defaultDate,
  minimumDate,
  maximumDate,
  activeBg = PRIMARY_COLOR,
  onCancel,
  title = '请选择时间段',
  children,
  onChange,
}) => {
  const [currentMonth, setCurrnetMonth] = useState(dayjs());
  const [minDate] = useState(getDate(minimumDate));
  const [maxDate] = useState(getDate(maximumDate));
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    getdDateStr(defaultDate),
  );

  const [currentMonthDate, setCurrentMonthDate] = useState<DateItem[]>(
    getMonthDates(currentMonth),
  );
  const [beginTime, setBeginTime] = useState<Pick<DateItem, 'timestamp'>>();
  const [endTime, setEndTime] = useState<Pick<DateItem, 'timestamp'>>();

  const handleChangeMonth = (type: 1 | -1) => {
    setCurrnetMonth(currentMonth.add(type, 'month'));
    setCurrentMonthDate(getMonthDates(currentMonth.add(type, 'month')));
  };

  const handleCancel = () => {
    if (cacheDate.current) {
      setBeginTime(formatDate(cacheDate.current.beginDate));
      setEndTime(formatDate(cacheDate.current.endDate));
    }
    setVisible(false);
    onCancel && onCancel();
  };

  const handleSetDate = (newDate: DateItem) => {
    if (
      newDate.disabled ||
      (maxDate && newDate.timestamp > maxDate) ||
      (minDate && newDate.timestamp < minDate)
    ) {
      return;
    }
    if (!beginTime && !endTime) {
      setBeginTime(newDate);
      setEndTime(newDate);
      return;
    }
    if (beginTime?.timestamp !== endTime?.timestamp) {
      setBeginTime(newDate);
      setEndTime(newDate);
      return;
    }
    if (beginTime && endTime) {
      if (newDate.timestamp < beginTime.timestamp) {
        setBeginTime(newDate);
        setEndTime(beginTime);
      } else {
        setEndTime(newDate);
      }
    }
  };
  const cacheDate = useRef<RangeDate>();
  useEffect(() => {
    if (
      defaultDate &&
      defaultDate.beginDate &&
      defaultDate.endDate &&
      !isNaN(Date.parse(defaultDate.beginDate)) &&
      !isNaN(Date.parse(defaultDate.endDate)) &&
      dayjs(defaultDate.beginDate).valueOf() <
        dayjs(defaultDate.endDate).valueOf()
    ) {
      cacheDate.current = defaultDate;
      setCurrnetMonth(dayjs(defaultDate.beginDate));
      setBeginTime(formatDate(defaultDate.beginDate));
      setEndTime(formatDate(defaultDate.endDate));
      setCurrentMonthDate(getMonthDates(dayjs(defaultDate.beginDate)));
    }
  }, []);
  const handleSelectDate = () => {
    if (!beginTime || !endTime) {
      Toast.warning('请选择时间', {
        position: 'top',
        disableShadow: true,
      });
      return;
    }
    const _date = {
      beginDate: dayjs(beginTime.timestamp).format('YYYY-MM-DD'),
      endDate: dayjs(endTime.timestamp).format('YYYY-MM-DD'),
    };
    cacheDate.current = _date;
    setSelectedDate(`${_date.beginDate} - ${_date.endDate}`);
    // onChange(_date);
    onChange([dayjs(beginTime.timestamp), dayjs(endTime.timestamp)]);
    handleCancel();
  };
  const getTextStyle = (item: DateItem) => {
    const style: any = {};
    // 当天日期样式
    if (item.timestamp === dayjs().startOf('day').valueOf()) {
      style.borderWidth = 1;
      style.borderColor = activeBg;
    }
    // 禁用日期
    if (
      item.disabled ||
      (minDate && item.timestamp < minDate) ||
      (maxDate && item.timestamp > maxDate)
    ) {
      style.color = '#ccc';
      return style;
    }
    // 开始和结束日期
    if (
      (beginTime && beginTime.timestamp === item.timestamp) ||
      (endTime && endTime.timestamp === item.timestamp)
    ) {
      style.color = '#fff';
    }
    return style;
  };
  const getBgStyle = (item: DateItem) => {
    const style: any = {};
    // 开始和结束日期
    if (
      (beginTime && beginTime.timestamp === item.timestamp) ||
      (endTime && endTime.timestamp === item.timestamp)
    ) {
      style.backgroundColor = activeBg;
      style.opacity = 1;
      return style;
    }
    // 中间日期
    if (
      beginTime &&
      beginTime.timestamp < item.timestamp &&
      endTime &&
      item.timestamp < endTime.timestamp
    ) {
      style.backgroundColor = activeBg;
      style.opacity = 0.1;
      if (item.disabled) {
        style.color = '#ccc';
      }
      return style;
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {children || (
          <View>
            <TextInput
              placeholder={placeholder || '请选择时间段'}
              value={selectedDate}
              disableFocus
              endIcon={<Icon name="calendar-outline" color="#999" size={16} />}
            />
          </View>
        )}
      </TouchableOpacity>
      <Modal visible={visible} onCancel={handleCancel} position="bottom">
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
        <Col style={[styles.row, {borderBottomWidth: 0}]}>
          <Row>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => handleChangeMonth(-1)}>
              <Icon name="chevron-back-outline" size={20} color="#999" />
            </TouchableOpacity>
          </Row>
          <Row flex={1} flexBox alignItems="center" justifyContent="center">
            <Text style={styles.currentTime} size={16} color="#333">
              {currentMonth.format('YYYY-MM').replace('-', '年')}月
            </Text>
          </Row>
          <Row>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => handleChangeMonth(1)}>
              <Icon name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>
          </Row>
        </Col>
        <Col style={styles.row}>
          {weekdays.map(item => (
            <Row key={item} flexBox justifyContent="center" style={styles.item}>
              <Text style={[styles.itemText]} color="#999">
                {item}
              </Text>
            </Row>
          ))}
        </Col>
        <View style={styles.dateBox}>
          {currentMonthDate.map((item: DateItem, index: number) => (
            <View
              style={[
                styles.item,
                beginTime && beginTime.timestamp === item.timestamp
                  ? styles.begintDate
                  : null,
                endTime && endTime.timestamp === item.timestamp
                  ? styles.endDate
                  : null,
              ]}
              key={index}>
              <View style={[styles.textBg, getBgStyle(item)]} />
              <TouchableOpacity
                activeOpacity={item.disabled ? 1 : 0.7}
                onPress={() => handleSetDate(item)}>
                <Text style={[styles.itemText, getTextStyle(item)]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Modal>
    </>
  );
};

export default RangeDatePicker;

const styles = StyleSheet.create({
  item: {
    width: Math.floor((width - 2) / 7),
    marginTop: 2,
    overflow: 'hidden',
  },
  itemText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    zIndex: 99,
    borderRadius: 3,
  },
  textBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  currentTime: {
    color: '#333',
    fontWeight: '500',
    paddingVertical: 10,
  },
  topButton: {
    padding: 10,
  },
  begintDate: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  endDate: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  row: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
    width: '100%',
  },
  dateBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 1,
  },
  beginAndEndText: {
    opacity: 1,
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
  title: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
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
