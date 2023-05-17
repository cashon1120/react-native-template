import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useStore} from '@/models/global';
import {ListItem, StatusBar, Image} from '@/components/common/Index';
import globalStyle, {PRIMARY_COLOR} from '@/globalStyle';

const UserIndex = () => {
  const store = useStore('rootStore');
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={[
          styles.top,
          globalStyle.contentCenter,
          {paddingTop: store.barHeight + 30},
        ]}>
        <Image name="avatar" width={120} height={120} />
        <Text style={[globalStyle.font_color_white, {paddingTop: 15}]}>
          用户中心
        </Text>
      </View>
      <ListItem label="设置" to="Setting" />
    </>
  );
};

export default UserIndex;

const styles = StyleSheet.create({
  top: {
    backgroundColor: PRIMARY_COLOR,
    paddingBottom: 30,
  },
});
