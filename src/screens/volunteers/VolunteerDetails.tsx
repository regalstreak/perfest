import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';


interface IVolunteerDetailsProps extends INavigation {

}

export default (props: IVolunteerDetailsProps) => {

    const name = props.navigation.getParam('volunteerId')

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>Hello {name}</Text>
            </View>
            <PBottomNav navigation={props.navigation} index={2} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
