// react-native-web

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from './store/rootReducer';
import * as serviceWorker from './serviceWorker';
const Feather_ttf = require('react-native-vector-icons/Fonts/Feather.ttf')
console.log(offlineConfig.retry({type: 'ADD_TOKEN', meta: { offline: {effect: { url:'localhost:3001/event/list', method: 'GET' }}}},5));
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(),
        offline({
            ...offlineConfig,
        })
    ),
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter >, document.getElementById('root')
)

const IconsCSS = `
    @font-face {
        src: url(${Feather_ttf});
        font-family: Feather;
    }
`;

const style: any = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
    style.styleSheet.cssText = IconsCSS;
} else {
    style.appendChild(document.createTextNode(IconsCSS));
}

document.head.appendChild(style);

serviceWorker.unregister();
