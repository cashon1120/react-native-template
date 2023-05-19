import React from 'react';
import Image, {NameProps} from '@/library/Image';

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
    case 'Home':
      icon = (
        <Icon
          width={41}
          height={37}
          name={focused ? 'tab_01_active' : 'tab_01'}
        />
      );
      break;
    case 'User':
      icon = <Icon name={focused ? 'tab_02_active' : 'tab_02'} />;
      break;
    case 'Report':
      icon = <Icon name={focused ? 'tab_03_active' : 'tab_03'} />;
      break;
    default:
      break;
  }
  return icon;
};

export default BarIcon;
