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
      <Col x={15} y={15}>
        <Row direction="column">
          <Text>large</Text>
          <Switch
            value={largeChecked}
            size="large"
            onChange={(value: boolean) => setLargeChecked(value)}
          />
        </Row>
        <Row direction="column">
          <Text>middle</Text>
          <Switch
            value={checked}
            onChange={(value: boolean) => setChecked(value)}
          />
        </Row>
        <Row direction="column">
          <Text>small</Text>
          <Switch
            value={smallChecked}
            size="small"
            onChange={(value: boolean) => setSmallChecked(value)}
          />
        </Row>
      </Col>
      <Col x={15} direction="column" alignItems="flex-start" y={15}>
        <Row alignItems="center">
          <Switch
            value={colorChecked}
            activeColor="#1bc4a2"
            onChange={(value: boolean) => setColorChecked(value)}
          />
          <Text style={{marginLeft: 10}}>activeColor: #1bc4a2</Text>
        </Row>
        <Row alignItems="center">
          <Switch
            value={true}
            disabled
            onChange={(value: boolean) => setColorChecked(value)}
          />
          <Text style={{marginLeft: 10}}>disabled</Text>
        </Row>
      </Col>
      <View style={{height: 15}} />
    </>
  );
};

export default SwitchDemo;
