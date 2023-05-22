import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

interface Props {
  onPress?: Function;
  opacity?: number;
}

const Mask = (props: Props) => {
  const {onPress, opacity = 0.4} = props;
  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <Pressable onPress={handlePress} style={[styles.wrapper, {opacity}]} />
  );
};

export default Mask;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,1)',
  },
});
