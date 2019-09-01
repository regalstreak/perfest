import React from 'react';

import { NavigationScreenProp } from 'react-navigation';

interface IAuthProps {
    navigation: NavigationScreenProp<any, any>;
}

export default (props: IAuthProps) => {

    // if( user is logged in) {
    //     props.navigation.navigate('Home');
    // } else {
    //     props.navigation.navigate('Login');
    // }

    props.navigation.navigate('Login');

    return null;

}

