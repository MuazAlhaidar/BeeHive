/**
 * @format
 */ import * as firebase from 'firebase';

import config from './android/config';

firebase.initializeApp(config);
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
