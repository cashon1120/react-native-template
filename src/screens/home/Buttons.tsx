import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  Header,
  Button,
  SafeBottom,
  FullScreenWrapper,
  FullScreenMain,
  Col,
  Row,
} from '../../library/Index';

const Buttons = () => {
  return (
    <FullScreenWrapper>
      <Header text="Button" />
      <FullScreenMain>
        <ScrollView>
          <Col x={15} y={8}>
            <Row>
              <Button title="默认" onPress={() => {}} />
            </Row>
          </Col>
          <Col x={15} y={8}>
            <Row>
              <Button type="primary" title="primary" onPress={() => {}} />
            </Row>
            <Row>
              <Button
                type="primary-line"
                title="primary-line"
                onPress={() => {}}
              />
            </Row>
          </Col>
          <Col x={15} y={8}>
            <Row>
              <Button type="danger" title="danger" onPress={() => {}} />
            </Row>
            <Row>
              <Button
                type="danger-line"
                title="danger-line"
                onPress={() => {}}
              />
            </Row>
          </Col>

          <Col x={15} y={8}>
            <Row>
              <Button type="safe" title="safe" onPress={() => {}} />
            </Row>
            <Row>
              <Button type="safe-line" title="safe-line" onPress={() => {}} />
            </Row>
          </Col>

          <Col x={15} y={8}>
            <Row>
              <Button
                type="primary"
                title="large"
                size="large"
                onPress={() => {}}
              />
            </Row>
            <Row>
              <Button
                type="primary"
                title="middle"
                size="middle"
                onPress={() => {}}
              />
            </Row>
            <Row>
              <Button
                type="primary"
                title="small"
                size="small"
                disabled
                onPress={() => {}}
              />
            </Row>

            <Row>
              <Button
                type="primary"
                title="mini"
                size="mini"
                onPress={() => {}}
              />
            </Row>
          </Col>
          <Col x={15} y={8}>
            <Row>
              <Button
                type="primary"
                title="disabled"
                disabled
                onPress={() => {}}
              />
            </Row>
            <Row>
              <Button
                type="primary"
                title="loading"
                loading
                onPress={() => {}}
              />
            </Row>
          </Col>
        </ScrollView>
      </FullScreenMain>
      <SafeBottom>
        <View style={{padding: 15}}>
          <Button type="primary" title="primary" onPress={() => {}} />
        </View>
      </SafeBottom>
    </FullScreenWrapper>
  );
};

export default Buttons;
