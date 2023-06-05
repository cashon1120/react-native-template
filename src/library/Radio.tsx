import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioProps} from './types';
import {PRIMARY_COLOR} from '@/globalStyle';

type RadioValue = number | string | boolean;

const Radio = (props: RadioProps) => {
  const {
    options,
    defaultValue,
    onChange,
    inline,
    disabled,
    setValueFn,
    color = '#666',
    activeColor = PRIMARY_COLOR,
    labelKey = 'label',
    valueKey = 'value',
  } = props;
  const [checked, setChecked] = useState<any>(
    defaultValue || (defaultValue === 0 ? 0 : ''),
  );

  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    setChecked(newValue);
    shouldChange && onChange(newValue);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleChange = (value: RadioValue) => {
    setChecked(value);
    onChange(value);
  };
  return (
    <View style={[inline ? styles.inlineWrapper : null]}>
      {(options || []).map((item: any) => (
        <TouchableOpacity
          key={item[valueKey]}
          activeOpacity={disabled ? 1 : 0.6}
          style={inline ? styles.inlineContainer : null}
          onPress={() => (disabled ? null : handleChange(item[valueKey]))}>
          <View style={styles.container} key={item[valueKey]}>
            {checked.toString() === item[valueKey]?.toString() ? (
              <Icon
                name="checkmark-circle-outline"
                color={activeColor}
                size={20}
              />
            ) : (
              <Icon name="ellipse-outline" color={color} size={20} />
            )}
            <Text>{item[labelKey]}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  inlineWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  label: {
    marginLeft: 5,
  },
  diabledIcon: {
    opacity: 0.3,
  },
  disabledLabel: {
    color: 'rgba(85, 90, 111, .4)',
  },
  inlineContainer: {
    width: '33.333%',
  },
});
