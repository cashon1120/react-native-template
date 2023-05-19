import React from 'react';
import {Text, View} from 'react-native';
import {Link, Header} from '@/library/Index';
const LinkDemo = () => {
  return (
    <>
      <Header text="Link" />
      <View style={{padding: 15}}>
        <Link to="ButtonsDemo">
          <Text>跳转到Tab</Text>
        </Link>
      </View>
    </>
  );
};

export default LinkDemo;
