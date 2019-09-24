import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../../library/res/styles';
import PButton from '../../../library/components/PButton';
import { INavigation } from '../../../library/interfaces/Navigation';


interface IHomeAnonProps extends INavigation {

}

export default (props: IHomeAnonProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={textStyles.headerText}>Hey there! Welcome to Perfest beta</Text>
            </View>
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
})
