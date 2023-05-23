import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

import Icon from 'react-native-vector-icons/AntDesign';
import RootSiblings from 'react-native-root-siblings';

type InfoType = 'success' | 'fail' | 'warning' | 'default';
interface Params {
  position: 'top' | 'center' | 'bottom';
  type?: InfoType;
  delay?: number;
}

const colors = {
  success: '#47d382',
  fail: '#f77474',
  warning: '#edaf12',
  default: '#333',
};
const getIconName = (type: InfoType) => {
  switch (type) {
    case 'success':
      return 'checkcircleo';
    case 'warning':
      return 'infocirlceo';
    case 'fail':
      return 'closecircleo';
    case 'default':
      return '';
  }
};
let timer: ReturnType<typeof setTimeout>;
let ele: any;
const Toast = {
  show: (text: string, params?: Params) => {
    const position = params ? params.position : 'center';
    const type = (params && params.type) || 'default';
    clearTimeout(timer);
    ele && ele.destroy();
    ele = new RootSiblings(
      (
        <View style={[styles.wrapper, styles[position]]}>
          <Shadow
            distance={8}
            startColor="rgba(188,188,188, 0.3)"
            endColor="rgba(188,188,188, 0)">
            <View style={[styles.textWrapper, {backgroundColor: colors[type]}]}>
              {type === 'default' ? null : (
                <Icon
                  style={{marginBottom: 8, marginTop: 3, marginHorizontal: 15}}
                  name={getIconName(type)}
                  size={40}
                  color="#fff"
                />
              )}
              <Text style={[styles.text]}>{text}</Text>
            </View>
          </Shadow>
        </View>
      ),
    );
    timer = setTimeout(() => {
      ele.destroy();
    }, params?.delay || 2000);
  },
};

export default Toast;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  top: {top: '15%'},
  center: {top: '48%'},
  bottom: {bottom: '5%'},
  textWrapper: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
