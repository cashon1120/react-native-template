import {FlexStyle} from './types';
type FlexKey = keyof FlexStyle | 'flexBox';
export const getFlexStyle = (props: any): FlexStyle => {
  const style: FlexStyle = {};
  const keys: FlexKey[] = [
    'flexBox',
    'alignItems',
    'justifyContent',
    'flexDirection',
  ];
  keys.forEach((key: FlexKey) => {
    if (key === 'flexBox') {
      if (props[key]) {
        style.display = 'flex';
        // 默认设置为 row 和水平对齐
        style.flexDirection = 'row';
        style.alignItems = 'center';
      }
    } else {
      if (props[key]) {
        style[key] = props[key];
      }
    }
  });
  return style;
};

// 判断是否为合法日期字符串并返回日期格式
export const isValidDate = (dateStr?: string) => {
  if (!dateStr || isNaN(Date.parse(dateStr))) {
    return undefined;
  }
  return new Date(dateStr);
};
