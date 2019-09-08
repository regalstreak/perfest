import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { onSubmitLogin } from '../../library/networking/API/authAPI';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ADD_TOKEN } from '../../store/actions';
import { ReducerState } from '../../store/reducer';
import jwt_decode from 'jwt-decode';
import { validateLogin } from '../../library/utils/utils';
import { NavigationScreenProp } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TokenType {
    type: string,
    userId: string
}

interface ILoginProps {
    addToken: (token: string, userId: string, userType: string) => {
        type: string;
        token: string;
        userId: string;
        userType: string;
    }
    token: string,
    navigation: NavigationScreenProp<any, any>;
}

const submitLogin = async (addToken: (token: string, userId: string, userType: string) => { type: string, token: string, userId: string, userType: string },
    email: string, phone: string, password: string, navigation: NavigationScreenProp<any, any>) => {
    if (validateLogin(email, phone, password)) {
        let res = await onSubmitLogin(email, password);
        if (res.success) {
            let token = res.token;
            let userType = jwt_decode<TokenType>(token).type;
            let userId = jwt_decode<TokenType>(token).userId;
            addToken(token, userId, userType);
            // Handle success
            navigation.navigate('Home')
        } else {
            // Handle error
            console.log(res.error);
        }
    } else {
        // Handle error
        console.log('pls fill all fields');
    }
}

const Login = (props: ILoginProps) => {
    if (props.token) {
        // user already logged in as token is stored
        // redirect to homepage
    }
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [phone, setPhone] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text style={styles.loginText}>Login</Text>
            <PTextInput
                style={styles.loginViews}
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
                style={styles.loginViews}
                password
                placeholder="Password"
                onChangeText={(text: string) => {
                    setPassword(text);
                }}
            />
            <PButton
                style={styles.loginViews}
                text={'Login'}
                onPress={() => submitLogin(props.addToken, email, phone, password, props.navigation)}
            />
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state: ReducerState) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addToken: (token: string, userId: string, userType: string) => dispatch({ type: ADD_TOKEN, token, userId, userType })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginViews: {
        margin: wp(2.6),
    },
    loginText: {
        fontSize: hp(3.8),
        fontWeight: '500',
        marginHorizontal: hp(3)
    },
})