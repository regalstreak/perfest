import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import { onSubmitSignup } from '../../library/networking/API/authAPI';

interface ISignupProps {

}

const Signup: React.FC<ISignupProps> = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // Change to on submit
    // setTimeout(() => onSubmitSignup(email, phone, password), 5000);
    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text>Signup</Text>
            <PTextInput
                type='email-address'
                placeholder="Email"
                getText={(text: string) => {
                    setEmail(text);
                }}
            />
            <PTextInput
                type='numeric'
                placeholder="Phone"
                getText={(text: string) => {
                    setPhone(text);
                }}
            />
            <PTextInput
                password
                placeholder="Password"
                getText={(text: string) => {
                    setPassword(text);
                }}
            />
        </KeyboardAvoidingView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
