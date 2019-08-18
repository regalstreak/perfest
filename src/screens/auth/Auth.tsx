import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface IAuthProps {

}

export default (props: IAuthProps) => {
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
