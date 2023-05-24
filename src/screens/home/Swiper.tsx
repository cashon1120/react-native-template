import React from 'react';
import {ScrollView} from 'react-native';
import {
  Header,
  FullScreenWrapper,
  Swiper,
  SwiperItem,
  Text,
  PlacehoderView,
} from '../../library/Index';

const SwiperDemo = () => {
  return (
    <FullScreenWrapper>
      <Header text="Swiper" />
      <ScrollView>
        <Swiper
          height={200}
          showsButtons
          itemStyle={{backgroundColor: '#ddd', height: '100%'}}>
          <SwiperItem>
            <Text style={{padding: 10}}>水平</Text>
          </SwiperItem>
          <SwiperItem>
            <Text style={{padding: 10}}>水平</Text>
          </SwiperItem>
        </Swiper>
        <PlacehoderView height={15} />
        <Swiper
          height={200}
          loop={false}
          activeDotColor="#47d382"
          dotStyle={{top: 20}}
          activeDotStyle={{top: 20}}
          showsButtons
          buttonColor="#47d382"
          itemStyle={{backgroundColor: '#ddd', height: '100%'}}>
          <SwiperItem>
            <Text style={{padding: 10}}>调整颜色和位置</Text>
          </SwiperItem>
          <SwiperItem>
            <Text style={{padding: 10}}>2</Text>
          </SwiperItem>
        </Swiper>
        <PlacehoderView height={15} />
        <Swiper
          height={200}
          horizontal={false}
          itemStyle={{backgroundColor: '#ddd', height: '100%'}}>
          <SwiperItem>
            <Text style={{padding: 10}}>垂直</Text>
          </SwiperItem>
          <SwiperItem>
            <Text style={{padding: 10}}>垂直</Text>
          </SwiperItem>
        </Swiper>
      </ScrollView>
    </FullScreenWrapper>
  );
};

export default SwiperDemo;
