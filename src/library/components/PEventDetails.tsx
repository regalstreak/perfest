import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';


interface IPEventDetailsProps {
    navigation: NavigationScreenProp<any, any>;
}

export default (props: IPEventDetailsProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello PEventDetails</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
