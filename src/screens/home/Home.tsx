import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ReducerState } from '../../store/reducer';
import { getUserType } from '../../library/utils/utils';
import { useRtype } from '../../library/hooks/authHooks';

import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import PButton from '../../library/components/PButton';

interface IHomeProps extends INavigation {
    userType: string;
}



const Home = (props: IHomeProps) => {


    const userType = useRtype();


    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <PButton
                onPress={() => { props.navigation.navigate('Login') }}
                text='Touch for auth'
            />

            <Text>
                Your user type: {userType}
            </Text>




            <PBottomNav
                navigation={props.navigation}
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
        token: state.token,
        userType: state.userType,
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Home);
