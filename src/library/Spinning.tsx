import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

import RootSiblings from 'react-native-root-siblings';

class Spinning {
  ele: RootSiblings | null;
  status: boolean;
  constructor() {
    this.ele = null;
    this.status = false;
  }
  show(text?: string) {
    if (this.ele) {
      this.ele.destroy();
    }
    this.status = true;
    this.ele = new RootSiblings(
      (
        <View style={[styles.wrapper]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{text || '加载中'}</Text>
        </View>
      ),
    );
  }
  clear() {
    this.ele?.destroy();
    this.ele = null;
    this.status = false;
  }
}

export default new Spinning();

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    width: 80,
    marginLeft: -40,
    height: 80,
    marginTop: -40,
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 6,
  },
  loadingText: {
    color: '#fff',
    marginTop: 5,
  },
});
