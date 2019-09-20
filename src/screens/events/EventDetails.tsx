import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import { connect, useSelector } from 'react-redux';
import PBottomNav from '../../library/components/PBottomNav';
import { AppState } from '../../store/rootReducer';
import EventType from '../../library/interfaces/EventType';
import EventVols from './EventVols';

interface IEventDetailsProps extends INavigation {
    event: EventType[]
}

const EventDetails = (props: IEventDetailsProps) => {

    const userType = useSelector((state: any) => state.auth.userType)


    if (!props.event) {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        )
    } else {
        let events = props.event;
        console.log(props.navigation.getParam('name'));
        let thisEvent = events.find(event => {
            return event.name === props.navigation.getParam('name');
        })
        if (!thisEvent) {
            return (
                <View style={styles.container}>
                    <Text>Sorry event not found</Text>
                </View>
            )
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            let { name, description, date, cost_1, cost_2, cost_4, image, venue } = thisEvent;
            let ISODate = new Date(date);
            let displayDate: string = ISODate.getDate().toString() + ' ' + ISODate.toLocaleString('default', { month: 'short' }) + ', ' + ISODate.getFullYear().toString();
            let cost_2Display: any = null;
            if (cost_2 !== 0) cost_2Display = <Text>Cost(2): {cost_2}</Text>;
            let cost_4Display: any = null;
            if (cost_4 !== 0) cost_4Display = <Text>Cost(4): {cost_4}</Text>;
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text>Hello EventDetails</Text>
                        <Text>Name: {name}</Text>
                        <Text>Description: {description}</Text>
                        <Text>Date: {displayDate}</Text>
                        <Text>Venue: {venue}</Text>
                        <Text>Cost(1): {cost_1}</Text>
                        {cost_2Display}
                        {cost_4Display}

                        {
                            userType === 'admin' || 'volunteer' ?
                                <EventVols /> : null
                        }

                    </View>
                    <PBottomNav navigation={props.navigation} index={1} />
                </View>
            )
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        event: state.events.eventList
    }
}

export default connect(mapStateToProps)(EventDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
