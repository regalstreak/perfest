// react-native-web is aliased to react-native automatically by create-react-app

import React from 'react';
import { View } from 'react-native';
import { ModalContainer } from 'react-router-modal';

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

interface IAppProps {
}



const App = (props: IAppProps) => {

    return (
        <View style={{ flex: 1 }} >
            {WebRoutesGenerator({ routeMap })}
            <ModalContainer />
        </View>
    )
}

export default App;