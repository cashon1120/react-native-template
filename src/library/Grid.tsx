import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
interface Props {
  row?: number;
}

interface ItemProp {
  width?: number | string;
  style?: ViewStyle | ViewStyle[];
}

const Grid: FC<PropsWithChildren<Props>> = ({children, row = 1}) => {
  const newChildren = React.Children.map(children, (child: any) => {
    if (child) {
      return React.cloneElement(child, {width: `${100 / row}%`});
    }
  });
  return <View style={styles.wrapper}>{newChildren}</View>;
};

export const GridItem: FC<PropsWithChildren<ItemProp>> = ({
  children,
  width,
  style,
}) => {
  return <View style={[style, {width}]}>{children}</View>;
};

export default Grid;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
