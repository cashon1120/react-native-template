import React from 'react';
import {View} from 'react-native';
import {Header, Toast, Button} from '../../library/Index';

const Toasts = () => {
  return (
    <>
      <Header text="Toast" />
      <View style={{padding: 15}}>
        <Button
          title="默认提示"
          onPress={() => Toast.show('输入有误', {position: 'top'})}
        />
        <View style={{height: 15}} />
        <Button
          title="警告"
          onPress={() =>
            Toast.show('输入有误', {position: 'top', type: 'warning'})
          }
        />
        <View style={{height: 15}} />
        <Button
          title="成功"
          onPress={() =>
            Toast.show('提交成功', {position: 'center', type: 'success'})
          }
        />
        <View style={{height: 15}} />
        <Button
          title="图标纵向展示"
          onPress={() =>
            Toast.show('提交成功', {
              position: 'center',
              type: 'success',
              iconType: 'column',
            })
          }
        />
        <View style={{height: 15}} />
        <Button
          title="错误"
          onPress={() =>
            Toast.show('提交失败', {position: 'bottom', type: 'fail'})
          }
        />
        <View style={{height: 15}} />
        <Button
          title="delay: 3000(default: 2000)"
          onPress={() => Toast.show('延迟', {position: 'center', delay: 3000})}
        />
      </View>
    </>
  );
};

export default Toasts;
