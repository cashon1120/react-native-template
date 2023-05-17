import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Image from './Image';

interface IProps {
  label: string;
  icon?: string;
  info?: string | number;
  info2?: string;
  children?: React.ReactNode;
  showRedDot?: boolean;
  hideLine?: boolean;
  placeholder?: string | null;
  onPress?: () => void;
}

const NavigateItem = (props: IProps) => {
  const {
    label,
    onPress,
    info,
    placeholder,
    info2,
    showRedDot,
    children,
    hideLine,
  } = props;
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <View>
      <TouchableHighlight underlayColor="#fafafa" onPress={handlePress}>
        <View
          style={{
            ...styles.container,
            borderBottomColor: hideLine ? '#fff' : '#eee',
          }}>
          <Text style={[styles.label, children ? {flex: 1} : null]}>
            {label}
          </Text>
          {children ? (
            children
          ) : info || info2 ? (
            <>
              {info ? <Text style={styles.info}>{info}</Text> : null}
              {info2 ? <Text style={styles.info}>{info2}</Text> : null}
            </>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          {showRedDot ? <View style={styles.redDot} /> : null}
          {onPress ? (
            <Image name="arrow" style={styles.arrow} width={30} height={30} />
          ) : null}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default NavigateItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    minHeight: 46,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E75120',
    marginLeft: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    color: '#333',
    paddingRight: 15,
  },
  info: {
    color: '#888',
    fontSize: 15,
    marginRight: 1,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  placeholder: {
    color: '#999',
    fontSize: 15,
    marginRight: 1,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  arrow: {
    opacity: 0.6,
    position: 'relative',
    top: Platform.OS === 'android' ? 1 : 0,
  },
});
