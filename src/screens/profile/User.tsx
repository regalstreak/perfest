import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { upgradeAnonymousToUser } from '../../library/networking/API/userAPI';
import { validateLogin } from '../../library/utils/utils';
import { onSubmitLogin } from '../../library/networking/API/authAPI';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { ADD_TOKEN } from '../../store/actions/ActionNames';
import { INavigation } from '../../library/interfaces/Navigation';
import { TokenType } from '../../library/interfaces/AuthTypes';
import { colors } from '../../library/res/colors';
import PLoading from '../../library/components/PLoading';

interface IUserProps extends INavigation {
    userRes: any;
}

export default (props: IUserProps) => {

    const dispatch = useDispatch();

    if (props.userRes) {
        if (props.userRes.type) {
            // userType is true, ask for password

            const [password, setPassword] = useState<string>('');

            const submitButtonLogin = async () => {
                if (validateLogin(props.userRes.contact.email, '', password)) {
                    let res = await onSubmitLogin(props.userRes.contact.email, password);
                    if (res.success) {
                        let token = res.token;
                        let userType = jwt_decode<TokenType>(token).type;
                        let userId = jwt_decode<TokenType>(token).userId;
                        dispatch({ type: ADD_TOKEN, token, userId, userType })
                        // Handle success
                        props.navigation.navigate('TicketDetails', {
                            ticketId: props.navigation.getParam('ticketId')
                        })
                    } else {
                        // Handle error
                        console.log(res.error);
                    }
                } else {
                    // Handle error
                    console.log('pls fill all fields');
                }
            }


            return (
                <KeyboardAvoidingView style={styles.userMain}>
                    <Text>Hello {props.userRes.name ? props.userRes.name : props.userRes.contact.email}</Text>
                    <Text style={{ marginTop: 8, maxWidth: wp(70), textAlign: 'center' }}>Please enter your Perfest password to view your ticket:</Text>
                    <PTextInput
                        style={styles.userViews}
                        placeholder='Password'
                        password
                        onChangeText={(text: string) => {
                            setPassword(text);
                        }}
                    />
                    <View style={styles.forgotPassword}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('ResetPassword')
                        }}>
                            <Text style={styles.forgotPasswordText}>Reset password</Text>
                        </TouchableOpacity>
                    </View>
                    <PButton
                        style={styles.userViews}
                        text='View Ticket'
                        onPress={submitButtonLogin}
                    />
                </KeyboardAvoidingView>
            )
        } else {
            // userType is false, ask for upgrade 

            // const [name, setName] = useState<string>('');
            // const [phone, setPhone] = useState<string>('');
            const [password, setPassword] = useState<string>('');
            // const [college, setCollege] = useState<string>('');
            // const [year, setYear] = useState<string>('');


            const submitButtonUpdate = () => {
                upgradeAnonymousToUser(
                    props.userRes._id,
                    {
                        // name,
                        password,
                        // contact: {
                        // email: props.userRes.contact.email,
                        // phone
                        // },
                        // college: {
                        // name: college,
                        // department: '',
                        // year
                        // },
                        // type: true,
                        // csi_member: false,
                    }
                ).then((res) => {
                    if (res.success) {
                        let token = res.token;
                        let userType = jwt_decode<TokenType>(token).type;
                        let userId = jwt_decode<TokenType>(token).userId;
                        dispatch({ type: ADD_TOKEN, token, userId, userType })
                        // Handle success
                        props.navigation.navigate('TicketDetails', {
                            ticketId: props.navigation.getParam('ticketId')
                        })
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }

            return (
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView style={styles.userMain}>

                        <Text>Hey {props.userRes.contact.email}!</Text>
                        <Text>Please set a new password to view your ticket!</Text>
                        {/* <PTextInput
                            style={styles.userViews}
                            placeholder='Name'
                            onChangeText={(text: string) => {
                                setName(text);
                            }}
                        />
                        <PTextInput
                            style={styles.userViews}
                            placeholder='Phone number'
                            onChangeText={(text: string) => {
                                setPhone(text);
                            }}
                            type='numeric'
                        /> */}
                        <PTextInput
                            style={styles.userViews}
                            placeholder='Set Password' password
                            onChangeText={(text: string) => {
                                setPassword(text);
                            }}
                        />
{/* 
                        <Text>College</Text>

                        <PTextInput
                            style={styles.userViews}
                            placeholder='College'
                            onChangeText={(text: string) => {
                                setCollege(text);
                            }}
                        />

                        <PSearchDropdown
                            style={styles.userViews}
                            placeholder='Year'
                            data={[
                                { name: '1', meta: '1' },
                                { name: '2', meta: '2' },
                                { name: '3', meta: '3' },
                                { name: '4', meta: '4' },
                                { name: '5', meta: '5' },
                                { name: '6', meta: '6' },
                                { name: 'Other', meta: 'Other' }
                            ]}
                            editable={false}
                            onChangeSelection={(text: string) => {
                                setYear(text);
                            }}
                        /> */}


                        <PButton style={styles.userViews} text='Update' onPress={() => {
                            submitButtonUpdate();
                        }} />
                    </KeyboardAvoidingView>
                </ScrollView>
            )
        }
    } else {
        return (
            <PLoading />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    userMain: {
        alignItems: 'center',
    },
    userViews: {
        margin: wp(2.6),
    },
    forgotPassword: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: wp(70),
        paddingHorizontal: 8
    },
    forgotPasswordText: {
        fontSize: wp(3),
        color: colors.perfestPrimary
    }
})
