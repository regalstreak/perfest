import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


interface IUserProps {
    userRes: any;
}

export default (props: IUserProps) => {

    if (props.userRes) {
        if (props.userRes.type) {
            // userType is true, ask for password
            return (
                <View style={styles.container}>
                    <Text>Hello {props.userRes.name ? props.userRes.name : props.userRes.contact.email}</Text>
                    <Text>Please enter your Perfest password to view your ticket:</Text>
                    <PTextInput style={styles.userViews} placeholder='Password' password></PTextInput>
                    <PButton style={styles.userViews} text='View Ticket'></PButton>
                </View>
            )
        } else {
            // userType is false, ask for upgrade 
            return (
                <View style={styles.container}>
                    <Text>Hello {props.userRes.name ? props.userRes.name : props.userRes.contact.email}</Text>
                    <Text>Please complete profile to view ticket</Text>
                    <PTextInput style={styles.userViews} placeholder='Name'></PTextInput>
                    <PTextInput style={styles.userViews} placeholder='Phone number'></PTextInput>
                    <PTextInput style={styles.userViews} placeholder='College'></PTextInput>
                    <PTextInput style={styles.userViews} placeholder='Year'></PTextInput>
                    <PButton style={styles.userViews} text='Update' onPress={() => {
                        if (Platform.OS === 'web') {
                            window.location.reload();
                        }
                    }} />
                </View>
            )
        }
    } else {
        return (
            <Text>Loading</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    userViews: {
        margin: wp(2.6),
    }
})
