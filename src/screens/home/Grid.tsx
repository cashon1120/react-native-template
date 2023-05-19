import React from 'react';
import {View} from 'react-native';
import {Grid, GridItem, Header, Text, PlacehoderView} from '@/library/Index';

const GridDemo = () => {
  return (
    <>
      <Header text="Grid" />
      <View style={{paddingHorizontal: 15}}>
        <PlacehoderView height={15} />
        <Text size={16}>2列:</Text>
        <Grid row={2}>
          <GridItem style={{height: 40}}>
            <Text>1</Text>
          </GridItem>
          <GridItem>
            <Text>2</Text>
          </GridItem>
          <GridItem style={{height: 40}}>
            <Text>3</Text>
          </GridItem>
          <GridItem>
            <Text>4</Text>
          </GridItem>
        </Grid>
        <PlacehoderView height={15} />
        <Text size={16}>3列:</Text>
        <Grid row={3}>
          <GridItem style={{height: 40}}>
            <Text>1</Text>
          </GridItem>
          <GridItem>
            <Text>2</Text>
          </GridItem>
          <GridItem>
            <Text>3</Text>
          </GridItem>
          <GridItem style={{height: 40}}>
            <Text>4</Text>
          </GridItem>
          <GridItem>
            <Text>5</Text>
          </GridItem>
          <GridItem>
            <Text>6</Text>
          </GridItem>
          <GridItem>
            <Text>7</Text>
          </GridItem>
        </Grid>
      </View>
    </>
  );
};

export default GridDemo;
