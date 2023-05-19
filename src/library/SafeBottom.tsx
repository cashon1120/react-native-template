import React from 'react';
import {View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  backgroundColor?: string;
  children?: React.ReactNode;
  radius?: boolean;
}

const SafeBottom: React.FC<Props> = props => {
  const insets = useSafeAreaInsets();
  const {backgroundColor, radius} = props;
  return (
    <Shadow
      style={{width: '100%'}}
      distance={8}
      startColor="rgba(188,188,188, 0.1)"
      endColor="rgba(188,188,188, 0)">
      <View
        style={{
          overflow: 'hidden',
          backgroundColor: backgroundColor || '#fff',
          paddingBottom: insets.bottom - 15,
          borderTopLeftRadius: radius ? 12 : 0,
          borderTopRightRadius: radius ? 12 : 0,
        }}>
        {props.children}
      </View>
    </Shadow>
  );
};

export default React.memo(SafeBottom);
