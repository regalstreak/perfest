import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PTextInput from '../../library/components/PTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PButton from '../../library/components/PButton';
import { resetPassword } from '../../library/networking/API/authAPI';

interface IChangePasswordLinkProps extends INavigation {

}

export default (props: IChangePasswordLinkProps) => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const clickedChangePassword = () => {
        if (password === confirmPassword) {
            resetPassword(props.navigation.getParam('changePasswordString'), password)
                .then((res: any) => {
                    if (res.message === 'Password was reset') {
                        props.navigation.navigate('Login');
                        return;
                    } else if (res.error) {
                        console.log(res.error);
                        if (res.error.toString() === 'TypeError: Failed to fetch') {
                            setError('Please check your internet connection');
                        } else {
                            setError(res.error.toString());
                        }
                    } else {
                        setError('An error occured. Please try again');
                    }
                    setDisableButton(false);
                })
                .catch(err => {
                    console.log(err);
                    setError(err.toString());
                    setDisableButton(false);
                })
        } else {
            console.log('Please check your passwords again');
            setError('Please check your passwords again');
            setDisableButton(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.changePasswordLinkHeading}>Please enter a new password</Text>
            <PTextInput
                style={styles.changePasswordLinkViews}
                placeholder="Password"
                onChangeText={(text: string) => {
                    setPassword(text);
                }}
                password
            />

            <PTextInput
                style={styles.changePasswordLinkViews}
                placeholder="Confirm Password"
                onChangeText={(text: string) => {
                    setConfirmPassword(text);
                }}
                password
            />

            <Text style={styles.errorText}>{error}</Text>
            <PButton
                style={styles.changePasswordLinkViews}
                text={'Change Password'}
                disable={disableButton}
                onPress={() => {
                    setError('');
                    setDisableButton(true);
                    clickedChangePassword();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changePasswordLinkHeading: {
        fontSize: hp(2.6),
        fontWeight: '500',
        margin: wp(2.6),
        marginHorizontal: hp(3)
    },
    changePasswordLinkViews: {
        margin: wp(2.6),
    },
    errorText: {
        fontSize: wp(3),
        color: 'red',
    }
})
