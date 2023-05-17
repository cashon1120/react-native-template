/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'mobx-react';
import rootStore from './src/models/global';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/routes/index';

function App(): JSX.Element {
  const [defaultPage] = useState('Login');
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider rootStore={rootStore}>
          <Navigation defaultPage={defaultPage} />
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}

export default App;
