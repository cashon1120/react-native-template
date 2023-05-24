/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Col, Row} from './Flex';
import Text from './Text';
import dayjs from 'dayjs';

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

const formatDate = (date: string) => {
  return {
    timestamp: dayjs(date).valueOf(),
  };
};

interface Props {
  rangeDate?: {
    beginDate?: string;
    endDate?: string;
  };
  activeColor?: string;
  activeBg?: string;
  minimumDate?: string; // 最小可选日期，如：2023-05-01
  maximumDate?: string; // 最大可选日期
  onChange: Function;
}

const getDate = (date?: string) => {
  if (!date || isNaN(Date.parse(date))) {
    return undefined;
  }
  return dayjs(date).valueOf();
};

const RangeDate = (props: Props) => {
  const {
    rangeDate,
    minimumDate,
    maximumDate,
    activeBg = '#466CF5',
    activeColor = '#fff',
  } = props;
  const [currentMonth, setCurrnetMonth] = useState(dayjs());
  const [minDate] = useState(getDate(minimumDate));
  const [maxDate] = useState(getDate(maximumDate));

  const [currentMonthDate, setCurrentMonthDate] = useState<DateItem[]>(
    getMonthDates(currentMonth),
  );
  const [beginTime, setBeginTime] = useState<Pick<DateItem, 'timestamp'>>();
  const [endTime, setEndTime] = useState<Pick<DateItem, 'timestamp'>>();

  const handleChangeMonth = (type: 1 | -1) => {
    setCurrnetMonth(currentMonth.add(type, 'month'));
    setCurrentMonthDate(getMonthDates(currentMonth.add(type, 'month')));
  };

  const handleSetDate = (date: DateItem) => {
    if (
      date.disabled ||
      (maxDate && date.timestamp > maxDate) ||
      (minDate && date.timestamp < minDate)
    ) {
      return;
    }
    if (!beginTime && !endTime) {
      setBeginTime(date);
      setEndTime(date);
      return;
    }
    if (beginTime?.timestamp !== endTime?.timestamp) {
      setBeginTime(date);
      setEndTime(date);
      return;
    }
    if (beginTime && endTime) {
      if (date.timestamp < beginTime.timestamp) {
        setBeginTime(date);
        setEndTime(beginTime);
      } else {
        setEndTime(date);
      }
    }
  };

  useEffect(() => {
    if (
      rangeDate &&
      rangeDate.beginDate &&
      rangeDate.endDate &&
      !isNaN(Date.parse(rangeDate.beginDate)) &&
      !isNaN(Date.parse(rangeDate.endDate))
    ) {
      setCurrnetMonth(dayjs(rangeDate.beginDate));
      setBeginTime(formatDate(rangeDate.beginDate));
      setEndTime(formatDate(rangeDate.endDate));
      setCurrentMonthDate(getMonthDates(dayjs(rangeDate.beginDate)));
    }
  }, []);

  useEffect(() => {
    props.onChange({beginDate: beginTime, endDate: endTime});
  }, [beginTime, endTime]);

  const getStateStyle = (item: DateItem) => {
    if (
      beginTime &&
      beginTime.timestamp <= item.timestamp &&
      endTime &&
      item.timestamp <= endTime.timestamp
    ) {
      const style = {
        backgroundColor: activeBg,
        color: activeColor,
        opacity: 1,
      };
      if (item.disabled) {
        style.opacity = 0.7;
      }
      return style;
    }
    if (
      item.disabled ||
      (minDate && item.timestamp < minDate) ||
      (maxDate && item.timestamp > maxDate)
    ) {
      return styles.disabled;
    }
    return null;
  };

  return (
    <>
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
      <Col style={styles.dateBox}>
        {currentMonthDate.map((item: DateItem, index: number) => (
          <Row
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
            <TouchableOpacity
              activeOpacity={item.disabled ? 1 : 0.7}
              onPress={() => handleSetDate(item)}>
              <Text style={[styles.itemText, getStateStyle(item)]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          </Row>
        ))}
      </Col>
    </>
  );
};

export default RangeDate;

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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  endDate: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  disabled: {
    color: '#ccc',
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
});
