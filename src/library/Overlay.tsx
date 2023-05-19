import React, {FC, PropsWithChildren} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import Mask from './Mask';

interface Props {
  visible: boolean;
  onCancel: Function;
}

const Overlay: FC<PropsWithChildren<Props>> = ({
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
      <View style={styles.wrapper}>
        <Mask onPress={onCancel} />
        <View style={{width: '85%'}}>
          <Shadow
            style={{width: '100%'}}
            distance={8}
            startColor="rgba(99,99,99, 0.1)"
            endColor="rgba(0,0,0, 0)">
            <View style={styles.content}>{children}</View>
          </Shadow>
        </View>
      </View>
    </Modal>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
