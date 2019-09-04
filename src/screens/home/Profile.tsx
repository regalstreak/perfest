import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import PButton from '../../library/components/PButton';

interface IProfileProps extends INavigation {

}
export default (props: IProfileProps) => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>

            <PButton
                onPress={() => { props.navigation.navigate('Login') }}
                text='Touch for login'
            />
            <PButton
                onPress={() => { props.navigation.navigate('Signup') }}
                text='Touch for signup'
            />
            <PBottomNav
                navigation={props.navigation}
                index={3}
            ></PBottomNav>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
