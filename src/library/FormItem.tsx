import React, {Component} from 'react';
import {View, Text, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Picker from './Picker';
import TextInput from './TextInput';
import CheckBox from './CheckBox';
import SingleCheck from './SingleCheck';
import Slider from './Slider';
import Radio from './Radio';
import {Col, Row} from './Flex';
import DatePicker from './DatePicker';
import RangeDatePicker from './RangeDate';
import NumberInput from './NumberInput';
import Switch from './Switch';
import {FormItemType} from './types';
import Upload from './Upload';

interface ItemProps {
  params: FormItemType;
  values: any;
  onRef: (instance: any) => void;
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

interface IState {
  value: any;
  error: boolean;
  patternError: boolean;
  patternMessage: string;
}

class FormItem extends Component<ItemProps, IState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      value: props.params.defaultValue,
      error: false,
      patternError: false,
      patternMessage: '',
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  setError = () => {
    this.setState({
      error: true,
    });
  };

  getPatternError = () => {
    return this.state.patternError;
  };
  checkValidValue = () => {
    const {value} = this.state;
    const {
      params: {pattern},
    } = this.props;
    if (pattern && value) {
      if (!pattern.match.test(value)) {
        this.setState({
          patternError: true,
          patternMessage: pattern.message,
        });
      } else {
        this.setState({
          patternMessage: '',
          patternError: false,
        });
      }
    }
  };

  onValueChange = (itemValue: any) => {
    const {
      params: {name},
      values,
    } = this.props;
    this.setState({
      value: itemValue,
      error: false,
      patternMessage: '',
      patternError: false,
    });
    values[name].value = itemValue;
    values[name].isChange = true;
    const {
      params: {onChange},
    } = this.props;
    onChange && onChange(itemValue);
  };

  setValue = (value: any, shouldChange?: boolean) => {
    if (typeof this.setValueInstance === 'function') {
      this.setValueInstance(value, shouldChange);
    }
  };

  setValueInstance: any = null;
  setValueFn = (instance: any) => {
    this.setValueInstance = instance;
  };

  onRef = (instance: any) => {
    this.setValueInstance = instance.setValue;
  };

  render() {
    const {
      itemStyle,
      labelStyle,
      params,
      params: {
        label,
        placeholder,
        require,
        defaultValue,
        requireMsg,
        disabled,
        type,
        textInputProps,
        radioProps,
        checkBoxProps,
        datePickerProps,
        numberInputProps,
        sliderProps,
        switchProps,
        pickerProps,
        uploadProps,
        rangePickerProps,
        desc,
      },
    } = this.props;
    const {error, patternMessage} = this.state;
    return (
      <View
        style={[
          styles.formItem,
          type === 'SingleCheck' ? styles.inlineFormItem : null,
          itemStyle,
        ]}>
        <Col>
          <Row>
            {require ? (
              <Text style={[styles.label, {color: '#ff3f3f'}]}>*</Text>
            ) : null}
          </Row>
          <Row>
            <Text style={[styles.label, labelStyle, params?.labelStyle]}>
              {label}
            </Text>
          </Row>
        </Col>
        <View style={{marginTop: type === 'SingleCheck' ? 0 : 8}}>
          {type === 'TextInput' ? (
            <TextInput
              onChange={this.onValueChange}
              onBlur={this.checkValidValue}
              placeholder={placeholder}
              defaultValue={defaultValue?.toString()}
              secureTextEntry={textInputProps?.secureTextEntry}
              disabled={disabled}
              setValueFn={this.setValueFn}
              maxLength={textInputProps?.maxLength}
              multiline={textInputProps?.multiline}
              placeholderTextColor={textInputProps?.placeholderTextColor}
              numberOfLines={textInputProps?.numberOfLines || 3}
            />
          ) : null}

          {type === 'NumberInput' ? (
            <NumberInput
              onChange={this.onValueChange}
              placeholder={placeholder}
              defaultValue={defaultValue?.toString()}
              min={numberInputProps?.min}
              max={numberInputProps?.max}
              disabled={disabled}
              fixedLength={numberInputProps?.fixedLength}
              setValueFn={this.setValueFn}
            />
          ) : null}

          {type === 'Picker' ? (
            <Picker
              defaultValue={defaultValue}
              options={pickerProps?.options}
              onChange={this.onValueChange}
              disabled={disabled}
              onRef={this.onRef}
              labelKey={pickerProps?.labelKey}
              valueKey={pickerProps?.valueKey}
              placeholder={placeholder}
            />
          ) : null}

          {type === 'Upload' ? (
            <Upload max={uploadProps?.max} onChange={this.onValueChange} />
          ) : null}

          {type === 'CheckBox' ? (
            <CheckBox
              defaultValue={defaultValue}
              onChange={this.onValueChange}
              options={checkBoxProps?.options || []}
              inline={checkBoxProps?.inline}
              setValueFn={this.setValueFn}
              valueKey={checkBoxProps?.valueKey}
              labelKey={checkBoxProps?.labelKey}
            />
          ) : null}

          {type === 'Radio' ? (
            <Radio
              defaultValue={defaultValue}
              onChange={this.onValueChange}
              inline={radioProps?.inline}
              disabled={disabled}
              options={radioProps?.options || []}
              setValueFn={this.setValueFn}
              valueKey={radioProps?.valueKey}
              labelKey={radioProps?.labelKey}
            />
          ) : null}

          {type === 'DatePicker' ? (
            <DatePicker
              title={label}
              mode={datePickerProps?.mode}
              defaultDate={defaultValue || ''}
              placeholder={placeholder}
              onChange={this.onValueChange}
            />
          ) : null}

          {type === 'RangeDatePicker' ? (
            <RangeDatePicker
              title={label}
              onChange={this.onValueChange}
              defaultDate={defaultValue || ''}
              activeBg={rangePickerProps?.activeBg}
              activeColor={rangePickerProps?.activeColor}
            />
          ) : null}

          {type === 'SingleCheck' ? (
            <SingleCheck
              defaultValue={defaultValue}
              onChange={this.onValueChange}
              setValueFn={this.setValueFn}
            />
          ) : null}

          {type === 'Slider' ? (
            <Slider
              defaultValue={defaultValue}
              onChange={this.onValueChange}
              setValueFn={this.setValueFn}
              disabled={disabled}
              min={sliderProps?.min}
              max={sliderProps?.max}
              step={sliderProps?.step}
            />
          ) : null}

          {type === 'Switch' ? (
            <Switch
              defaultValue={defaultValue}
              activeColor={switchProps?.activeColor}
              size={switchProps?.size}
              disabled={disabled}
              onChange={this.onValueChange}
            />
          ) : null}
        </View>
        {desc ? <Text style={[styles.desc]}>{desc}</Text> : null}
        {error ? (
          <Text style={styles.errorText}>{requireMsg || '该项为必填项'}</Text>
        ) : null}
        {patternMessage ? (
          <Text style={styles.errorText}>
            {patternMessage || '输入格式有误'}
          </Text>
        ) : null}
      </View>
    );
  }
}

export default FormItem;

const styles = StyleSheet.create({
  formItem: {
    paddingBottom: 15,
  },
  inlineFormItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: '#fc5858',
    fontSize: 12,
    paddingTop: 3,
  },
  desc: {
    color: '#999',
    fontSize: 12,
    paddingTop: 3,
  },
});
