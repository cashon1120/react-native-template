import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

/**
 * @interface ColProps
 * @property style 样式
 * @property x 横向间隔
 * @property y 纵向间隔
 */

interface ColProps {
  style?: ViewStyle | ViewStyle[];
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  direction?: 'row' | 'column';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  x?: number;
  y?: number;
}
interface RowProps extends Pick<ColProps, 'style' | 'x' | 'y'> {
  flex?: number;
}

const Col: FC<PropsWithChildren<ColProps>> = ({
  style,
  x,
  y,
  children,
  alignItems = 'center',
  justifyContent = 'flex-start',
  direction = 'row',
}) => {
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
    return React.cloneElement(child, newProps);
  });
  return (
    <View
      style={[
        styles.wrapper,
        paddingStyles,
        {alignItems, justifyContent, flexDirection: direction},
        style,
      ]}>
      {newChildren}
    </View>
  );
};

const Row: FC<PropsWithChildren<RowProps>> = ({
  style,
  x,
  y,
  children,
  flex,
}) => {
  const marginStyles = {
    marginLeft: x,
    marginRight: x,
    marginTop: y,
    marginBottom: y,
  };
  return <View style={[{flex}, marginStyles, style]}>{children}</View>;
};

export {Col, Row};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});
