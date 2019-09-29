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
import asyncDispatchMiddleware from './store/asyncDispatchMiddleware';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';

const Feather_ttf = require('react-native-vector-icons/Fonts/Feather.ttf')

const store = createStore(
    rootReducer,
    // @ts-ignore: Unreachable code error
    compose(
        offline({
            ...offlineConfig,
        }),
        applyMiddleware(asyncDispatchMiddleware)
    ),
);

Sentry.init({ dsn: "https://a7416fb4a4c64344916c2fe0dc06bf01@sentry.io/1761810" });

LogRocket.init('1mapcv/perfest');
// setupLogRocketReact(LogRocket);

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

serviceWorker.register();

ReactGA.initialize('UA-148694282-1');
ReactGA.pageview(window.location.pathname + window.location.search);
