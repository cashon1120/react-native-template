import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Grid, GridItem, Header} from '@/library/Index';

const GridDemo = () => {
  return (
    <>
      <Header text="Icon" />
      <View style={{padding: 15}}>
        <Grid
          borderWidth={1}
          borderColor="#ddd"
          row={4}
          itemStyle={{paddingVertical: 15}}
          alignItems="center"
          justifyContent="center">
          <GridItem>
            <Icon name="add-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="alert-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="backspace-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="ellipsis-horizontal-circle-outline" size={30} />
          </GridItem>

          <GridItem>
            <Icon name="chevron-down-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="chevron-up-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="chevron-back-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="chevron-forward-outline" size={30} />
          </GridItem>

          <GridItem>
            <Icon name="arrow-down-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="arrow-up-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="arrow-back-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="arrow-forward-circle-outline" size={30} />
          </GridItem>

          <GridItem>
            <Icon name="list-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="list-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="location-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="lock-closed-outline" size={30} />
          </GridItem>

          <GridItem>
            <Icon name="reorder-four-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="refresh-circle-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="stats-chart-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="trash-outline" size={30} />
          </GridItem>

          <GridItem>
            <Icon name="swap-horizontal-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="swap-vertical-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="shield-checkmark-outline" size={30} />
          </GridItem>
          <GridItem>
            <Icon name="reader-outline" size={30} />
          </GridItem>
        </Grid>
      </View>
    </>
  );
};

export default GridDemo;
