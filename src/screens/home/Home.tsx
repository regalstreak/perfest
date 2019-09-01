import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReducerState } from '../../store/reducer';
import { connect } from 'react-redux';

import { NavigationScreenProp } from 'react-navigation';
import PBottomNav from '../../library/components/PBottomNav';
import { getUserType } from '../../library/utils/utils';
import { useRtype } from '../../library/hooks/authHooks';

interface IHomeProps {
    navigation: NavigationScreenProp<any, any>,
    userType: string;
}

const Home = (props: IHomeProps) => {

    const userType = useRtype();

    return (
        <View style={styles.container}>
            <Text>Hello Home</Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Auth') }}>
                <Text>Touch for auth</Text>
            </TouchableOpacity>

            <Text>
                type: {userType}
            </Text>

            <PBottomNav></PBottomNav>
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
