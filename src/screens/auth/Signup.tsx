import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PTextInput from '../../library/components/PTextInput';


interface ISignupProps {

}

export default (props: ISignupProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello Signup</Text>
            <PTextInput></PTextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})
