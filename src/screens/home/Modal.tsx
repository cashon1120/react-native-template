import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Modal, Button, Header, Col, Row} from '@/library/Index';

const BottomSheetDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  return (
    <>
      <Header text="Modal" />
      <View style={{paddingHorizontal: 15}}>
        <Col direction="column" y={15} x={15} alignItems="stretch">
          <Row>
            <Button title="center" onPress={() => setVisible1(true)} />
          </Row>
          <Row>
            <Button title="bottom" onPress={() => setVisible2(true)} />
          </Row>
          <Row>
            <Button title="left" onPress={() => setVisible3(true)} />
          </Row>
          <Row>
            <Button title="right" onPress={() => setVisible4(true)} />
          </Row>
        </Col>
      </View>
      <Modal
        visible={visible1}
        onCancel={() => setVisible1(false)}
        position="center">
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
            width: '80%',
          }}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>

          <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
            <Button title="hide" onPress={() => setVisible1(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={visible2}
        onCancel={() => setVisible2(false)}
        position="bottom">
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
          }}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>

          <Button title="hide" onPress={() => setVisible2(false)} />
        </View>
      </Modal>

      <Modal
        visible={visible3}
        onCancel={() => setVisible3(false)}
        position="left">
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
            height: '100%',
          }}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Button title="hide" onPress={() => setVisible3(false)} />
        </View>
      </Modal>

      <Modal
        visible={visible4}
        onCancel={() => setVisible4(false)}
        position="right">
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
            height: '100%',
          }}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>

          <Button title="hide" onPress={() => setVisible4(false)} />
        </View>
      </Modal>
    </>
  );
};

export default BottomSheetDemo;
