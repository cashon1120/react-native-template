import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {TextInputProps} from './types';

const MyTextInput = (props: TextInputProps) => {
  const {
    onChange,
    secureTextEntry,
    disabled,
    defaultValue,
    placeholder,
    setValueFn,
    maxLength,
    multiline,
    numberOfLines,
    disableFocus,
    onFocus,
    onBlur,
    value,
    startIcon,
    endIcon,
    color = '#666',
    placeholderTextColor = '#ccc',
  } = props;
  const [inputValue, setInputValue] = useState(defaultValue);

  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    setInputValue(newValue);
    shouldChange && onChange(newValue);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleInputChange = (text: string) => {
    let res = text;
    setInputValue(text);
    onChange(res);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <View style={[styles.wrapper, multiline ? styles.multilineInput : null]}>
      {startIcon}
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={handleInputChange}
        style={[
          styles.input,
          {color},
          multiline ? styles.multilineInput : null,
          disabled ? styles.disableTextInput : null,
        ]}
        placeholder={placeholder}
        defaultValue={defaultValue?.toString()}
        value={inputValue?.toString()}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        maxLength={maxLength || 30}
        multiline={multiline}
        placeholderTextColor={placeholderTextColor}
        numberOfLines={numberOfLines || 5}
      />
      {endIcon}
      {disableFocus ? <View style={styles.mask} /> : null}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'rgba(229, 229, 229, 1)',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: '#666',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 'auto',
    paddingBottom: 0,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  disableTextInput: {
    backgroundColor: '#fafafa',
    color: '#ccc',
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
