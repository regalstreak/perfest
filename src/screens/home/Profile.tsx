import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';

interface IProfileProps extends INavigation {

}

export default (props: IProfileProps) => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <PBottomNav
                navigation={props.navigation}
            ></PBottomNav>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
