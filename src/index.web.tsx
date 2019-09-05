// react-native-web

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './store/reducer';
import * as serviceWorker from './serviceWorker';
const Feather_ttf = require('react-native-vector-icons/Fonts/Feather.ttf')

const store = createStore(Reducer);

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
