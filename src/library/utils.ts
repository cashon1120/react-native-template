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
      }
    } else {
      if (props[key]) {
        style[key] = props[key];
      }
    }
  });
  return style;
};
