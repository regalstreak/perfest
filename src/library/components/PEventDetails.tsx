import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface IPEventDetailsProps {

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
