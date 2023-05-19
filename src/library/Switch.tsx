import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {PRIMARY_COLOR} from '@/globalStyle';

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
  disabled?: boolean;
  activeColor?: string;
  size?: 'large' | 'middle' | 'small';
}

const Switch = (props: Props) => {
  const {
    size = 'middle',
    activeColor = PRIMARY_COLOR,
    value,
    disabled,
    onChange,
  } = props;
  const getValue = (): number => {
    if (!value) {
      return 1;
    }
    if (size === 'large') {
      return 65 - 30;
    }
    if (size === 'middle') {
      return 55 - 25;
    }
    return 45 - 21;
  };
  const dottedAnim = useRef(new Animated.Value(getValue())).current;
  const handleToggleValue = () => {
    onChange(!value);
  };

  useEffect(() => {
    Animated.timing(dottedAnim, {
      toValue: getValue(),
      duration: 200,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={handleToggleValue} disabled={disabled}>
      <View
        style={[
          styles.wrapper,
          styles[size],
          {backgroundColor: value ? activeColor : '#ddd'},
          {opacity: disabled ? 0.6 : 1},
        ]}>
        <Animated.View
          style={[
            styles.dotted,
            styles[`dotted-${size}`],
            {transform: [{translateX: dottedAnim}]},
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Switch;

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  dotted: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 1,
  },
  large: {
    width: 65,
    height: 30,
    borderRadius: 25,
  },
  'dotted-large': {
    width: 28,
    height: 28,
    borderRadius: 25,
  },
  middle: {
    width: 55,
    height: 26,
    borderRadius: 23,
  },
  'dotted-middle': {
    width: 24,
    height: 24,
    borderRadius: 13,
  },
  small: {
    width: 45,
    height: 22,
    borderRadius: 23,
  },
  'dotted-small': {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
