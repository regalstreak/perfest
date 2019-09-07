import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../interfaces/Navigation';


interface IPTicketDetailsProps extends INavigation {
}

export default (props: IPTicketDetailsProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello PTicketDetails</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
