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
  size?: 'default' | 'small';
}

const Switch = (props: Props) => {
  const {
    size = 'default',
    activeColor = PRIMARY_COLOR,
    value,
    disabled,
    onChange,
  } = props;
  const getValue = (): number => {
    if (!value) {
      return 1;
    }
    if (size === 'default') {
      return 60 - 27;
    }
    return 50 - 23;
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
  default: {
    width: 60,
    height: 28,
    borderRadius: 25,
  },
  'dotted-default': {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  small: {
    width: 50,
    height: 24,
    borderRadius: 20,
  },
  'dotted-small': {
    width: 22,
    height: 22,
    borderRadius: 13,
  },
});
