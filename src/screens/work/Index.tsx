import React from 'react';
import {TouchableOpacity} from 'react-native';
import useNavigation from '@/hooks/useNavigation';

import Header from '@/components/common/Header';
import {Text} from 'react-native';

const Index = () => {
  const navigation = useNavigation();
  console.log(navigation.navigate);
  return (
    <>
      <Header text="工作" disableBack />
      <Text>work</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WorkDetail');
        }}>
        <Text>to detail</Text>
      </TouchableOpacity>
    </>
  );
};

export default Index;
