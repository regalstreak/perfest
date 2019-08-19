import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import PTextInput from '../../library/components/PTextInput';


interface ISignupProps {

}

export default (props: ISignupProps) => {
    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text>Signup</Text>
            <PTextInput type='email-address' placeholder="Email"></PTextInput>
            <PTextInput type='numeric' placeholder="Phone"></PTextInput>
            <PTextInput password placeholder="Password"></PTextInput>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
