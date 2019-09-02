import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './store/reducer';

import WebRoutesGenerator from "./library/utils/WebRoutesWrapper/WebRoutesGenerator";


import Home from "./screens/home/Home";
import Auth from "./screens/auth/Auth";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";
import PEventDetails from './library/components/PEventDetails';

// react-native-web is aliased to react-native automatically by create-react-app

const store = createStore(Reducer);

const routeMap = {
    Home: {
        component: Home,
        path: '/',
        exact: true
    },
    Auth: {
        component: Auth,
        path: '/auth'
    },
    Login: {
        component: Login,
        path: '/login'
    },
    Signup: {
        component: Signup,
        path: '/signup'
    },
    EventDetails: {
        component: PEventDetails,
        path: '/event/:name'
    },
}

export default () => {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }} >
                {WebRoutesGenerator({ routeMap })}
            </View>
        </Provider>
    )
}

