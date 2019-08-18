import React from 'react';
import { View } from 'react-native';

import WebRoutesGenerator from "./library/utils/WebRoutesWrapper/WebRoutesGenerator";

import Home from "./screens/home/Home";
import Auth from "./screens/auth/Auth";

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
    }
}

export default () => {
    return (
        <View >
            {WebRoutesGenerator({ routeMap })}
        </View>
    )
}

