import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';
import WorkDetail from '../screens/home/Detail';
import Buttons from '@/screens/home/Buttons';
import ReportDetail from '../screens/report/Detail';
import Toasts from '@/screens/home/Toasts';
import Tabs from '@/screens/home/Tabs';
import SpinningDemo from '@/screens/home/Spinning';

export interface Route {
  name: keyof RootStackParamList;
  component: any;
}

const routes: Route[] = [
  {name: 'Root', component: BottomTabNavigator},
  {name: 'WorkDetail', component: WorkDetail},
  {name: 'ReportDetail', component: ReportDetail},
  {name: 'Buttons', component: Buttons},
  {name: 'Toasts', component: Toasts},
  {name: 'Tabs', component: Tabs},
  {name: 'SpinningDemo', component: SpinningDemo},
];

export default routes;
