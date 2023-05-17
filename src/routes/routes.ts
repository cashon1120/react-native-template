import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';

import Login from '@/screens/login/Index';
import WorkDetail from '@/screens/home/Detail';
import Buttons from '@/screens/home/Buttons';
import ReportDetail from '@/screens/report/Detail';
import Toasts from '@/screens/home/Toasts';
import Tabs from '@/screens/home/Tabs';
import SpinningDemo from '@/screens/home/Spinning';
import BottomSheetDemo from '@/screens/home/BottomSheet';
import OverlayDemo from '@/screens/home/Overlay';
import Setting from '@/screens/user/Setting';

export interface Route {
  name: keyof RootStackParamList;
  component: any;
}

const routes: Route[] = [
  {name: 'Login', component: Login},
  {name: 'Root', component: BottomTabNavigator},
  {name: 'WorkDetail', component: WorkDetail},
  {name: 'ReportDetail', component: ReportDetail},
  {name: 'Buttons', component: Buttons},
  {name: 'Toasts', component: Toasts},
  {name: 'Tabs', component: Tabs},
  {name: 'SpinningDemo', component: SpinningDemo},
  {name: 'BottomSheetDemo', component: BottomSheetDemo},
  {name: 'OverlayDemo', component: OverlayDemo},

  {name: 'Setting', component: Setting},
];

export default routes;
