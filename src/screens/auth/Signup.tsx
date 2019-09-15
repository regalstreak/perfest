import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import { onSubmitSignup } from '../../library/networking/API/authAPI';
import PButton from '../../library/components/PButton';
import { validateSignup } from '../../library/utils/utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../library/res/colors';
import { INavigation } from '../../library/interfaces/Navigation';

interface ISignupProps extends INavigation {
}


const Signup: React.FC<ISignupProps> = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [phone, setPhone] = useState('');


    const submitSignup = async () => {
        if (validateSignup(email, phone, password)) {
            let res = await onSubmitSignup(email, phone, password);
            if (res.success) {
                props.navigation.navigate('Login')
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

            <View style={styles.forgotSignup}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('Login')
                }}>
                    <Text style={styles.forgotSignupText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('ResetPassword')
                }}>
                    <Text style={styles.forgotSignupText}>Reset password</Text>
                </TouchableOpacity>
            </View>


            <PButton
                style={styles.signupViews}
                text={'Signup'}
                onPress={() => submitSignup()}
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
    forgotSignup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(70),
        paddingHorizontal: 8
    },
    forgotSignupText: {
        fontSize: wp(3),
        color: colors.perfestPrimary
    }
})
