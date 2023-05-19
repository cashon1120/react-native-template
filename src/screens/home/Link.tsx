import React from 'react';
import {Text, View} from 'react-native';
import {Link, Header, Image, PlacehoderView, Row} from '@/library/Index';
const LinkDemo = () => {
  return (
    <>
      <Header text="Link" />
      <View style={{padding: 15}}>
        <Link to="ButtonsDemo">
          <Text>文本跳转</Text>
        </Link>
        <PlacehoderView height={30} />
        <Link to="ButtonsDemo">
          <Image name="avatar" width={60} height={60} />
        </Link>
        <PlacehoderView height={30} />
        <Link to="ButtonsDemo">
          <Row style={{backgroundColor: '#ddd', padding: 15}}>
            <Text>可以是任意内容</Text>
          </Row>
        </Link>
      </View>
    </>
  );
};

export default LinkDemo;
