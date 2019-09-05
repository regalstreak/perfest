import React from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { ReducerState } from '../../store/reducer';

import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';

import HomeAdmin from './admin/HomeAdmin';
import HomeVol from './volunteer/HomeVol';
import HomeUser from './user/HomeUser';
import HomeAnon from './anon/HomeAnon';


interface IHomeProps extends INavigation {
    userType: string;
}

const Home = (props: IHomeProps) => {

    const {userType} = props;
    console.log(userType)

    // set home category
    let HomeCategory: any;
    switch (userType) {
        case 'admin': {
            HomeCategory = HomeAdmin;
            break;
        }
        case 'volunteer': {
            HomeCategory = HomeVol;
            break;
        }
        case 'user': {
            HomeCategory = HomeUser;
            break;
        }
        default: {
            HomeCategory = HomeAnon;
        }
    }

    return (
        <View style={styles.container}>

            <HomeCategory />

            <PBottomNav
                navigation={props.navigation}
                index={0}
            ></PBottomNav>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


const mapStateToProps = (state: ReducerState) => {
    return {
        userType: state.userType,
    }
}

export default connect(mapStateToProps)(Home);
