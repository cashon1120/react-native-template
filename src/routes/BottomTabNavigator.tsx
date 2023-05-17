/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ToastAndroid, BackHandler} from 'react-native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {BottomTabParamList} from './types';
import BarIcon from './icon';
import Work from '../screens/work/Index';
import Report from '../screens/report/Index';
import User from '../screens/user/Index';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  let lastBackPressed: number = 0;
  useAndroidBackHandler(() => {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
    } else {
      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出萌熊乐园', 1000);
    }
    return true;
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Work"
      screenOptions={({route}) => ({
        tabBarIcon: options => <BarIcon route={route} options={options} />,
        header: () => <></>,
        tabBarActiveTintColor: '#466CF5',
        tabBarLabelStyle: {
          fontSize: 12,
          top: -5,
        },
      })}>
      <BottomTab.Screen
        name="Work"
        component={Work}
        options={{
          title: '工作',
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
