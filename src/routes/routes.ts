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
import SwitchDemo from '@/screens/home/Switch';
import LinkDemo from '@/screens/home/Link';
import DatePickerDemo from '@/screens/home/DatePicker';
import FlexDemo from '@/screens/home/Flex';
import SafeBottomDemo from '@/screens/home/SafeBottom';
export interface Route {
  name: keyof RootStackParamList;
  component: any;
}

const routes: Route[] = [
  {name: 'Login', component: Login},
  {name: 'Root', component: BottomTabNavigator},
  {name: 'WorkDetail', component: WorkDetail},
  {name: 'ReportDetail', component: ReportDetail},
  {name: 'ButtonsDemo', component: Buttons},
  {name: 'ToastsDemo', component: Toasts},
  {name: 'TabsDemo', component: Tabs},
  {name: 'SpinningDemo', component: SpinningDemo},
  {name: 'BottomSheetDemo', component: BottomSheetDemo},
  {name: 'OverlayDemo', component: OverlayDemo},
  {name: 'SwitchDemo', component: SwitchDemo},
  {name: 'LinkDemo', component: LinkDemo},
  {name: 'DatePickerDemo', component: DatePickerDemo},
  {name: 'FlexDemo', component: FlexDemo},
  {name: 'SafeBottomDemo', component: SafeBottomDemo},

  {name: 'Setting', component: Setting},
];

export default routes;
