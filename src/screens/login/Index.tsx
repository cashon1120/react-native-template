import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigation from '@/hooks/useNavigation';
import {Toast, StatusBar, Image, Button} from '@/library/Index';
import http from '@/utils/http';
import global from '@/global';

type Params = 'userName' | 'password';

const height = Dimensions.get('window').height;

const errorInfo: any = {
  1: '失败',
  3: '账号已在其他设备登陆',
  4: '门店编号错误',
  5: '账号密码错误',
  6: '用户已禁用',
};

const Login = () => {
  const navigation = useNavigation();
  const [showPwd, setShowPwd] = useState(false);
  const passwordInput = useRef<any>();
  const usernameInput = useRef<any>();
  const [formValue, setFormVaue] = useState({
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleSetFormValue = (value: string, key: Params) => {
    formValue[key] = value;
    setFormVaue({...formValue});
  };
  const handleSubmit = () => {
    if (!formValue.userName) {
      Toast.show('请输入账号', {position: 'bottom'});
      usernameInput.current.focus();
      return;
    }
    if (!formValue.password) {
      Toast.show('请输入密码', {position: 'bottom'});
      passwordInput.current.focus();
      return;
    }
    navigation.replace('Root');
    return;
    // const params = {
    //     userName: formValue.userName,
    //     password: formValue.password,
    //   };
    // setLoading(true);
    // http
    //   .request({url: 'api/v3/02/user/login', params})
    //   .then((res: any) => {
    //     switch (res.errorCode) {
    //       case 0:
    //         switch (res.result.code) {
    //           case 0:
    //             const {token, userName, avatar, permissionMap} = res.result;
    //             global.userInfo = {token, userName, avatar, permissionMap};
    //             global.token = token;
    //             AsyncStorage.setItem(
    //               '@user_info',
    //               JSON.stringify({
    //                 token,
    //                 userName,
    //                 avatar,
    //                 permissionMap,
    //               }),
    //             );
    //             AsyncStorage.setItem(
    //               '@login_info',
    //               JSON.stringify({
    //                 userName: formValue.userName,
    //               }),
    //             );
    //             navigation.replace('Root');
    //             break;
    //           default:
    //             Toast.show(errorInfo[res.result.code]);
    //             break;
    //         }
    //         break;
    //       case 1:
    //         Toast.show('账号或密码错误');
    //         break;
    //       default:
    //         break;
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const [contentHeight, setContentHeight] = useState(height);
  const handleKeyboardShow = () => {
    const keyboard: any = Keyboard;
    const keyboardHeight = keyboard._currentlyShowing.endCoordinates.height;
    setContentHeight(height - keyboardHeight);
  };
  const handleKeyboardHide = () => {
    setContentHeight(height);
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    Keyboard.addListener('keyboardWillHide', handleKeyboardHide);
    AsyncStorage.getItem('@login_info', (error: any, res: any) => {
      if (!error && res) {
        setFormVaue(JSON.parse(res));
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <TopTitle title="登录" /> */}
      <View style={{height: contentHeight}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[styles.scrollView, {height: contentHeight}]}>
          <View style={{height: Dimensions.get('screen').width * 0.25}} />
          <Text style={{...styles.pageTitle}}>登录界面</Text>
          <View style={styles.login_container}>
            <View style={styles.form_item}>
              <TextInput
                placeholder="请输入账号"
                style={styles.input}
                ref={usernameInput}
                value={formValue.userName}
                returnKeyType="next"
                onSubmitEditing={() => passwordInput.current.focus()}
                placeholderTextColor="#ccc"
                onChange={e =>
                  handleSetFormValue(e.nativeEvent.text, 'userName')
                }
              />
            </View>
            <View style={styles.form_item}>
              <TextInput
                placeholder="请输入密码"
                secureTextEntry={!showPwd}
                ref={passwordInput}
                style={styles.input}
                value={formValue.password}
                placeholderTextColor="#ccc"
                returnKeyType="done"
                returnKeyLabel="登录"
                onSubmitEditing={handleSubmit}
                onChange={e =>
                  handleSetFormValue(e.nativeEvent.text, 'password')
                }
              />
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => {
                    setShowPwd(!showPwd);
                    usernameInput.current.focus();
                  }}>
                  {!showPwd ? (
                    <Image name="pwd_hide" width={40} height={40} />
                  ) : (
                    <Image name="pwd_show" width={42} height={42} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.button_wrapper}>
              <Button
                title="登录"
                type="primary"
                onPress={handleSubmit}
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  login_bg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scrollView: {
    zIndex: 999,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    color: '#333',
    display: 'flex',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    color: '#333',
  },
  button_wrapper: {
    paddingTop: 20,
  },
  login_container: {
    backgroundColor: '#fff',
    width: '94%',
    left: '3%',
    borderRadius: 15,
    zIndex: 999,
    padding: 25,
  },
  form_item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 35,
  },
  input: {
    padding: 0,
    height: 45,
    paddingLeft: 10,
    flex: 1,
    backgroundColor: '#F7F6F6',
    borderRadius: 5,
    fontSize: 17,
    color: '#333',
  },
});
