import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

interface IHomeProps {
    navigation: NavigationScreenProp<any, any>;
}

export default (props: IHomeProps) => {

    return (
        <View style={styles.container}>
            <Text>Hello Home</Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Auth') }}>
                <Text>Touch for auth</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
