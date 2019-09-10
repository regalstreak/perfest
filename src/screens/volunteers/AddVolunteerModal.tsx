import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../library/res/colors';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { INavigation } from '../../library/interfaces/Navigation';
import PTextInput from '../../library/components/PTextInput';
import PButton from '../../library/components/PButton';
import { upgradeUserToVolunteer } from '../../library/networking/API/userAPI';
import { useSelector } from 'react-redux';

interface IAddVolunteerModalProps extends INavigation {

}
export default (props: IAddVolunteerModalProps) => {

    const [email, setEmail] = useState<string>('')
    const token = useSelector((state: any) => state.auth.token);

    const addVolClicked = () => {
        upgradeUserToVolunteer(token, email).then((res) => {
            if (res.success) {
                props.navigation.goBack();
            } else {
                console.log('Error in adding volunteer');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack();
                }}
            >
                <View style={styles.backContainer} >
                    <FeatherIcon
                        name='arrow-left'
                        size={28}
                        color={colors.perfestPrimary} />
                </View>
            </TouchableOpacity>

            <KeyboardAvoidingView style={styles.addKav}>

                <Text
                    style={[styles.addViews, styles.addText]}
                >
                    Enter the email id of the already existing user to add
            </Text>
                <PTextInput
                    width={wp(60)}
                    style={styles.addViews}
                    placeholder='Email'
                    type='email-address'
                    onChangeText={(text: string) => {
                        setEmail(text);
                    }}
                />

                <PButton
                    text='Add'
                    style={styles.addViews}
                    onPress={() => {
                        addVolClicked();
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(70),
        margin: hp(3),
    },
    addKav: {
        margin: hp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    addViews: {
        margin: wp(2.6),
    },
    addText: {
        textAlign: 'center'
    },
    backContainer: {
        margin: 8
    }
})
