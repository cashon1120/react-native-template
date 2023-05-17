import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

interface Params {
  position: 'top' | 'center' | 'bottom';
}

const Toast = {
  show: (text: string, params?: Params) => {
    const position = params ? params.position : 'center';
    let ele = new RootSiblings(
      (
        <View style={[styles.wrapper, styles[position]]}>
          <View style={styles.textWrapper}>
            <Text style={[styles.text]}>{text}</Text>
          </View>
        </View>
      ),
    );
    setTimeout(() => {
      ele.destroy();
    }, 2000);
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
  bottom: {bottom: '10%'},
  textWrapper: {
    backgroundColor: '#000',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
