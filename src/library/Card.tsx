import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Image, {NameProps} from './Image';

interface IProps {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
  noTitleLine?: boolean;
  titleNumber?: number;
  icon?: NameProps;
  titleInfo?: string;
  noBorder?: boolean;
  rightElement?: React.ReactNode;
  onArrowPress?: () => void;
}

const Card = (props: IProps) => {
  const {
    title,
    children,
    noTitleLine,
    style,
    onArrowPress,
    titleNumber,
    icon,
    titleInfo,
    rightElement,
  } = props;

  return (
    <View style={{...styles.wrapper, ...style}}>
      {title ? (
        <TouchableOpacity disabled={!onArrowPress} onPress={onArrowPress}>
          <View
            style={[
              styles.titleContainer,
              {borderBottomWidth: noTitleLine ? 0 : 1},
            ]}>
            {icon || null}
            <View style={styles.title}>
              <Text allowFontScaling={false} style={styles.titleText}>
                {title}
              </Text>
              {titleNumber ? (
                <View style={styles.titleTextTip}>
                  <Text style={styles.titleTextTipText}>{titleNumber}</Text>
                </View>
              ) : null}
            </View>
            {titleInfo ? (
              <Text allowFontScaling={false} style={styles.titleInfo}>
                {titleInfo}
              </Text>
            ) : null}
            {rightElement ? rightElement : null}
            {onArrowPress ? (
              <View style={{opacity: 0.7}}>
                <Image name="arrow" width={16} height={32} />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ) : null}
      <>{children}</>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    paddingTop: 12,
    borderBottomColor: 'rgba(229, 229, 229, 1)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTextTip: {
    backgroundColor: 'rgba(255, 72, 72, 1)',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 5,
    top: -5,
  },
  titleTextTipText: {
    fontSize: 10,
    color: '#fff',
    margin: 0,
    padding: 0,
  },
  titleInfo: {
    color: '#BDBDBD',
    fontSize: 14,
    marginRight: 2,
  },
});
