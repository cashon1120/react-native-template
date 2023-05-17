import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';
import WorkDetail from '../screens/work/Detail';
import ReportDetail from '../screens/report/Detail';

export interface Route {
  name: keyof RootStackParamList;
  component: any;
}

const routes: Route[] = [
  {name: 'Root', component: BottomTabNavigator},
  {name: 'WorkDetail', component: WorkDetail},
  {name: 'ReportDetail', component: ReportDetail},
];

export default routes;
