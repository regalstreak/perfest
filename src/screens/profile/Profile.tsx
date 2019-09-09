import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import PButton from '../../library/components/PButton';
import PTicket from '../../library/components/PTicket';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';

interface IProfileProps extends INavigation {

}
export default (props: IProfileProps) => {

    const userType = useSelector((state: any) => state.auth.userType);
    const dispatch = useDispatch();

    const LoginLogoutButtons = () => {
        if (userType) {
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

    let abc = ['av', 'as']
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.ticketContainer}>
                    <Text style={styles.yourTicketText}>Your Tickets</Text>
                    {
                        abc.map((item, index) => (
                            <PTicket key={index} navigation={props.navigation} />
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
    yourTicketText: {
        fontSize: hp(3.8),
        fontWeight: '500',
        marginHorizontal: hp(3)
    }
})
