import {ImageSourcePropType} from 'react-native'
export interface ImagesProps{
	"avatar": ImageSourcePropType,
	"back": ImageSourcePropType,
	"back_black": ImageSourcePropType,
	"no_img": ImageSourcePropType,
	"tab_nor01": ImageSourcePropType,
	"tab_nor02": ImageSourcePropType,
	"tab_nor03": ImageSourcePropType,
	"tab_nor04": ImageSourcePropType,
	"tab_sel01": ImageSourcePropType,
	"tab_sel02": ImageSourcePropType,
	"tab_sel03": ImageSourcePropType,
	"tab_sel04": ImageSourcePropType
}
const Images: ImagesProps = {
	'avatar': require('./avatar.png'),
	'back': require('./back.png'),
	'back_black': require('./back_black.png'),
	'no_img': require('./no_img.png'),
	'tab_nor01': require('./tab_nor01.png'),
	'tab_nor02': require('./tab_nor02.png'),
	'tab_nor03': require('./tab_nor03.png'),
	'tab_nor04': require('./tab_nor04.png'),
	'tab_sel01': require('./tab_sel01.png'),
	'tab_sel02': require('./tab_sel02.png'),
	'tab_sel03': require('./tab_sel03.png'),
	'tab_sel04': require('./tab_sel04.png')
} 
export default Images