import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import { textStyles } from '../../library/res/styles';

interface INotificationsProps extends INavigation {

}

export default (props: INotificationsProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Text style={textStyles.headerText}>Notifications</Text>
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
