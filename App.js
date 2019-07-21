/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const sourceUri = (
    Platform.OS === 'android'
        ? 'file:///android_asset/'
        : ''
) + 'Web.bundle/loader.html';

const params = 'platform='+Platform.OS;
const injectedJS = `
  if (!window.location.search) {
    var link = document.getElementById('progress-bar');
    link.href = './build/index.html?${params}';
    link.click();
  }
  
  true;
`;

import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';

// path where files will be served from (index.html here)
let path = RNFS.MainBundlePath + '/build';

let server = new StaticServer(8080, path, { localOnly: true });

server.start().then((url) => {
    console.log("Serving at URL", url);
});

const App = () => {
    console.log(`${RNFS.MainBundlePath}/build/index.html`)
    const injected = `
	
      true; // note: this is required, or you'll sometimes get silent failures
    `

    console.log(params, sourceUri, 'WTF')

    const path = `${RNFS.MainBundlePath}/build/index.html`

  return (
      <View style={{ height: '100%', width: '100%' }}>
        <WebView
            // injectedJavaScript={injectedJS}
            source={{ uri: 'http://localhost:8080' }}
            javaScriptEnabled={true}
            originWhitelist={['*']}
            allowFileAccess={true}
            useWebKit={false}
            onMessage={event => {
                alert(event.nativeEvent.data);
            }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
