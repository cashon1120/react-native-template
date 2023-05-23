import React, {FC, PropsWithChildren} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import {PRIMARY_COLOR} from '@/globalStyle';
import {getComponentInfo} from '@/utils/commonUtils';

interface TabsProps {
  children?: React.ReactElement[];
  activeIndex?: number;
  activeColor?: string;
  onChange?: (index: number) => void;
}

interface ItemProps {
  title: string;
}

interface TabsState {
  activeIndex: number;
  titles: string[];
  contents: React.ReactElement[];
  activeLineAnim: any;
  contentAnim: any;
  wrapperWidth: number;
}

class Tabs extends React.PureComponent<TabsProps, TabsState> {
  static Item: FC<PropsWithChildren<ItemProps>>;
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex || 0,
      titles: [],
      contents: [],
      activeLineAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(0),
      wrapperWidth: 0,
    };
  }

  setActiveIndex = (index: number, tabLength: number) => {
    const {wrapperWidth, activeLineAnim, contentAnim} = this.state;
    const {onChange} = this.props;
    this.setState({
      activeIndex: index,
    });
    onChange && onChange(index);
    Animated.timing(activeLineAnim, {
      toValue: (wrapperWidth / tabLength) * index,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(contentAnim, {
      toValue: -wrapperWidth * index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    const titles: string[] = [];
    const contents: React.ReactElement[] = [];
    React.Children.map(this.props.children, (child: any) => {
      if (child && child.type.displayName === 'TabsItem') {
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
        this.setActiveIndex(this.props.activeIndex || 0, titles.length);
      },
    );
  }

  render(): React.ReactNode {
    const {activeIndex, titles, contents} = this.state;
    const {activeColor = PRIMARY_COLOR} = this.props;
    return (
      <View style={{overflow: 'hidden'}}>
        <View
          onLayout={(e: LayoutChangeEvent) =>
            this.setState({
              wrapperWidth: getComponentInfo(e).width,
            })
          }
          style={styles.title}>
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
                  style={[
                    styles.title_text,
                    activeIndex === index ? {color: activeColor} : null,
                  ]}>
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
            <View style={[styles.active_in, {backgroundColor: activeColor}]} />
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.content_wrapper,
            {
              width: titles.length * this.state.wrapperWidth,
              transform: [{translateX: this.state.contentAnim || 0}],
            },
          ]}>
          {contents.map((content: React.ReactElement, index: number) => (
            <View style={[styles.content]} key={index}>
              {content}
            </View>
          ))}
        </Animated.View>
      </View>
    );
  }
}

export default Tabs;
Tabs.Item = () => <></>;
Tabs.Item.displayName = 'TabsItem';
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
  title_text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
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
