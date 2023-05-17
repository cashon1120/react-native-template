import {ImageSourcePropType} from 'react-native';
export interface ImagesProps {
  arrow: ImageSourcePropType;
  avatar: ImageSourcePropType;
  back: ImageSourcePropType;
  back_black: ImageSourcePropType;
  no_img: ImageSourcePropType;
  nodata: ImageSourcePropType;
  tab_01: ImageSourcePropType;
  tab_01_active: ImageSourcePropType;
  tab_02: ImageSourcePropType;
  tab_02_active: ImageSourcePropType;
  tab_03: ImageSourcePropType;
  tab_03_active: ImageSourcePropType;
}
const Images: ImagesProps = {
  arrow: require('./arrow.png'),
  avatar: require('./avatar.png'),
  back: require('./back.png'),
  back_black: require('./back_black.png'),
  no_img: require('./no_img.png'),
  nodata: require('./nodata.png'),
  tab_01: require('./tab_01.png'),
  tab_01_active: require('./tab_01_active.png'),
  tab_02: require('./tab_02.png'),
  tab_02_active: require('./tab_02_active.png'),
  tab_03: require('./tab_03.png'),
  tab_03_active: require('./tab_03_active.png'),
};
export default Images;
