import React from 'react';
import {TouchableOpacity} from 'react-native';
import useNavigation from '@/hooks/useNavigation';
import {Text} from 'react-native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text>home</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ReportDetail');
        }}>
        <Text>to detail</Text>
      </TouchableOpacity>
    </>
  );
};

export default Index;
