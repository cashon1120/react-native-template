/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ToastAndroid, BackHandler} from 'react-native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {BottomTabParamList} from './types';
import BarIcon from './icon';
import {PRIMARY_COLOR} from '@/globalStyle';

import Home from '@/screens/home/Index';
import Report from '@/screens/report/Index';
import User from '@/screens/user/Index';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  let lastBackPressed: number = 0;
  useAndroidBackHandler(() => {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
    } else {
      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', 1000);
    }
    return true;
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: options => <BarIcon route={route} options={options} />,
        header: () => <></>,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarLabelStyle: {
          fontSize: 12,
          top: -5,
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: '首页',
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={Report}
        options={{
          title: '统计',
        }}
      />
      <BottomTab.Screen
        name="User"
        component={User}
        options={{
          title: '我的',
        }}
      />
    </BottomTab.Navigator>
  );
}
