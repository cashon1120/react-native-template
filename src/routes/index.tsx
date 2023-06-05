import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {getBarHeight} from '../utils/commonUtils';
import {useStore} from '../models/global';
import routes, {Route} from './routes';

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
const RootNavigator = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName={props.defaultPage}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: 'float',
      }}>
      {routes.map((route: Route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
};

interface Props {
  defaultPage: keyof RootStackParamList;
  colorScheme?: 'dark' | 'light';
}

const Navigation = (props: Props) => {
  const stroe = useStore('rootStore');
  getBarHeight().then((res: number) => {
    stroe.setBarHeight(res);
  });
  return (
    <NavigationContainer
      theme={props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator defaultPage={props.defaultPage} />
    </NavigationContainer>
  );
};

export const Stack = createStackNavigator<RootStackParamList>();
export default Navigation;
