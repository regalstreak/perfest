import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';
import PEvent from '../../library/components/PEvent';
import { getAllEvents } from '../../library/networking/API/eventAPI';
import { FullEventType } from '../../library/interfaces/FullEventType';

interface IEventsProps extends INavigation {

}

export default (props: IEventsProps) => {
    const [events, setEvents] = useState<FullEventType[] | null>(null);
    useEffect(() => {
        let isMounted = true;
        getAllEvents()
            .then(res => {
                if (res.success) {
                    const { eventList } = res;
                    console.log(eventList);
                    if (isMounted) {
                        setEvents(eventList);
                    }
                } else {
                    console.log(res.error);
                }
            })
            .catch(console.log)
        return () => {
            // cleanup
            isMounted = false;
        }
    }, []);

    if (!events) {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View >
                <PBottomNav
                    navigation={props.navigation}
                    index={1}
                ></PBottomNav>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Events</Text>

                <ScrollView>
                    {
                        events.map((item, index) =>
                            (
                                <PEvent key={index} navigation={props.navigation} event={item}></PEvent>
                            )
                        )
                    }
                </ScrollView>

                <PBottomNav
                    navigation={props.navigation}
                    index={1}
                ></PBottomNav>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
