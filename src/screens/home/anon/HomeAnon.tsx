import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface IHomeAnonProps {

}

export default (props: IHomeAnonProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello HomeAnon</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
