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
    const [error, setError] = useState('');

    const addVolClicked = () => {
        setError('');
        upgradeUserToVolunteer(token, email).then((res) => {
            if (res.success) {
                props.navigation.goBack();
            } else {
                // Handle failure
                console.log(res.error);
                let errorMessage: any = res.error;
                if (typeof errorMessage === 'string') {
                    setError(errorMessage);
                } else {
                    if (res.error) {
                        if (res.error.toString() === 'TypeError: Failed to fetch') {
                            setError('Please check your internet connection');
                        } else {
                            setError('An error occured. Please try again');
                        }
                    } else {
                        setError('An error occured. Please try again');
                    }
                }
            }
        }).catch(err => {
            // Handle failure
            console.log(err);
            let errorMessage: any = error;
            if (typeof errorMessage === 'string') {
                setError(errorMessage);
            } else {
                if (error) {
                    if (error.toString() === 'TypeError: Failed to fetch') {
                        setError('Please check your internet connection');
                    } else {
                        setError('An error occured. Please try again');
                    }
                } else {
                    setError('An error occured. Please try again');
                }
            }
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
                <Text style={styles.errorText}>{error}</Text>
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
    },
    errorText: {
        color: 'red'
    }
})
