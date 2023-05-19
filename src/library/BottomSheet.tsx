import React, {FC, PropsWithChildren, useRef, useEffect, useState} from 'react';
import {Modal, StyleSheet, Animated} from 'react-native';
import Mask from './Mask';
import SafeBottom from './SafeBottom';

interface Props {
  visible: boolean;
  onCancel: Function;
  speed?: number;
}

const BottomSheet: FC<PropsWithChildren<Props>> = ({
  visible,
  onCancel,
  children,
  speed = 200,
}) => {
  const contentAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    Animated.timing(contentAnim, {
      toValue: showContent ? 0 : 250,
      duration: speed,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: showContent ? 1 : 0,
      duration: speed,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showContent]);

  useEffect(() => {
    if (visible) {
      setShowContent(true);
      setShowModal(true);
    } else {
      setShowContent(false);
      setTimeout(() => {
        setShowModal(false);
      }, speed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        style={{height: '100%', width: '100%', opacity: opacityAnim}}>
        <Mask onPress={handleCancel} />
        <Animated.View
          style={[styles.wrapper, {transform: [{translateY: contentAnim}]}]}>
          <SafeBottom>{children}</SafeBottom>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 99,
  },
});
