// react-native-web is aliased to react-native automatically by create-react-app

import React, { useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ADD_TOKEN, REFRESH_EVENT_LIST, REFRESH_EVENT_LIST_SUCCESS, REFRESH_EVENT_LIST_FAILED } from './store/actions';
import jwt_decode from 'jwt-decode';
import { ModalContainer } from 'react-router-modal';
import constants from './library/networking/constants';

import WebRoutesGenerator from "./library/utils/WebRoutesWrapper/WebRoutesGenerator";

import Auth from "./screens/auth/Auth";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";
import ResetPassword from './screens/auth/ResetPassword';
import ChangePasswordLink from './screens/auth/ChangePasswordLink';

import Home from "./screens/home/Home";
import Events from "./screens/events/Events";
import Profile from "./screens/profile/Profile";
import Notifications from "./screens/notifs/Notifications";
import Volunteers from './screens/volunteers/Volunteers';

import AddVolunteerModal from './screens/volunteers/AddVolunteerModal';
import VolunteerDetails from './screens/volunteers/VolunteerDetails';

import EventDetails from './screens/events/EventDetails';
import TicketDetails from './screens/profile/TicketDetails';

const routeMap: any = {
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
    ResetPassword: {
        component: ResetPassword,
        path: '/reset'
    },
    ChangePasswordLink: {
        component: ChangePasswordLink,
        path: '/c/:changePasswordString'
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
        component: EventDetails,
        path: '/event/:name'
    },
    TicketDetails: {
        component: TicketDetails,
        path: '/t/:ticketId'
    },
    Volunteers: {
        component: Volunteers,
        path: '/volunteers',
    },
    VolunteerDetails: {
        component: VolunteerDetails,
        path: '/volunteer/:volunteerId'
    },
    AddVolunteerModal: {
        component: AddVolunteerModal,
        path: '*/addVol',
        modal: true
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
    },
    getLatestEvents: any;
}

const getLatestEvents = () => ({
    type: REFRESH_EVENT_LIST,
    payload: {},
    meta: {
        offline: {
            effect: { url: constants.BASE_URL + '/event/list', method: 'GET' },
            commit: { type: REFRESH_EVENT_LIST_SUCCESS, meta: {} },
            rollback: { type: REFRESH_EVENT_LIST_FAILED, meta: {} }
        }
    }
});

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

    useEffect(() => {
        if (props.getLatestEvents) {
            props.getLatestEvents();
        }
    }, [props.getLatestEvents]);

    return (
        <View style={{ flex: 1 }} >
            {WebRoutesGenerator({ routeMap })}
            <ModalContainer />
        </View>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addToken: (token: string, userId: string, userType: string) => dispatch({ type: ADD_TOKEN, token, userId, userType }),
        getLatestEvents: () => dispatch(getLatestEvents())
    }
}

export default connect(null, mapDispatchToProps)(App);