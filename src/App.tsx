import React, { useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ADD_TOKEN } from './store/actions';
import jwt_decode from 'jwt-decode';

import WebRoutesGenerator from "./library/utils/WebRoutesWrapper/WebRoutesGenerator";

import Auth from "./screens/auth/Auth";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";

import Home from "./screens/home/Home";
import Events from "./screens/events/Events";
import Profile from "./screens/profile/Profile";
import Notifications from "./screens/notifs/Notifications";

import PEventDetails from './library/components/PEventDetails';
import TicketDetails from './screens/profile/TicketDetails';

// react-native-web is aliased to react-native automatically by create-react-app

const routeMap = {
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
    Home: {
        component: Home,
        path: '/',
        exact: true
    },
    Events: {
        component: Events,
        path: '/events',
    },
    Notifications: {
        component: Notifications,
        path: '/notifications',
    },
    Profile: {
        component: Profile,
        path: '/profile'
    },
    EventDetails: {
        component: PEventDetails,
        path: '/event/:name'
    },
    TicketDetails: {
        component: TicketDetails,
        path: '/t/:ticketId'
    }
}

interface TokenType {
    type: string,
    userId: string
}

interface IAppProps {
    addToken: (token: string, userId: string, userType: string) => {
        type: string;
        token: string;
        userId: string;
        userType: string;
    }
}

const App = (props: IAppProps) => {
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token) {
                    let userType = jwt_decode<TokenType>(token).type;
                    let userId = jwt_decode<TokenType>(token).userId;
                    props.addToken(token, userId, userType);
                }
            })
            .catch(console.log);
    });
    return (
        <View style={{ flex: 1 }} >
            {WebRoutesGenerator({ routeMap })}
        </View>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addToken: (token: string, userId: string, userType: string) => dispatch({ type: ADD_TOKEN, token, userId, userType })
    }
}

export default connect(null, mapDispatchToProps)(App);