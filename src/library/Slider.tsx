import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import {PRIMARY_COLOR} from '@/globalStyle';
import {Col, Row} from './Flex';
import Text from './Text';
import {SliderProps} from './types';

const MySlider = (props: SliderProps) => {
  const {
    onChange,
    min,
    max,
    setValueFn,
    step,
    defaultValue,
    disabled,
    bgColor = '#ddd',
    activeColor = PRIMARY_COLOR,
  } = props;
  const [value, setValue] = useState<any>(defaultValue || 0);
  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    setValue(newValue);
    shouldChange && onChange(newValue);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Col style={[disabled ? styles.disabledWrapper : null]}>
      <Row flex={1}>
        <Slider
          // onSlidingComplete={handleChange}
          onValueChange={handleChange}
          style={{marginLeft: Platform.OS === 'android' ? -12 : 0}}
          value={value}
          step={step || 1}
          minimumValue={min || 0}
          maximumValue={max || 10}
          minimumTrackTintColor={activeColor}
          thumbTintColor={activeColor}
          maximumTrackTintColor={bgColor}
          disabled={disabled}
        />
      </Row>
      <Row
        // style={{minWidth: 30}}
        // justifyContent="flex-end"
        alignItems="flex-end">
        <Text size={14} color="#666">
          {value}
        </Text>
      </Row>
    </Col>
  );
};

export default MySlider;

const styles = StyleSheet.create({
  sliderWrapper: {
    flex: 1,
  },
  disabledWrapper: {
    opacity: 0.5,
  },
});
