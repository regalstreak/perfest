// react-native-web


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter >, document.getElementById('root')
)


// import App from './App';
// import { AppRegistry } from 'react-native';
// import * as serviceWorker from './serviceWorker';

// // register the app
// AppRegistry.registerComponent('App', () => App);

// AppRegistry.runApplication('App', {
//     initialProps: {},
//     rootTag: document.getElementById('root')
// });

// serviceWorker.unregister();
