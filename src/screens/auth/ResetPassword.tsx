import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import PButton from '../../library/components/PButton';
import PTextInput from '../../library/components/PTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { INavigation } from '../../library/interfaces/Navigation';
import { colors } from '../../library/res/colors';
import { sendResetMail } from '../../library/networking/API/authAPI';


interface IResetPasswordProps extends INavigation {

}


export default (props: IResetPasswordProps) => {

    const [email, setEmail] = useState<string>('');

    const clickedResetPassword = () => {
        sendResetMail(email).then((res) => {
            if(res.success){
                props.navigation.navigate('Login');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text style={styles.signupText}>Reset Password</Text>
            <PTextInput
                style={styles.signupViews}
                type='email-address'
                placeholder="Email"
                onChangeText={(text: string) => {
                    setEmail(text);
                }}
            />

            <View style={styles.forgotSignup}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('Login')
                }}>
                    <Text style={styles.forgotSignupText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('Signup')
                }}>
                    <Text style={styles.forgotSignupText}>Signup</Text>
                </TouchableOpacity>
            </View>


            <PButton
                style={styles.signupViews}
                text={'Reset Password'}
                onPress={() => {
                    clickedResetPassword();
                }}
            />

        </KeyboardAvoidingView>
    )
}

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
