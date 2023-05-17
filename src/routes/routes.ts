import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';
import WorkDetail from '../screens/home/Detail';
import Buttons from '@/screens/home/Buttons';
import ReportDetail from '../screens/report/Detail';

export interface Route {
  name: keyof RootStackParamList;
  component: any;
}

const routes: Route[] = [
  {name: 'Root', component: BottomTabNavigator},
  {name: 'WorkDetail', component: WorkDetail},
  {name: 'ReportDetail', component: ReportDetail},
  {name: 'Buttons', component: Buttons},
];

export default routes;
