import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
interface Props {
  row?: number;
  x?: number;
  y?: number;
}

interface ItemProp {
  width?: number | string;
  style?: ViewStyle | ViewStyle[];
  x?: number;
  y?: number;
}

const Grid: FC<PropsWithChildren<Props>> = ({children, row = 1, x, y}) => {
  const _x = x ? x / 2 : 0;
  const _y = y ? y / 2 : 0;
  const newProps = {x: _x, y: _y};
  let paddingStyles = {
    paddingLeft: _x,
    paddingRight: _x,
    paddingTop: _y,
    paddingBottom: _y,
  };
  const newChildren = React.Children.map(children, (child: any) => {
    if (child) {
      return React.cloneElement(child, {width: `${100 / row}%`, ...newProps});
    }
  });
  console.log;
  return <View style={[styles.wrapper, paddingStyles]}>{newChildren}</View>;
};

export const GridItem: FC<PropsWithChildren<ItemProp>> = ({
  children,
  width,
  style,
  x,
  y,
}) => {
  const paddingStyles = {
    paddingLeft: x,
    paddingRight: x,
    paddingTop: y,
    paddingBottom: y,
  };
  return <View style={[style, paddingStyles, {width}]}>{children}</View>;
};

export default Grid;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
