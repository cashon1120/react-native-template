import React, {PureComponent} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import FormItem from './FormItem';
import {FormItemType} from './types';
import Toast from './Toast';

interface IProps {
  data?: FormItemType[];
  onRef?: (instance: React.Component) => void;
  values?: any;
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

interface IState {
  errorMsgs: string | string[];
}

class Form extends PureComponent<IProps, IState> {
  values: any = {};
  constructor(props: IProps) {
    super(props);
    this.values = props.values || {};
    this.state = {
      errorMsgs: [],
    };
  }

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  initValues = (data: FormItemType[]) => {
    data.forEach((item: FormItemType) => {
      if (!this.values[item.name]) {
        this.values[item.name] = {
          require: item.require,
          requireMsg: item.requireMsg || `请输入${item.label}`,
          type: item.type,
          instance: null,
        };
        if (item.defaultValue || item.defaultValue === 0) {
          this.values[item.name].value = item.defaultValue;
        }
      }
    });
  };

  getValues = () => {
    const result: any = {};
    let error = false;
    Object.keys(this.values).forEach((key: string) => {
      const obj: FormItemType = this.values[key];
      let {value, require, type} = obj;
      if (type === 'Switch') {
        value = value || false;
      }
      if (
        (value === undefined || (type === 'CheckBox' && value.length === 0)) &&
        require
      ) {
        error = true;
        this.values[key].instance.setError();
      } else {
        if (typeof value === 'boolean') {
          result[key] = value;
        } else {
          result[key] = value || value === 0 ? value : '';
        }
      }
      if (this.values[key].instance.getPatternError()) {
        error = true;
      }
    });
    if (error) {
      Toast.fail('输入有误，请核对');
    }
    return error ? null : result;
  };

  setRef = (name: string, instance: any) => {
    this.values[name].instance = instance;
  };

  renderItem = (data: FormItemType[]) => {
    const {labelStyle, itemStyle} = this.props;
    this.initValues(data);
    return data.map((item: FormItemType) => (
      <FormItem
        labelStyle={labelStyle}
        itemStyle={itemStyle}
        key={item.name}
        onRef={(instance: any) => this.setRef(item.name, instance)}
        params={item}
        values={this.values}
      />
    ));
  };

  setFieldValue = (key: string, value: any, shouldChange?: boolean) => {
    this.values[key]?.instance?.setValue(value, shouldChange);
  };

  setFieldsValue = (obj: any, shouldChange?: boolean) => {
    if (!obj) {
      return;
    }
    Object.keys(obj).forEach((key: string) => {
      this.values[key]?.instance?.setValue(obj[key], shouldChange);
    });
  };

  render() {
    const {data} = this.props;
    return data ? this.renderItem(data) : null;
  }
}

export default Form;
