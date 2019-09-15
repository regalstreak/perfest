import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import PButton from '../../library/components/PButton';
import PMainListItem from '../../library/components/PMainListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTickets } from '../../library/networking/API/userAPI';
import { textStyles } from '../../library/res/styles';

interface IProfileProps extends INavigation {

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
                            dispatch({ type: 'DELETE_TOKEN' })

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
            <View style={styles.container}>
                <Text style={textStyles.headerText}>Profile</Text>
                <View style={styles.ticketContainer}>
                    {
                        (tickets.length > 0) ?
                            <Text style={textStyles.subHeaderText}>Your Tickets</Text>
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
    loginSignupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center'
    },
    ticketContainer: {

    },
})
