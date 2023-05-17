import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Image from './Image';
interface IProps {
  text?: string;
}

const NoData = (props: IProps) => {
  const {text} = props;
  return (
    <View style={styles.wrapper}>
      <View>
        <Image
          style={styles.icon}
          resizeMode="cover"
          name="no_data"
          width={100}
          height={100}
        />
      </View>
      <Text style={styles.text}>{text || '暂无数据'}</Text>
    </View>
  );
};

export default React.memo(NoData);

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 25,
    width: '100%',
  },
  icon: {
    width: 60,
    height: 40,
    marginBottom: 10,
    opacity: 0.4,
  },
  text: {
    color: '#ccc',
    fontSize: 12,
  },
});
