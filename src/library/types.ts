export type FlexDirection = 'row' | 'column';
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch';
export type JustifyContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
export type FlexStyle = {
  display?: 'flex';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexDirection?: FlexDirection;
};
