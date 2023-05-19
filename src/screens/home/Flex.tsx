import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Col, Row, Header, Text, PlacehoderView} from '@/library/Index';
import {PRIMARY_COLOR} from '@/globalStyle';
const LinkDemo = () => {
  return (
    <>
      <Header text="Flex布局" />
      <ScrollView style={{paddingHorizontal: 5, maxHeight: '100%'}}>
        <PlacehoderView height={15} />
        <Text>alignItems: flex-start</Text>
        <Col style={[styles.col, {height: 60}]} alignItems="flex-start">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>alignItems: center(默认)</Text>
        <Col style={[styles.col, {height: 60}]} alignItems="center">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>alignItems: flex-end</Text>
        <Col style={[styles.col, {height: 60}]} alignItems="flex-end">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>justifyContent: space-between</Text>
        <Col style={styles.col} justifyContent="space-between">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>justifyContent: space-around</Text>
        <Col style={styles.col} justifyContent="space-around">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>justifyContent: center(默认)</Text>
        <Col style={styles.col} justifyContent="center">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>justifyContent: flex-end</Text>
        <Col style={styles.col} justifyContent="flex-end">
          <Row style={styles.row} />
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>Row 继承 Col 部分属性，但多了flex</Text>
        <Col style={styles.col} justifyContent="center">
          <Row style={styles.row} alignItems="center" flex={1}>
            <Text color="#fff">flex: 1</Text>
          </Row>
          <Row style={styles.row} />
          <Row style={styles.row} />
        </Col>
        <PlacehoderView height={15} />
        <Text>设置间隔： x: 15</Text>
        <Col x={15} style={styles.col} justifyContent="center">
          <Row style={styles.row} flex={1} />
          <Row style={styles.row} flex={1} />
          <Row style={styles.row} flex={1} />
        </Col>

        <Text>derection: column</Text>
        <Col
          y={15}
          style={styles.col}
          justifyContent="center"
          alignItems="flex-start"
          direction="column">
          <Row style={styles.row} flex={1} />
          <Row style={styles.row} flex={1} />
          <Row style={styles.row} flex={1} />
        </Col>
      </ScrollView>
    </>
  );
};

export default LinkDemo;

const styles = StyleSheet.create({
  col: {backgroundColor: '#ddd'},
  row: {
    backgroundColor: PRIMARY_COLOR,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
