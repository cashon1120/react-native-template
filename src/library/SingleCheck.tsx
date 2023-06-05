import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '@/globalStyle';

interface IProps {
  setValueFn: any;
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
}

const CheckBox = (props: IProps) => {
  const {defaultValue, onChange, setValueFn} = props;
  const [checked, setChecked] = useState<any>(defaultValue ? true : false);

  const setValueProps = (newValue: any, shouldChange?: boolean) => {
    let value = newValue;
    if (typeof newValue === 'string') {
      value = !!parseInt(newValue, 10);
    }
    setChecked(value);
    shouldChange && onChange && onChange(value);
  };

  useEffect(() => {
    setValueFn && setValueFn(setValueProps);
  });

  const handleChange = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={() => handleChange()} style={{marginLeft: 10}}>
      {checked ? (
        <Icon name="checkbox-outline" color={PRIMARY_COLOR} size={20} />
      ) : (
        <Icon name="stop-outline" color="#999" size={20} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
