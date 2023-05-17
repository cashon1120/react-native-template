/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStore} from '@/models/global';
import Image from '@/components/common/Image';
import StatusBar, {BarStypeProps} from '@/components/common/StatusBar';
import Text from '@/components/common/Text';
import globalStyle from '@/globalStyle';

type BackStyle = Partial<{
  [key in BarStypeProps]: ViewStyle | TextStyle;
}>;

interface Style extends BackStyle {
  [prop: string]: ViewStyle | TextStyle | undefined;
}

interface IProps {
  text: string;
  textColor?: string;
  disableBack?: boolean;
  rightText?: string;
  rightElement?: React.ReactNode;
  titleElement?: React.ReactNode;
  backgroundColor?: string;
  rightTextEvent?: () => void;
  backEvent?: () => void;
  barStyle?: BarStypeProps;
}

const Header = (props: IProps) => {
  const store = useStore('rootStore');
  const navigation = useNavigation();
  const {
    text,
    textColor,
    rightText,
    rightTextEvent,
    backEvent,
    backgroundColor,
    barStyle,
    disableBack,
    rightElement,
    titleElement,
  } = props;

  const handleLayout = (e: LayoutChangeEvent) => {
    store.setHeaderHeight(e.nativeEvent.layout.height);
  };

  const handleBack = () => {
    if (disableBack) {
      return;
    }
    backEvent ? backEvent() : navigation?.goBack();
  };
  const backUrl = barStyle === 'dark-content' ? 'back_black' : 'back';
  return (
    <View
      style={{
        ...styles.container,
        zIndex: 888,
        paddingTop: store.barHeight,
        height: store.barHeight + 48,
        backgroundColor: backgroundColor || '#466CF5',
        ...styles[barStyle ? barStyle : ''],
      }}
      onLayout={handleLayout}>
      <StatusBar barStyle={barStyle} translucent />
      <TouchableOpacity onPress={handleBack} style={styles.back}>
        {!disableBack ? <Image name={backUrl} width={40} height={40} /> : null}
      </TouchableOpacity>
      <View
        style={[globalStyle.flex_1, globalStyle.flex_box_row, styles.header]}>
        {titleElement ? (
          titleElement
        ) : (
          <Text
            allowFontScaling={false}
            style={{...styles.title, color: textColor || '#fff'}}>
            {text}
          </Text>
        )}
      </View>
      {rightElement ? (
        <>
          <View style={{...styles.rightElement, top: store.barHeight}}>
            {rightElement}
          </View>
          <Text style={styles.rightContent}>{''}</Text>
        </>
      ) : (
        <TouchableOpacity onPress={rightTextEvent}>
          <Text style={styles.rightContent}>{rightText || ''}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default observer(Header);

const styles: Style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  back: {
    paddingLeft: 10,
    width: 80,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  'dark-content': {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rightContent: {
    width: 80,
    color: '#fff',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightElement: {
    position: 'absolute',
    right: 10,
    zIndex: 888,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
