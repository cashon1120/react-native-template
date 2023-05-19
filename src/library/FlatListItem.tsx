import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';

export const renderLoading = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>加载中, 请稍后</Text>
    <View style={{transform: [{scale: 0.8}]}}>
      <ActivityIndicator size="small" color="#333" />
    </View>
  </View>
);

export const renderRefresh = () => (
  <View
    style={[styles.loading, {paddingTop: Platform.OS === 'android' ? 80 : 0}]}>
    <Text style={styles.loadingText}>正在刷新</Text>
  </View>
);

export const renderEnd = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>没有更多数据啦</Text>
  </View>
);

export const renderMore = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>下拉加载更多</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 15,
    opacity: 0.4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    textAlign: 'center',
  },
});
