import React from 'react';
import {View} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const PlacehoderView = (props: Props) => {
  return <View style={{width: props.width, height: props.height}} />;
};

export default PlacehoderView;
