import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';


interface IPLogsProps {
    index: number;
    issuer: string;
    event: string;
    price: string | number;
    buyer: string;
    date: string | undefined;
    time: string | undefined;
}

export default (props: IPLogsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.issuerText}>{props.index}) {props.issuer}</Text>
                <Text style={styles.issuerText}>{props.price}₹</Text>
            </View>
            <Text style={styles.buyerText} >{props.buyer}</Text>

            <View style={[styles.mainContainer, styles.lastChild]}>
                <Text style={styles.eventText}>{props.event}</Text>
                <Text style={styles.eventText}>{props.date} | {props.time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: colors.perfestGrey
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    issuerText: {
        fontSize: hp(2.7),
        fontWeight: '500'
    },
    eventText: {
        fontSize: hp(2),
    },
    buyerText: {
        fontSize: hp(2.4),
        marginVertical: 4
    },
    lastChild: {
        marginBottom: 8
    }
})
