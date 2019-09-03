import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../interfaces/Navigation';


interface IPEventDetailsProps extends INavigation {
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
