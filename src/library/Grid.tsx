import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
interface Props {
  row?: number;
  x?: number;
  y?: number;
}

const Grid: FC<PropsWithChildren<Props>> = ({children, row = 1, x, y}) => {
  const _x = x ? x / 2 : 0;
  const _y = y ? y / 2 : 0;
  const newProps = {x: _x, y: _y};
  let boxStyles = {
    paddingLeft: _x,
    paddingRight: _x,
    paddingTop: _y,
    paddingBottom: _y,
    marginLeft: x ? -x : 0,
    marginRight: x ? -x : 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
  };
  if (x) {
    boxStyles.paddingHorizontal = _x;
  }
  if (y) {
    boxStyles.paddingVertical = _y;
    boxStyles.marginTop = -y;
  }
  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type.displayName === 'GridItem') {
      return React.cloneElement(child, {width: `${100 / row}%`, ...newProps});
    }
  });
  return <View style={[styles.wrapper, boxStyles]}>{newChildren}</View>;
};

export const GridItem: FC<PropsWithChildren> = (props: any) => {
  const {children, width, x, y} = props;
  const boxStyles = {
    paddingLeft: x,
    paddingRight: x,
    paddingTop: y,
    paddingBottom: y,
  };
  return <View style={[boxStyles, {width}]}>{children}</View>;
};
GridItem.displayName = 'GridItem';
export default Grid;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
