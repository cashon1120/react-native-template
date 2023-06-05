import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {FlexDirection, JustifyContent, AlignItems, FlexStyle} from './types';
import {getFlexStyle} from './utils';
/**
 * @interface ColProps
 * @property style 样式
 * @property x 横向间隔
 * @property y 纵向间隔
 */

export interface ColProps {
  style?: ViewStyle | (ViewStyle | null)[] | null;
  itemStyle?: ViewStyle;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  space?: number;
  rowFlex?: number; // 传递给row的flex值，常用于row都需要统计设置成 flex: 1的时候
}
interface RowProps
  extends Pick<
    ColProps,
    'style' | 'space' | 'alignItems' | 'justifyContent' | 'flexDirection'
  > {
  flexBox?: boolean;
  flex?: number;
  parentFlexDirection?: FlexDirection;
  isLastItem?: boolean;
}

const Col: FC<PropsWithChildren<ColProps>> = ({
  style,
  space,
  children,
  itemStyle,
  alignItems = 'center',
  justifyContent = 'flex-start',
  flexDirection = 'row',
  rowFlex,
}) => {
  const _space = space ? space / 2 : 0;
  const newProps: any = {space: _space};
  if (rowFlex) {
    newProps.flex = rowFlex;
  }
  let boxStyles: any = {};
  if (space) {
    if (flexDirection === 'row') {
      boxStyles = {
        paddingLeft: _space,
        paddingRight: _space,
        marginLeft: space ? -space : 0,
        marginRight: space ? -space : 0,
        paddingHorizontal: _space,
      };
    }
  }
  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type.displayName === 'Row') {
      let itemFlexStyles: FlexStyle = getFlexStyle(child.props);
      return React.cloneElement(child, {
        ...newProps,
        style: {
          ...itemStyle,
          ...child.props.style,
        },
        ...itemFlexStyles,
        parentFlexDirection: flexDirection,
      });
    }
  });
  if (newChildren) {
    const lastRow = newChildren[newChildren?.length - 1];
    newChildren[newChildren?.length - 1] = React.cloneElement(lastRow, {
      ...lastRow?.props,
      isLastItem: true,
    });
  }

  return (
    <View
      style={[
        styles.wrapper,
        {alignItems, justifyContent, flexDirection},
        boxStyles,
        style,
      ]}>
      {newChildren}
    </View>
  );
};

const Row: FC<PropsWithChildren<RowProps>> = props => {
  const {
    style,
    space = 0,
    children,
    parentFlexDirection,
    flex,
    isLastItem,
  } = props;
  let marginStyles: any = {};
  if (parentFlexDirection === 'row') {
    marginStyles = {
      marginLeft: space,
      marginRight: space,
    };
  } else {
    marginStyles = {
      marginBottom: isLastItem ? 0 : space * 2,
    };
  }
  let flexStyles: FlexStyle = getFlexStyle(props);
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
