import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Row} from './Flex';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '@/globalStyle';
interface Props {
  horizontal?: boolean;
  loop?: boolean;
  index?: number;
  showsButtons?: boolean;
  autoplay?: boolean;
  onIndexChanged?: (index: number) => void;
  width?: number;
  height?: number;
  showsPagination?: boolean;
  dotColor?: string;
  activeDotColor?: string;
  nextButton?: React.ReactElement;
  preButton?: React.ReactElement;
  buttonColor?: string;
  itemStyle?: ViewStyle | ViewStyle[];
  dotStyle?: ViewStyle | ViewStyle[];
  activeDotStyle?: ViewStyle | ViewStyle[];
}

const MySwiper: FC<PropsWithChildren<Props>> = props => {
  const {children, buttonColor = PRIMARY_COLOR, itemStyle} = props;
  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type.displayName === 'SwiperItem') {
      return React.cloneElement(child, {style: itemStyle});
    }
  });
  return (
    <View style={{height: props.height || '100%'}}>
      <Swiper
        style={styles.wrapper}
        {...props}
        prevButton={<Icon name="chevron-back" size={24} color={buttonColor} />}
        nextButton={
          <Icon name="chevron-forward" size={24} color={buttonColor} />
        }>
        {newChildren}
      </Swiper>
    </View>
  );
};

interface ItemProps {
  style?: ViewStyle | ViewStyle[];
}

export const SwiperItem: FC<PropsWithChildren<ItemProps>> = ({
  children,
  style,
}) => {
  return <Row style={style}>{children}</Row>;
};
SwiperItem.displayName = 'SwiperItem';

export default MySwiper;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
