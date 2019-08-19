import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

interface IAuthProps {
    navigation: NavigationScreenProp<any, any>;
}

export default (props: IAuthProps) => {

    props.navigation.navigate('Signup');
    return (
        <View style={styles.container}>
            <Text>Hello Auth</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
