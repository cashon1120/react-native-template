/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect, FC, PropsWithChildren} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TextInput from './TextInput';
import {Col, Row} from './Flex';
import Modal from './Modal';
import {PRIMARY_COLOR} from '@/globalStyle';
import {PickerProps} from './types';

let autoScrollTimer: ReturnType<typeof setTimeout>;
const HEIGHT = 40;

const Picker: FC<PropsWithChildren<PickerProps>> = ({
  options,
  onChange,
  defaultValue,
  labelKey = 'label',
  valueKey = 'value',
  placeholder,
  title = '请选择',
}) => {
  const pickerRef: any = useRef();
  const [data, setData] = useState([...(options || [])]);
  const tempScrollIndex = useRef(0);
  const scrollIndex = useRef(0);
  const isScrolling = useRef(false);
  const isAutoScroll = useRef(false);
  const handleSetScrollIndex = (nativeEvent: any) => {
    if (!pickerRef.current) {
      return;
    }
    const index = Math.min(
      Math.max(Math.round(nativeEvent.contentOffset.y / HEIGHT), 0),
      data.length - 1,
    );
    scrollIndex.current = index;
    isAutoScroll.current = true;
    autoScrollTimer = setTimeout(() => {
      isAutoScroll.current = false;
      isScrolling.current = false;
    }, 300);
    pickerRef.current.scrollTo({x: 0, y: index * HEIGHT});
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setTimeout(() => {
      isScrolling.current = false;
    }, 300);
    if (isAutoScroll.current) {
      return;
    }
    const {nativeEvent} = e;
    handleSetScrollIndex(nativeEvent);
  };

  const onMomentumScrollBegin = () => {
    isScrolling.current = true;
    isAutoScroll.current = false;
    clearTimeout(autoScrollTimer);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {nativeEvent} = e;
    isScrolling.current = false;
    setTimeout(() => {
      if (!isScrolling.current) {
        handleSetScrollIndex(nativeEvent);
      }
    }, 200);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    isScrolling.current = true;
    const scrollY = e.nativeEvent.contentOffset.y;
    data?.forEach((item: any, index: number) => {
      const itemY = index * HEIGHT;
      const space = Math.abs(itemY - scrollY);
      const num = 1 - space / 120;
      item.style = {
        opacity: num,
        transform: [{scaleY: 1 - space / 400}],
      };
    });
    setData([...data]);
  };

  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState();
  const getCurrentVale = () => {
    if (options) {
      const item: any = options[scrollIndex.current];
      return {
        label: item[labelKey],
        value: item[valueKey],
      };
    }
  };
  const handleSelectDate = () => {
    if (isScrolling.current) {
      return;
    }
    const selectedData = getCurrentVale();
    setSelectedLabel(selectedData?.label);
    onChange(selectedData?.value);
    tempScrollIndex.current = scrollIndex.current;
    setVisible(false);
  };
  useEffect(() => {
    let _index = 0;
    (options || []).forEach((item: any, index: number) => {
      if (item[valueKey] === defaultValue) {
        _index = index;
        tempScrollIndex.current = index;
        setSelectedLabel(item[labelKey]);
      }
    });
    setTimeout(() => {
      scrollIndex.current = _index;
      pickerRef.current &&
        pickerRef.current.scrollTo({
          x: 0,
          y: _index * HEIGHT,
          animate: false,
        });
    }, 0);
    return () => {
      clearTimeout(autoScrollTimer);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      pickerRef.current &&
        pickerRef.current.scrollTo({
          x: 0,
          y: tempScrollIndex.current * HEIGHT,
        });
    }, 0);
  }, [visible]);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View>
          <TextInput
            placeholder={placeholder}
            value={selectedLabel}
            placeholderTextColor="#ccc"
            endIcon={
              <Icon name="chevron-down-outline" color="#999" size={16} />
            }
          />
          <View style={styles.mask} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        position="bottom">
        <>
          <Col style={{borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <Row>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setVisible(false)}>
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
          <View style={styles.wrapper}>
            <View style={[styles.option, styles.line]} />
            <ScrollView
              style={{height: '100%'}}
              ref={pickerRef}
              onMomentumScrollEnd={onMomentumScrollEnd}
              onMomentumScrollBegin={onMomentumScrollBegin}
              onScrollEndDrag={onScrollEndDrag}
              onScroll={onScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}>
              <View style={styles.option} />
              <View style={styles.option} />
              {data?.map((item: any) => (
                <View style={styles.option} key={item[valueKey]}>
                  <Text style={[item.style, {color: '#333', fontSize: 18}]}>
                    {item[labelKey]}
                  </Text>
                </View>
              ))}
              <View style={styles.option} />
              <View style={styles.option} />
            </ScrollView>
          </View>
        </>
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    position: 'relative',
  },
  topMask: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    zIndex: 10,
  },
  bottomMask: {
    bottom: 0,
    top: 'auto',
  },
  option: {
    height: HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    position: 'absolute',
    width: '100%',
    top: 80,
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
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
});
