import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import { onSubmitSignup } from '../../library/networking/API/authAPI';
import PButton from '../../library/components/PButton';
import { validateSignup } from '../../library/utils/utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    // eslint-disable-next-line
    const [phone, setPhone] = useState('');
    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text style={styles.signupText}>Signup</Text>
            <PTextInput
                style={styles.signupViews}
                type='email-address'
                placeholder="Email"
                onChangeText={(text: string) => {
                    setEmail(text);
                }}
            />
            {/* <PTextInput
                type='numeric'
                placeholder="Phone"
                onChangeText={(text: string) => {
                    setPhone(text);
                }}
            /> */}
            <PTextInput
                style={styles.signupViews}
                password
                placeholder="Password"
                onChangeText={(text: string) => {
                    setPassword(text);
                }}
            />
            <PButton
                style={styles.signupViews}
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
    },
    signupViews: {
        margin: wp(2.6),
    },
    signupText: {
        fontSize: hp(3.8),
        fontWeight: '500',
        marginHorizontal: hp(3)
    },
})
