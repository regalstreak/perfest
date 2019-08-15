import App from './App';
import { AppRegistry } from 'react-native';
import * as serviceWorker from './serviceWorker';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.getElementById('root')
});

serviceWorker.unregister();
