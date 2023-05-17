import React, {FC, PropsWithChildren} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {PRIMARY_COLOR} from '@/globalStyle';

const WINDOW_WIDTH = Dimensions.get('window').width;

interface ItemProps {
  title: string;
}

interface TabsProps {
  children?: React.ReactElement[];
  active?: number;
}

interface TabsState {
  activeIndex: number;
  titles: string[];
  contents: React.ReactElement[];
  activeLineAnim: any;
  contentAnim: any;
}

class Tabs extends React.PureComponent<TabsProps, TabsState> {
  static Item: FC<PropsWithChildren<ItemProps>>;
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      activeIndex: props.active || 0,
      titles: [],
      contents: [],
      activeLineAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(0),
    };
  }

  setActiveIndex = (index: number, tabLength: number) => {
    this.setState({
      activeIndex: index,
    });
    Animated.timing(this.state.activeLineAnim, {
      toValue: (WINDOW_WIDTH / tabLength) * index,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.contentAnim, {
      toValue: -WINDOW_WIDTH * index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    const titles: string[] = [];
    const contents: React.ReactElement[] = [];
    React.Children.map(this.props.children, child => {
      if (child && child.props && child.props.title) {
        titles.push(child.props.title);
        contents.push(child.props.children);
      }
    });
    this.setState(
      {
        titles,
        contents,
      },
      () => {
        this.setActiveIndex(this.props.active || 0, titles.length);
      },
    );
  }

  render(): React.ReactNode {
    const {activeIndex, titles, contents} = this.state;
    return (
      <>
        <View style={styles.title}>
          {titles.map((title: string, index: number) => (
            <TouchableOpacity
              key={title}
              style={[
                styles.tab_title,
                activeIndex === index ? styles.active : null,
              ]}
              onPress={() => this.setActiveIndex(index, titles.length)}>
              <View>
                <Text
                  style={[activeIndex === index ? styles.active_text : null]}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.active_out,
              {
                width: `${100 / titles.length}%`,
                transform: [{translateX: this.state.activeLineAnim || 0}],
              },
            ]}>
            <View style={styles.active_in} />
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.content_wrapper,
            {
              width: titles.length * WINDOW_WIDTH,
              transform: [{translateX: this.state.contentAnim || 0}],
            },
          ]}>
          {contents.map((content: React.ReactElement, index: number) => (
            <View style={styles.content} key={index}>
              {content}
            </View>
          ))}
        </Animated.View>
      </>
    );
  }
}

export default Tabs;
Tabs.Item = () => <></>;
const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  tab_title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  active: {},
  active_text: {
    color: PRIMARY_COLOR,
  },
  active_out: {
    position: 'absolute',
    bottom: -1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active_in: {
    width: '60%',
    height: 2,
    backgroundColor: PRIMARY_COLOR,
  },
  content_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});
