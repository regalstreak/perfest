import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface ILoginProps {

}

export default (props: ILoginProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
