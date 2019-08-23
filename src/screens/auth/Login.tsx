import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { onSubmitLogin } from '../../library/networking/API/authAPI';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ADD_TOKEN } from '../../store/actions';
import { ReducerState } from '../../store/reducer';
import jwt_decode from 'jwt-decode';
import { validateLogin } from '../../library/utils/utils';

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
    userType: string,
    userId: string
}

const submitLogin = async (addToken: (token: string, userId: string, userType: string) => { type: string, token: string, userId: string, userType: string },
    email: string, phone: string, password: string) => {
    if (validateLogin(email, phone, password)) {
        let res = await onSubmitLogin(email, phone, password);
        if (res.success) {
            let token = res.token;
            let userType = jwt_decode<TokenType>(token).type;
            let userId = jwt_decode<TokenType>(token).userId;
            addToken(token, userId, userType);
            // Handle success
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
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // For testing
    setTimeout(() => {
        console.log(props.token);
        console.log(props.userType);
        console.log(props.userId);
    }, 2000);
    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Text>Login</Text>
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
                text={'Login'}
                onPress={() => submitLogin(props.addToken, email, phone, password)}
            />
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state: ReducerState) => {
    return {
        token: state.token,
        userType: state.userType,
        userId: state.userId
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
    }
})