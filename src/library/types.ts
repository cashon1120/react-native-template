import React from 'react';
import {
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
export type FlexDirection = 'row' | 'column';
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch';
export type JustifyContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
export type FlexStyle = {
  display?: 'flex';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexDirection?: FlexDirection;
};

export type DateMode = 'date' | 'datetime' | 'time';
export interface Options {
  label: string | number;
  value: string | number;
  labelKey?: string;
  valueKey?: string;
}

type FormType =
  | 'TextInput'
  | 'Picker'
  | 'CheckBox'
  | 'Radio'
  | 'DatePicker'
  | 'RangeDatePicker'
  | 'NumberInput'
  | 'Switch'
  | 'SingleCheck'
  | 'Upload'
  | 'Slider';
type keyboardType = 'default' | 'numeric' | 'email-address';

export type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'HH:mm:ss';

export interface DatePickerProps {
  onChange: (date: any) => void;
  date?: string;
  placeholder?: string;
  mode?: DateMode;
  minimumDate?: string;
  maximumDate?: string;
  title?: string;
}

export type RangeDate = {
  beginDate: string;
  endDate: string;
};

export interface RangeDatePickerProps {
  onChange: (date: RangeDate) => void;
  date?: RangeDate;
  placeholder?: string;
  minimumDate?: string;
  maximumDate?: string;
  title?: string;
  activeColor?: string;
  activeBg?: string;
}

export interface TextInputProps {
  setValueFn?: any;
  onChange?: any;
  disableFocus?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  placeholderTextColor?: string;
  color?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export type RadioValue = number | string | boolean;

export interface RadioProps {
  setValueFn: any;
  options?: Options[];
  defaultValue: RadioValue;
  onChange: (value: any) => void;
  inline?: boolean;
  disabled?: boolean;
  color?: string;
  activeColor?: string;
  labelKey?: string;
  valueKey?: string;
}

export interface CheckBoxProps extends RadioProps {}

export interface NumberInputProps {
  setValueFn: any;
  onChange?: any;
  disabled?: boolean;
  defaultValue?: any;
  value?: any;
  placeholder?: string;
  min?: number;
  max?: number;
  fixedLength?: number;
}

export interface SliderProps {
  setValueFn: any;
  onChange: (value: RadioValue) => void;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  activeColor?: string;
  bgColor?: string;
  disabled?: boolean;
}

export interface UploadProps {
  onChange: (value: string | string[]) => void;
  max?: number;
  defaultValue?: string | string[];
}

export interface SwitchProps {
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
  disabled?: boolean;
  activeColor?: string;
  size?: 'default' | 'small';
}

export interface PickerProps {
  onRef: any;
  options?: any[];
  onChange: (value: string | number) => void;
  defaultValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
  title?: string;
}

export interface FormItemType {
  label: string;
  name: string;
  type: FormType;
  desc?: string;
  disabled?: boolean;
  require?: boolean;
  defaultValue?: any;
  placeholder?: string;
  keyboardType?: keyboardType;
  labelStyle?: TextStyle;
  value?: any;
  onChange?: any;
  pattern?: {match: any; message: string};
  textInputProps?: Pick<
    TextInputProps,
    | 'secureTextEntry'
    | 'multiline'
    | 'maxLength'
    | 'numberOfLines'
    | 'placeholderTextColor'
    | 'color'
  >;
  radioProps?: Pick<
    RadioProps,
    'options' | 'inline' | 'activeColor' | 'color' | 'valueKey' | 'labelKey'
  >;
  checkBoxProps?: Pick<
    CheckBoxProps,
    'options' | 'inline' | 'activeColor' | 'color' | 'valueKey' | 'labelKey'
  >;
  datePickerProps?: Pick<DatePickerProps, 'mode'>;
  rangePickerProps?: Pick<RangeDatePickerProps, 'activeBg' | 'activeColor'>;
  requireMsg?: string;
  numberInputProps?: Pick<NumberInputProps, 'fixedLength' | 'max' | 'min'>;
  sliderProps?: Pick<SliderProps, 'step' | 'max' | 'min'>;
  switchProps?: Pick<SwitchProps, 'activeColor' | 'size'>;
  pickerProps?: Pick<
    PickerProps,
    'options' | 'labelKey' | 'valueKey' | 'title'
  >;
  uploadProps?: Pick<UploadProps, 'max'>;
}
