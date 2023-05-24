import React from 'react';
import {View} from 'react-native';
import {Grid, GridItem, Header, Text, PlacehoderView} from '@/library/Index';

const GridDemo = () => {
  return (
    <>
      <Header text="Grid" />
      <View style={{paddingHorizontal: 15}}>
        <PlacehoderView height={15} />
        <Text size={16} color="#999">
          间距
        </Text>
        {/* <Grid
          row={3}
          itemStyle={{backgroundColor: '#ddd'}}
          ySpace={15}
          xSpace={15}>
          <GridItem>
            <Text>1</Text>
          </GridItem>
          <GridItem>
            <Text>2</Text>
          </GridItem>
          <GridItem>
            <Text>3</Text>
          </GridItem>
          <GridItem>
            <Text>4</Text>
          </GridItem>
          <GridItem>
            <Text>5</Text>
          </GridItem>
          <GridItem>
            <Text>6</Text>
          </GridItem>
        </Grid> */}
        <PlacehoderView height={15} />
        <Text size={16} color="#999">
          边框
        </Text>
        <Grid row={3} borderWidth={1} borderColor="#ddd">
          <GridItem>
            <Text>1</Text>
          </GridItem>
          <GridItem>
            <Text>2</Text>
          </GridItem>
          <GridItem>
            <Text>3</Text>
          </GridItem>
          <GridItem>
            <Text>4</Text>
          </GridItem>
          <GridItem>
            <Text>5</Text>
          </GridItem>
          <GridItem>
            <Text>6</Text>
          </GridItem>
        </Grid>
        {/* <PlacehoderView height={15} />
        <Text size={16} color="#999">
          子项统一Flex样式
        </Text>
        <Grid
          row={3}
          itemStyle={{height: 40}}
          borderWidth={1}
          borderColor="#ddd"
          justifyContent="center"
          alignItems="center">
          <GridItem>
            <Text>1</Text>
          </GridItem>
          <GridItem>
            <Text>2</Text>
          </GridItem>
          <GridItem>
            <Text>3</Text>
          </GridItem>
          <GridItem>
            <Text>4</Text>
          </GridItem>
          <GridItem>
            <Text>5</Text>
          </GridItem>
          <GridItem>
            <Text>6</Text>
          </GridItem>
        </Grid>
        <PlacehoderView height={15} />
        <Text size={16} color="#999">
          子项单独Flex样式
        </Text>
        <Grid
          row={3}
          borderWidth={1}
          borderColor="#ddd"
          itemStyle={{height: 50}}>
          <GridItem alignItems="flex-start" justifyContent="flex-end">
            <Text>1</Text>
          </GridItem>
          <GridItem alignItems="center">
            <Text>2</Text>
          </GridItem>
          <GridItem alignItems="flex-end">
            <Text>3</Text>
          </GridItem>
          <GridItem>
            <Text>4</Text>
          </GridItem>
          <GridItem alignItems="center" justifyContent="center">
            <Text>5</Text>
          </GridItem>
          <GridItem alignItems="flex-end" justifyContent="flex-end">
            <Text>6</Text>
          </GridItem>
        </Grid> */}
      </View>
    </>
  );
};

export default GridDemo;
