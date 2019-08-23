import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import { onSubmitSignup } from '../../library/networking/API/authAPI';
import PButton from '../../library/components/PButton';
import { validateSignup } from '../../library/utils/utils';

interface ISignupProps {

}

const submitSignup = async (email: string, phone: string, password: string) => {
    if (validateSignup(email, phone, password)) {
        let res = await onSubmitSignup(email, phone, password);
        if (res.success) {
            // Handle success
            console.log(res.success);
        } else {
            // Handle failure
            console.log(res.success);
        }
    } else {
        // Handle error
        console.log('pls fill all fileds');
    }
}

const Signup: React.FC<ISignupProps> = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            <PButton
                text={'SignUp'}
                onPress={() => submitSignup(email, phone, password)}
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
