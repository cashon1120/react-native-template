import {useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {MobXProviderContext} from 'mobx-react';

class RootStore {
  navigation: any = {};
  barHeight = 50;
  headerHeight = 50;
  userInfo: any = {
    companyID: 0,
    permissionJson: {},
  };
  permissionMap: any = {};
  companyList = [];
  token = '';
  constructor() {
    makeAutoObservable(this);
  }
  setNavigation = (navigation: any) => {
    this.navigation = navigation;
  };

  setBarHeight(value: number) {
    this.barHeight = value;
  }
  setHeaderHeight(value: number) {
    this.headerHeight = value;
  }
  setUserInfo(value: any) {
    this.userInfo = value;
  }
  setToken(value: string) {
    this.token = value;
  }
}

export type RootStoreType = InstanceType<typeof RootStore>;
export const useStore = <T = RootStoreType>(name: string): T => {
  return useContext(MobXProviderContext)[name];
};
export default new RootStore();
