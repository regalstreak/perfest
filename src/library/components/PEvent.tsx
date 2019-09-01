import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';


interface IPEventProps {

}

export default (props: IPEventProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
            </View>
            <View style={styles.rest}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Highway to heaven</Text>
                </View>
                <View style={styles.venueTimeContainer}>
                    <Text style={styles.venueTime}>Room: 512</Text>
                    <Text style={styles.venueTime}>8th Oct</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(23),
        alignItems: 'center',
        padding: hp(3),
        flexDirection: 'row'
    },
    image: {
        height: hp(18),
        width: hp(18),
        backgroundColor: colors.perfestPrimary,
        borderRadius: 20,
    },
    rest: {
        height: hp(15),
        flex: 1,
        margin: 24,
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
