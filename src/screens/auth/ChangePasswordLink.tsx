import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';


interface IChangePasswordLinkProps extends INavigation {

}

export default (props: IChangePasswordLinkProps) => {
    console.log(props.navigation.getParam('changePasswordToken'));
    return (
        <View style={styles.container}>
            <Text>Hello ChangePasswordLink</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
