import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';
// import { getAllEvents } from '../../library/networking/API/eventAPI';
// import EventType from '../../library/interfaces/EventType';
import { connect, useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import PLoading from '../../library/components/PLoading';
import PMainListItem from '../../library/components/PMainListItem';
import { getFormattedDateAndTime } from '../../library/utils/utils';
import { textStyles } from '../../library/res/styles';
import EventType from '../../library/interfaces/EventType';
import { getLatestEvents } from '../../store/actions/actions';

interface IEventsProps extends INavigation {
}

const Events = (props: IEventsProps) => {

    const events = useSelector((state: any) => state.events.eventList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLatestEvents());
    }, [dispatch])

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
                        events.map((item: EventType, index: number) =>
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

const mapStateTopProps = (state: AppState) => {
    return {
        events: state.events.eventList
    }
}

export default connect(mapStateTopProps)(Events);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
