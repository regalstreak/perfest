import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PSearchDropdown from '../../library/components/PSearchDropdown';
import { updateUserProfile } from '../../library/networking/API/userAPI';

interface IUserProps {
    userRes: any;
}

export default (props: IUserProps) => {

    // Non upgrade only password stuff

    // Upgrade Stuff

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

            const [name, setName] = useState<string>('');
            const [phone, setPhone] = useState<string>('');
            const [password, setPassword] = useState<string>('');
            const [college, setCollege] = useState<string>('');
            const [year, setYear] = useState<string>('');


            const submitButtonUpdate = () => {
                updateUserProfile({
                    userId: props.userRes._id,
                    data: {
                        name,
                        password,
                        contact: {
                            email: props.userRes.contact.email,
                            phone
                        },
                        college: {
                            name: college,
                            department: '',
                            year
                        },
                        type: true,
                        csi_member: false,
                    }
                }).then((res) => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }

            return (
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView style={styles.userMain}>

                        <Text>Hey {props.userRes.contact.email}!</Text>
                        <Text>Please complete your profile to view your ticket</Text>
                        <PTextInput
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
                        />
                        <PTextInput
                            style={styles.userViews}
                            placeholder='Set Password' password
                            onChangeText={(text: string) => {
                                setPassword(text);
                            }}
                        />




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
                            default='1'
                            editable={false}
                            onChangeSelection={(text: string) => {
                                setYear(text);
                            }}
                        />


                        <PButton style={styles.userViews} text='Update' onPress={() => {
                            submitButtonUpdate();
                        }} />
                    </KeyboardAvoidingView>
                </ScrollView>
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
    },
    userMain: {
        alignItems: 'center',
    },
    userViews: {
        margin: wp(2.6),
    }
})
