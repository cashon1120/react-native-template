/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, PropsWithChildren, useRef, useEffect, useState} from 'react';
import {Modal, StyleSheet, Animated, LayoutChangeEvent} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {getComponentInfo} from '@/utils/commonUtils';

import Mask from './Mask';
import SafeBottom from './SafeBottom';

type Position = 'center' | 'bottom' | 'left' | 'right';

interface Props {
  visible: boolean;
  onCancel: Function;
  speed?: number;
  position?: Position;
  opacity?: number;
}

const getAnimateStyle = (position: Position, contentAnim: any) => {
  if (position === 'bottom') {
    return {translateY: contentAnim};
  }
  if (position === 'left' || position === 'right') {
    return {translateX: contentAnim};
  }
  if (position === 'center') {
    return {translateX: 0};
  }
};

const getAnimValue = (position: Position, size: any): number => {
  switch (position) {
    case 'bottom':
      return size.heigth || 200;
    case 'left':
      return -size.width || -200;
    case 'right':
      return size.width || 200;
    default:
      return 0;
  }
};

const MyModal: FC<PropsWithChildren<Props>> = ({
  visible,
  onCancel,
  children,
  speed = 300,
  position = 'center',
  opacity = 0.4,
}) => {
  const contentAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [boxSize, setBoxSize] = useState({width: 0, height: 0});

  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    Animated.timing(contentAnim, {
      toValue: showContent ? 0 : getAnimValue(position, boxSize),
      duration: speed,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: showContent ? 1 : 0,
      duration: speed,
      useNativeDriver: true,
    }).start();
  }, [showContent]);
  const mask = useRef<any>();
  useEffect(() => {
    if (visible) {
      setShowContent(true);
      setShowModal(true);
      mask.current = new RootSiblings(
        (
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: opacityAnim,
            }}>
            <Mask opacity={opacity} />
          </Animated.View>
        ),
      );
    } else {
      setShowContent(false);
      setTimeout(() => {
        setShowModal(false);
        mask.current && mask.current.destroy();
      }, speed);
    }
  }, [visible]);

  const handleCancel = () => {
    setShowContent(false);
    setTimeout(() => {
      onCancel();
    }, speed);
  };
  return (
    <Modal visible={showModal} transparent onRequestClose={handleCancel}>
      <Animated.View
        style={[styles.wrapper, styles[position], {opacity: opacityAnim}]}>
        <Mask onPress={handleCancel} opacity={0} />
        {position === 'center' ? (
          <Animated.View>{children}</Animated.View>
        ) : (
          <Animated.View
            onLayout={(e: LayoutChangeEvent) =>
              setBoxSize({
                width: getComponentInfo(e).width,
                height: getComponentInfo(e).height,
              })
            }
            style={[
              styles[`container_${position}`],
              {transform: [getAnimateStyle(position, contentAnim) as any]},
            ]}>
            <SafeBottom>{children}</SafeBottom>
          </Animated.View>
        )}
      </Animated.View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {},
  right: {},
  bottom: {},
  container_bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 99,
  },
  container_left: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 99,
  },
  container_right: {
    position: 'absolute',
    height: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
});
