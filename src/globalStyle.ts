import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  // 常用字体大小和颜色
  font_size_12: {
    fontSize: 12,
  },
  font_size_14: {
    fontSize: 14,
  },
  font_size_15: {
    fontSize: 15,
  },
  font_size_16: {
    fontSize: 16,
  },
  font_size_18: {
    fontSize: 18,
  },
  font_size_20: {
    fontSize: 20,
  },
  font_size_24: {
    fontSize: 24,
  },
  font_color_3: {
    color: '#333',
  },
  font_color_5: {
    color: '#555',
  },
  font_color_6: {
    color: '#666',
  },
  font_color_8: {
    color: '#888',
  },
  font_color_9: {
    color: '#999',
  },

  // 内容水平垂直居中
  contentCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 阴影, 其实这个效果不怎么了, 推荐用插件
  shadow_box: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 12, height: 12},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 3,
  },

  // 遮罩背景
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  wrapper: {
    height: '100%',
    display: 'flex',
  },
  flex_box_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_box_column: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex_1: {
    flex: 1,
  },
});

export default globalStyle;
