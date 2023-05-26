import React, {useState} from 'react';
import {View} from 'react-native';
import {Switch, Header, Col, Row, Text} from '@/library/Index';

const SwitchDemo = () => {
  const [largeChecked, setLargeChecked] = useState(true);
  const [checked, setChecked] = useState(true);
  const [smallChecked, setSmallChecked] = useState(false);
  const [colorChecked, setColorChecked] = useState(true);

  return (
    <>
      <Header text="Switch" />
      <View style={{paddingHorizontal: 15, paddingTop: 15}}>
        <Col space={25}>
          <Row flexDirection="column">
            <Text>large</Text>
            <Switch
              value={largeChecked}
              size="large"
              onChange={(value: boolean) => setLargeChecked(value)}
            />
          </Row>
          <Row flexDirection="column">
            <Text>middle</Text>
            <Switch
              value={checked}
              onChange={(value: boolean) => setChecked(value)}
            />
          </Row>
          <Row flexDirection="column">
            <Text>small</Text>
            <Switch
              value={smallChecked}
              size="small"
              onChange={(value: boolean) => setSmallChecked(value)}
            />
          </Row>
        </Col>
        <Col space={15} flexDirection="column" alignItems="flex-start">
          <Row alignItems="center">
            <Text>activeColor: #1bc4a2</Text>
            <Switch
              value={colorChecked}
              activeColor="#1bc4a2"
              onChange={(value: boolean) => setColorChecked(value)}
            />
          </Row>
          <Row alignItems="center">
            <Text>disabled</Text>
            <Switch
              value={true}
              disabled
              onChange={(value: boolean) => setColorChecked(value)}
            />
          </Row>
        </Col>
        <View style={{height: 15}} />
      </View>
    </>
  );
};

export default SwitchDemo;
