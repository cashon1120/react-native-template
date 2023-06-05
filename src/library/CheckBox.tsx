import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CheckBoxProps} from './types';
import {PRIMARY_COLOR} from '@/globalStyle';

const CheckBox = (props: CheckBoxProps) => {
  const {
    options,
    defaultValue,
    onChange,
    setValueFn,
    inline,
    color = '#666',
    activeColor = PRIMARY_COLOR,
    labelKey = 'label',
    valueKey = 'value',
  } = props;
  const [checked, setChecked] = useState<any>(defaultValue || []);

  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    setChecked(newValue);
    shouldChange && onChange(newValue);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleChange = (value: string | number) => {
    if (!checked.includes(value)) {
      const res = new Set([...checked, value]);
      setChecked([...res]);
      onChange([...res]);
    } else {
      for (let i = 0; i < checked.length; i++) {
        if (checked[i] === value) {
          checked.splice(i, 1);
          break;
        }
      }
      setChecked([...checked]);
      onChange([...checked]);
    }
  };

  return (
    <View style={[inline ? styles.inlineWrapper : null]}>
      {(options || []).map((item: any) => (
        <TouchableOpacity
          key={item[valueKey]}
          style={inline ? styles.inlineContainer : null}
          onPress={() => handleChange(item[valueKey])}>
          <View style={[styles.container]} key={item[valueKey]}>
            {checked.includes(item[valueKey]) ? (
              <Icon name="checkbox-outline" color={activeColor} size={20} />
            ) : (
              <Icon name="stop-outline" color={color} size={20} />
            )}
            <Text
              style={[
                styles.label,
                {
                  color: checked.includes(item[valueKey]) ? activeColor : color,
                },
              ]}>
              {item[labelKey]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  inlineWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inlineContainer: {
    width: '33.333%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  label: {
    marginLeft: 5,
  },
});
