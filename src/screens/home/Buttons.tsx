import React from 'react';
import {View} from 'react-native';
import {
  Header,
  Button,
  SafeBottom,
  FullScreenWrapper,
  FullScreenMain,
} from '../../components/common/Index';

const Buttons = () => {
  return (
    <FullScreenWrapper>
      <Header text="按钮" />
      <FullScreenMain>
        <View style={{padding: 15}}>
          <Button title="默认" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="primary" title="primary" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="primary-line" title="primary-line" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="danger" title="danger" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="danger-line" title="danger-line" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="safe" title="safe" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button type="safe-line" title="safe-line" onPress={() => {}} />
          <View style={{height: 15}} />
          <Button
            type="primary"
            title="large"
            size="large"
            onPress={() => {}}
          />
          <View style={{height: 15}} />
          <Button
            type="primary"
            title="middle(default)"
            size="middle"
            onPress={() => {}}
          />
          <View style={{height: 15}} />
          <Button
            type="primary"
            title="small"
            size="small"
            onPress={() => {}}
          />
          <View style={{height: 15}} />
          <Button
            type="primary"
            title="mini-small"
            size="mini-small"
            onPress={() => {}}
          />
        </View>
      </FullScreenMain>
      <SafeBottom>
        <View style={{padding: 15}}>
          <Button type="primary" title="primary" onPress={() => {}} />
        </View>
      </SafeBottom>
    </FullScreenWrapper>
  );
};

export default Buttons;
