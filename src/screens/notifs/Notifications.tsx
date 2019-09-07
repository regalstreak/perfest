import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';

interface INotificationsProps extends INavigation {

}

export default (props: INotificationsProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Text>Notifications</Text>
            </View>

            <PBottomNav
                navigation={props.navigation}
                index={2}
            ></PBottomNav>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
