import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { deleteTicket } from '../networking/API/ticketAPI';
import { useDispatch } from 'react-redux';


interface IPLogsProps {
    id: string;
    index: number;
    issuer: string;
    event: string;
    price: string | number;
    buyer: string;
    date: string | undefined;
    time: string | undefined;
    userType: string | undefined;
    token: string;
    refreshLogs: (token: string, dispatch: any) => void;
}

export default (props: IPLogsProps) => {
    let { token, userType, id } = props;
    const dispatch = useDispatch();
    let deleteIcon;
    if (token && userType === 'admin') {
        deleteIcon = (
            <TouchableOpacity
                onPress={async () => {
                    let res = await deleteTicket(id, token);
                    if (res.success) {
                        props.refreshLogs(token, dispatch);
                    } else {
                        //Handle error
                    }
                }}
                style={styles.deleteButton}
            >
                <FeatherIcon
                    name={'delete'}
                    size={20}
                    color={'red'}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.issuerText}>{props.index}) {props.issuer}</Text>
                <Text style={styles.issuerText}>{props.price}₹</Text>
            </View>
            <View>
                <Text style={styles.buyerText} >
                    {props.buyer}
                    {deleteIcon}
                </Text>
            </View>
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
    },
    deleteButton: {
        marginLeft: hp(1)
    }
})
