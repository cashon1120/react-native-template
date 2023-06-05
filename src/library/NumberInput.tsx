import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {NumberInputProps} from './types';

const NumberInput = (props: NumberInputProps) => {
  const {
    onChange,
    disabled,
    min,
    max,
    defaultValue,
    placeholder,
    setValueFn,
    fixedLength,
  } = props;
  const [value, setValue] = useState(defaultValue);

  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    setValue(newValue);
    shouldChange && onChange(newValue);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleInputChange = (text: string) => {
    let res: any = text;
    // 如果不能转换成Number就用上一个值
    if (res !== '') {
      if (!Number(res) && Number(res) !== 0) {
        res = value;
      }
      if (
        (text[0] === '-' && text.length === 1) ||
        (text[text.length - 1] === '.' && text.length > 0 && !Number(res))
      ) {
        res = text;
      }
    }
    if (text[text.length - 1] !== '.') {
      if (Number(res)) {
        if (min !== undefined) {
          res = Math.max(min, Number(res));
        }
        if (max !== undefined) {
          res = Math.min(max, Number(res));
        }
      }
      if (
        (fixedLength || typeof fixedLength === 'number') &&
        text.indexOf('.') > 0
      ) {
        const str = res.toString().split('.');
        const front = str[0];
        let end = str[1].substring(0, fixedLength);
        res = Number(`${front}.${end}`);
      }
    }
    setValue(res);
    onChange(res);
  };

  const handleInputBlur = () => {
    if (!Number(value)) {
      setValue('');
      onChange('');
    }
  };

  return (
    <View>
      <TextInput
        onChangeText={handleInputChange}
        style={[styles.textInput, disabled ? styles.disableTextInput : null]}
        placeholder={placeholder}
        defaultValue={defaultValue?.toString()}
        value={value?.toString()}
        keyboardType="numeric"
        placeholderTextColor="#ccc"
        onBlur={handleInputBlur}
        editable={!disabled}
      />
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'rgba(229, 229, 229, 1)',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: '#666',
    backgroundColor: '#fff',
  },
  disableTextInput: {
    backgroundColor: '#fafafa',
    color: '#ccc',
  },
});
