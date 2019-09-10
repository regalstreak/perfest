import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';
import { getAllEvents } from '../../library/networking/API/eventAPI';
import { FullEventType } from '../../library/interfaces/FullEventType';
import PLoading from '../../library/components/PLoading';
import PMainListItem from '../../library/components/PMainListItem';
import { getFormattedDateAndTime } from '../../library/utils/utils';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { textStyles } from '../../library/res/styles';

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
                    <PLoading />
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
                <Text style={textStyles.headerText}>Events</Text>
                <ScrollView>
                    {
                        events.map((item, index) =>
                            (
                                <PMainListItem
                                    type='event'
                                    key={index}
                                    navigation={props.navigation}
                                    navigId={item.name}
                                    title={item.name}
                                    bottomLeft={item.venue}
                                    bottomRight={getFormattedDateAndTime(item.date)[0]}
                                />

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
    },
})
