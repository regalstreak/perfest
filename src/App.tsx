import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// react-native-web is aliased to react-native automatically by create-react-app

export default class App extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Hello world
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontSize: 40,
    }
})
