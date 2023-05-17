import React, {FC, PropsWithChildren} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import Mask from './Mask';
import SafeBottom from './SafeBottom';

interface Props {
  visible: boolean;
  onCancel: Function;
}

const BottomSheet: FC<PropsWithChildren<Props>> = ({
  visible,
  onCancel,
  children,
}) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => onCancel()}>
      <View style={{height: '100%', width: '100%'}}>
        <Mask onPress={onCancel} />
        <View style={styles.wrapper}>
          <SafeBottom>{children}</SafeBottom>
        </View>
      </View>
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
