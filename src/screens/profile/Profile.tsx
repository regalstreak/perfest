import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import PButton from '../../library/components/PButton';
import PMainListItem from '../../library/components/PMainListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTickets, getUserDetails, updateUserProfile } from '../../library/networking/API/userAPI';
import { textStyles } from '../../library/res/styles';
import { DELETE_ALL_LOGS, DELETE_TOKEN, DELETE_ALL_PENDING_TICKETS } from '../../store/actions/ActionNames';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PEditableTextInput from '../../library/components/PEditableTextInput';

interface IProfileProps extends INavigation {

}

const EditProfile = () => {

    const token = useSelector((state: any) => state.auth.token)

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    // get user details from id
    useEffect(() => {
        let isMounted = true;

        getUserDetails(token).then((res) => {
            if (isMounted) {
                setName(res.user.name);
                setEmail(res.user.contact.email);
                setPhone(res.user.contact.phone);
            }
        }).catch(err => {
            console.log(err);
        })

        return () => {
            isMounted = false;
        }
    }, [token])

    return (
        <View style={{marginVertical: 20}}>
            <Text style={{marginVertical: 20}}>Edit profile</Text>
            <PEditableTextInput
                width={wp(60)}
                style={styles.profileTextViews}
                placeholder='Name'
                onChangeText={(text: string) => {
                    setName(text);
                }}
                onSave={() => {
                    updateUserProfile(token, { name }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                }}
                value={name}
            />
            <PEditableTextInput
                width={wp(60)}
                style={styles.profileTextViews}
                placeholder='Phone'
                value={phone}
                onChangeText={(text: string) => {
                    setPhone(text);
                }}
                onSave={() => {
                    updateUserProfile(token, { phone }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                }}
            />
            <Text style={styles.editableText}>
                Email: <Text style={styles.editableTextEmail}>{email}</Text>
            </Text>
        </View>
    )
}


export default (props: IProfileProps) => {

    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const [tickets, setTickets] = useState<any[]>([])

    useEffect(() => {
        let isMounted = true;

        if (auth.userType) {
            getAllTickets(auth.token).then((res) => {
                if (res.success) {
                    if (isMounted) {
                        setTickets(res.ticketList);
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        }

        return () => {
            isMounted = false;
        }
    }, [auth.token, auth.userType])

    const LoginLogoutButtons = () => {
        if (auth.userType) {
            return (
                <View style={styles.loginSignupContainer}>
                    <PButton
                        onPress={() => {
                            dispatch({ type: DELETE_TOKEN });
                            dispatch({ type: DELETE_ALL_LOGS });
                            dispatch({ type: DELETE_ALL_PENDING_TICKETS });
                        }}
                        text='Logout' />
                </View>
            )
        } else {
            return (
                <View style={styles.loginSignupContainer}>
                    <PButton
                        onPress={() => { props.navigation.navigate('Login') }}
                        text='Login'
                    />
                    <Text style={{ marginHorizontal: 20 }}>OR</Text>
                    <PButton
                        onPress={() => { props.navigation.navigate('Signup') }}
                        text='Signup'
                    />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={textStyles.NheaderText}>Profile</Text>

                {
                    auth.token ?
                        <EditProfile /> : null
                }

                <View style={styles.ticketContainer}>
                    {
                        (tickets.length > 0) ?
                            <Text style={textStyles.NsubHeaderText}>Your Tickets</Text>
                            : null
                    }
                    {
                        tickets.map((item, index) => (
                            <PMainListItem
                                type='ticket'
                                navigId={item.url}
                                title={item.event.name}
                                bottomLeft={item.event.venue}
                                key={index}
                                navigation={props.navigation}
                            />
                        ))
                    }
                </View>

            </View>

            <LoginLogoutButtons />

            <PBottomNav
                navigation={props.navigation}
                index={3}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        marginHorizontal: hp(3.5),
    },
    loginSignupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center'
    },
    ticketContainer: {

    },
    profileTextViews: {
        marginBottom: hp(3)
    },
    editableText: {
        fontSize: hp(2.7),
        fontWeight: '500'
    },
    editableTextEmail: {
        fontSize: hp(2.7),
        fontWeight: '400'
    },
})
