import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {FlexDirection, JustifyContent, AlignItems} from './types';

/**
 * @interface ColProps
 * @property style 样式
 * @property x 横向间隔
 * @property y 纵向间隔
 */

interface ColProps {
  style?: ViewStyle | (ViewStyle | null)[] | null;
  alignItems?: AlignItems;
  direction?: FlexDirection;
  justifyContent?: JustifyContent;
  x?: number;
  y?: number;
}
interface RowProps
  extends Pick<
    ColProps,
    'style' | 'x' | 'y' | 'alignItems' | 'justifyContent' | 'direction'
  > {
  flexBox?: boolean;
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
  let boxStyles = {
    paddingLeft: _x,
    paddingRight: _x,
    paddingTop: _y,
    paddingBottom: _y,
    marginLeft: x ? -x : 0,
    marginRight: x ? -x : 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  };
  if (x) {
    boxStyles.paddingHorizontal = _x;
  }
  if (y) {
    boxStyles.paddingVertical = _y;
  }
  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type.displayName === 'Row') {
      return React.cloneElement(child, newProps);
    }
  });
  return (
    <View
      style={[
        styles.wrapper,
        {alignItems, justifyContent, flexDirection: direction},
        boxStyles,
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
  flexBox,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  direction = 'row',
  flex,
}) => {
  const marginStyles = {
    marginLeft: x,
    marginRight: x,
    marginTop: y,
    marginBottom: y,
  };
  let flexStyles: any = {};
  if (flexBox) {
    flexStyles = {
      display: 'flex',
      alignItems,
      justifyContent,
      flexDirection: direction,
    };
  }
  return (
    <View style={[{flex}, flexStyles, marginStyles, style]}>{children}</View>
  );
};
Row.displayName = 'Row';
export {Col, Row};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});
