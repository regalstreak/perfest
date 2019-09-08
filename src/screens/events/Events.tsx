import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';
import PEvent from '../../library/components/PEvent';

interface IEventsProps extends INavigation {

}

export default (props: IEventsProps) => {

    let abc = ['av', 'as', 'as', 'as', 'as', 'as', 'as', 'as']

    return (
        <View style={styles.container}>
            <Text>Events</Text>


            <ScrollView>
                {
                    abc.map((item, index) => (
                        <PEvent key={index} navigation={props.navigation}></PEvent>
                    ))
                }
            </ScrollView>


            <PBottomNav
                navigation={props.navigation}
                index={1}
            ></PBottomNav>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})