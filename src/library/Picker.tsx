import React, {useRef, useState, useEffect, FC, PropsWithChildren} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import BottomSheet from './BottomSheet';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  data: string[];
  onChange: Function;
  defaultIndex?: number;
}

let isScrollBegin = false;

const Picker: FC<PropsWithChildren<Props>> = ({
  data,
  onChange,
  defaultIndex = 0,
  children,
}) => {
  const pickerRef: any = useRef();
  const [scrollIndex, setScrollIndex] = useState(0);
  const onMomentumScrollBegin = () => {
    isScrollBegin = true;
  };
  const handleSetScrollIndex = (nativeEvent: any) => {
    if (!pickerRef.current) {
      return;
    }
    const index = Math.round(nativeEvent.contentOffset.y / 40);
    if (index === scrollIndex) {
      return;
    }
    pickerRef.current.scrollTo({x: 0, y: index * 40, animate: true});
    setScrollIndex(index);
    onChange && onChange(index);
  };

  const onMomentumScrollEnd = (e: any) => {
    const {nativeEvent} = e;
    handleSetScrollIndex(nativeEvent);
    isScrollBegin = false;
  };

  const onScrollEndDrag = (e: any) => {
    if (isScrollBegin) {
      return;
    }
    const {nativeEvent} = e;
    handleSetScrollIndex(nativeEvent);
  };
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setScrollIndex(defaultIndex);
      pickerRef.current &&
        pickerRef.current.scrollTo({
          x: 0,
          y: defaultIndex * 40,
          animate: false,
        });
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Pressable onTouchStart={() => setVisible(true)}>{children}</Pressable>
      <BottomSheet
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            end={{x: 0, y: 1}}
            start={{x: 0, y: 0}}
            style={styles.topMask}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            end={{x: 0, y: 1}}
            start={{x: 0, y: 0}}
            style={[styles.topMask, styles.bottomMask]}
          />
          <View style={[styles.option, styles.line]} />
          <ScrollView
            style={{height: '100%'}}
            ref={pickerRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            showsVerticalScrollIndicator={false}>
            <View style={styles.option} />
            <View style={styles.option} />
            {data.map((item, index) => (
              <View style={styles.option} key={item}>
                <Text
                  style={{
                    ...styles.text,
                    // fontSize: scrollIndex === index ? 20 : 14,
                    color: scrollIndex === index ? '#333' : '#999',
                    fontWeight: scrollIndex === index ? '600' : '400',
                  }}>
                  {item}
                </Text>
              </View>
            ))}
            <View style={styles.option} />
            <View style={styles.option} />
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    position: 'relative',
  },
  topMask: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    zIndex: 10,
  },
  bottomMask: {
    bottom: 0,
    top: 'auto',
  },
  option: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  line: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    position: 'absolute',
    width: '100%',
    top: 80,
  },
});
