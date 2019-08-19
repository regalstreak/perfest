import React from 'react';
import { View } from 'react-native';

import WebRoutesGenerator from "./library/utils/WebRoutesWrapper/WebRoutesGenerator";

import Home from "./screens/home/Home";
import Auth from "./screens/auth/Auth";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";

// react-native-web is aliased to react-native automatically by create-react-app


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
}

export default () => {
    return (
        <View style={{ flex: 1 }} >
            {WebRoutesGenerator({ routeMap })}
        </View>
    )
}

