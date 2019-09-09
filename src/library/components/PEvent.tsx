import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';
import { INavigation } from '../interfaces/Navigation';
import { FullEventType } from '../interfaces/FullEventType';

interface IPEventProps extends INavigation {
    event: FullEventType
}

const PEvent = (props: IPEventProps) => {
    let { event } = props;
    let { date } = event;
    let displayDate: string = '';
    if (date) {
        let ISODate = new Date(date);
        displayDate = ISODate.getDate().toString() + ' ' + ISODate.toLocaleString('default', { month: 'short' }) + ', ' + ISODate.getFullYear().toString();
    }
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('EventDetails', {
                name: event.name
            })}
            style={styles.container}
        >
            <View style={styles.image}>
            </View>
            <View style={styles.rest}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{event.name}</Text>
                </View>
                <View style={styles.venueTimeContainer}>
                    <Text style={styles.venueTime}>Room: {event.venue}</Text>
                    <Text style={styles.venueTime}>{displayDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: hp(3),
        flexDirection: 'row',
        marginVertical: hp(1.8)
    },
    image: {
        height: hp(18),
        width: hp(18),
        backgroundColor: colors.perfestPrimary,
        borderRadius: 26,
    },
    rest: {
        height: hp(15),
        flex: 1,
        marginHorizontal: 24,
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 0.6,
        overflow: 'hidden'
    },
    venueTimeContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: hp(3.8),
    },
    venueTime: {
        fontSize: hp(2.4)
    },
})

export default PEvent;