import React, {useState, FC, PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle, LayoutChangeEvent} from 'react-native';
import {ColProps} from './Flex';
import {FlexStyle} from './types';
import {getFlexStyle} from './utils';

type Flex = Pick<
  ColProps,
  'style' | 'alignItems' | 'justifyContent' | 'flexDirection'
>;
interface Props extends Flex {
  row?: number;
  xSpace?: number;
  ySpace?: number;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  borderWidth?: number;
  borderColor?: string;
}

const Grid: FC<PropsWithChildren<Props>> = ({
  children,
  alignItems,
  justifyContent,
  flexDirection,
  style,
  itemStyle,
  row = 1,
  xSpace = 0,
  ySpace = 0,
  borderWidth = 0,
  borderColor = '#ddd',
}) => {
  const _xSpace = xSpace ? xSpace / 2 : 0;
  const _ySpace = ySpace ? ySpace / 2 : 0;
  const newProps = {xSpace: _xSpace, ySpace: _ySpace};
  let flexStyles: any = {};
  if (alignItems || justifyContent || flexDirection) {
    flexStyles = {
      display: 'flex',
      alignItems,
      justifyContent,
      flexDirection,
    };
  }

  const [itemWidth, setItemWidth] = useState(0);
  const handleLayout = (e: LayoutChangeEvent) => {
    const wrapperWidth = e.nativeEvent.layout.width;
    setItemWidth((wrapperWidth - borderWidth - xSpace * (row - 1)) / row);
  };

  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type.displayName === 'GridItem') {
      let itemFlexStyles: FlexStyle = getFlexStyle(child.props);
      return React.cloneElement(child, {
        width: itemWidth,
        ...newProps,
        ...flexStyles,
        ...itemFlexStyles,
        style: {
          ...itemStyle,
          borderRightColor: borderColor,
          borderRightWidth: borderWidth,
          borderBottomColor: borderColor,
          borderBottomWidth: borderWidth,
          ...child.props.style,
        },
      });
    }
  });
  if (newChildren) {
    const childLength = newChildren.length;
    const column = Math.ceil(childLength / row);
    newChildren.forEach((child: any, index: number) => {
      newChildren[index] = React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          marginRight: (index + 1) % row === 0 ? 0 : xSpace,
          marginBottom: Math.ceil((index + 1) / row) === column ? 0 : ySpace,
        },
      });
    });
  }

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.wrapper,
        {
          borderTopColor: borderColor,
          borderTopWidth: borderWidth,
          borderLeftColor: borderColor,
          borderLeftWidth: borderWidth,
        },
        style,
      ]}>
      {newChildren}
    </View>
  );
};
interface ItemProps extends Flex {
  flexBox?: boolean;
  width?: string;
  flex?: number;
  style?: ViewStyle;
}
export const GridItem: FC<PropsWithChildren<ItemProps>> = ({
  children,
  width,
  alignItems,
  justifyContent,
  flexBox,
  flexDirection,
  style,
}) => {
  let flexStyles: any = {};
  if (flexBox || alignItems || justifyContent || flexDirection) {
    flexStyles = {
      display: 'flex',
      alignItems,
      justifyContent,
      flexDirection,
    };
  }
  return <View style={[{width}, flexStyles, style]}>{children}</View>;
};
GridItem.displayName = 'GridItem';
export default Grid;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
});
