import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Grid, GridItem, Header, Text, PlacehoderView} from '@/library/Index';

const GridDemo = () => {
  return (
    <>
      <Header text="Grid" />
      <View style={{paddingHorizontal: 15}}>
        <PlacehoderView height={15} />
        <Text size={16}>2列:</Text>
        <Grid row={2} x={10} y={10}>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>1</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>2</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>3</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>4</Text>
            </View>
          </GridItem>
        </Grid>
        <PlacehoderView height={15} />
        <Text size={16}>3列:</Text>
        <Grid row={3} x={5} y={5}>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>1</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>2</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>3</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>4</Text>
            </View>
          </GridItem>
          <GridItem>
            <View style={styles.wrapper}>
              <Text>5</Text>
            </View>
          </GridItem>
        </Grid>
      </View>
    </>
  );
};

export default GridDemo;

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    backgroundColor: '#ddd',
  },
});
