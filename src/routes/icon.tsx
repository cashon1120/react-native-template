import React from 'react';
import Image, {NameProps} from '@/components/common/Image';

interface IProps {
  name: NameProps;
  width?: number;
  height?: number;
}

const ICON_SIZE = 48;

const Icon = (props: IProps) => (
  <Image
    name={props.name}
    width={props.width || ICON_SIZE}
    height={props.height || ICON_SIZE}
  />
);

const BarIcon = (props: any) => {
  const {
    route: {name},
    options: {focused},
  } = props;
  let icon = <></>;
  switch (name) {
    case 'Work':
      icon = (
        <Icon
          width={41}
          height={37}
          name={focused ? 'tab_nor01' : 'tab_sel01'}
        />
      );
      break;
    case 'User':
      icon = <Icon name={focused ? 'tab_nor02' : 'tab_sel02'} />;
      break;
    case 'Report':
      icon = <Icon name={focused ? 'tab_nor03' : 'tab_sel03'} />;
      break;
    case 'Shop':
      icon = (
        <Icon
          width={42}
          height={42}
          name={focused ? 'tab_nor04' : 'tab_sel04'}
        />
      );
      break;
    default:
      break;
  }
  return icon;
};

export default BarIcon;
