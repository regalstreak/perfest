import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';
import { NavigationScreenProp } from 'react-navigation';

interface IPTicketProps {
    navigation: NavigationScreenProp<any, any>;
}


const PTicket = (props: IPTicketProps) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('TicketDetails', {
                ticketId: 'Abcabc'
            })}
            style={styles.container}
        >
            <View style={styles.image}>
            </View>
            <View style={styles.rest}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Highway to heayasdasdasydven</Text>
                </View>
                <View style={styles.venueTimeContainer}>
                    <Text style={styles.venueTime}>Room: 512</Text>
                    <Text style={styles.venueTime}>8th Oct</Text>
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
        height: hp(14),
        width: hp(14),
        backgroundColor: colors.perfestPrimary,
        borderRadius: 24,
    },
    rest: {
        height: hp(11),
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
        fontSize: hp(2.6),
    },
    venueTime: {
        fontSize: hp(1.9)
    },
})

export default PTicket;