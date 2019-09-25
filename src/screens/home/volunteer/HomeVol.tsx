import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFormattedDateAndTime } from '../../../library/utils/utils'

import { Dispatch } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { ADD_TICKET, REMOVE_FAILED_TICKET } from '../../../store/actions/ActionNames';
import { textStyles } from '../../../library/res/styles';
import PendingTicketsType from '../../../library/interfaces/PendingTicketsType';
import { getLatestLogs, getLatestEvents, tryIssueTicket } from '../../../store/actions/actions';
import PLogs from '../../../library/components/PLogs';
import IssueTicket from './IssueTicket';
import EventType from '../../../library/interfaces/EventType';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../../../library/res/colors';
import { getExcelLogs } from '../../..//library/networking/API/userAPI';


interface IHomeVolProps {
    removeFailedTicket: (ticket: PendingTicketsType) => {
        type: string;
        ticket: PendingTicketsType;
    }
}

interface ShortEventType {
    name: string;
    meta: any;
}

const refreshLogs = (token: string, dispatch: any) => {
    dispatch(getLatestLogs(token));
}


const HomeVol = (props: IHomeVolProps) => {


    const dispatch = useDispatch();

    const token = useSelector((state: AppState) => (state.auth.token));
    const userType = useSelector((state: AppState) => (state.auth.userType));
    let logsData = useSelector((state: AppState) => (state.logs.logList));
    let totalSold = useSelector((state: AppState) => (state.logs.totalSold));
    let totalCollected = useSelector((state: AppState) => (state.logs.totalCollected));
    let totalBalance = useSelector((state: AppState) => (state.logs.totalBalance));
    let eventData: ShortEventType[];
    let allPendingRequests = useSelector((state: any) => (state.offline.outbox));
    const events = useSelector((state: AppState) => (state.events.eventList));


    if (events) {
        eventData = events.map((event: EventType) => {
            return {
                name: event.name,
                meta: {
                    _id: event._id,
                    cost_CSI: event.cost_CSI,
                    cost_nonCSI: event.cost_nonCSI,
                }
            }
        })
    } else {
        eventData = [{ name: 'Loading...', meta: { _id: '', cost_CSI: { cost_1: 0 }, cost_nonCSI: { cost_1: 0 } } }];
    }


    let autoRetryTickets: any[] = allPendingRequests.filter((request: any) => {
        return request.type === ADD_TICKET
    });
    autoRetryTickets = autoRetryTickets.map((data: any) => {
        return {
            email: data.payload.email,
            event_id: data.payload.event_id,
            price: data.payload.price,
            participantNo: data.payload.participantNo,
            token: data.payload.token,
            paid: data.payload.paid
        }
    });
    let failedTickets: PendingTicketsType[] = useSelector((state: AppState) => (state.ticket.pendingTickets));

    let downloadLogs: any;
    if (userType === 'admin') {
        downloadLogs = (
            <TouchableOpacity
                onPress={async () => {
                    await getExcelLogs(token);
                }}
                style={styles.refreshButton}
            >
                <View style={styles.refreshView}>
                    <FeatherIcon
                        name={'download'}
                        size={24}
                        color={colors.perfestPrimary} />
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        dispatch(getLatestLogs(token));
        dispatch(getLatestEvents());
    }, [dispatch, token])

    return (
        <ScrollView style={styles.container}>
            <Text style={textStyles.headerText}>Home</Text>

            <IssueTicket />

            <Text style={textStyles.subHeaderText}>Total</Text>
            <View style={styles.total}>
                <Text style={styles.totalText}>Sold: <Text style={{ fontWeight: '500' }}>{totalSold}</Text> tickets</Text>
                <Text style={styles.totalText}>Collected: <Text style={{ fontWeight: '500' }}>{totalCollected}</Text>₹</Text>
                <Text style={styles.totalText}>Balance: <Text style={{ fontWeight: '500' }}>{totalBalance}</Text>₹</Text>
            </View>

            <Text style={textStyles.subHeaderText}>Pending Tickets</Text>
            <View style={styles.logsContainer}>
                <Text>Auto-Retrying</Text>
                <FlatList
                    data={autoRetryTickets}
                    renderItem={({ item }) => {
                        let eventName: string = '';
                        let event = eventData.find(event => {
                            return event.meta._id === item.event_id
                        });
                        if (event) eventName = event.name;
                        return (
                            <View style={styles.textViews}>
                                <Text>{'Ticket for ' + item.email + ' of event ' + eventName + ' failed'}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.logsContainer}>
                <Text>Failed Tickets</Text>
                <FlatList
                    data={failedTickets}
                    renderItem={({ item }) => {
                        console.log(item);
                        // eslint-disable-next-line
                        let currentEventName: string = '';
                        let event = eventData.find(event => {
                            return event.meta._id === item.event_id
                        });
                        if (event) currentEventName = event.name;
                        return (
                            <View style={styles.textViews}>
                                <Text>{'Ticket for ' + item.email + ' of event ' + event + ' failed'}</Text>
                                <Button title="Retry" onPress={() => {
                                    let payload = {
                                        name: item.name,
                                        phone: item.phone,
                                        email: item.email,
                                        event_id: item.event_id,
                                        price: item.price,
                                        paid: item.paid,
                                        participantNo: item.participantNo,
                                        college: item.college,
                                        csi_member: item.csi_member,
                                        token: item.token
                                    }

                                    dispatch(tryIssueTicket(payload));
                                    props.removeFailedTicket(item);
                                }} />
                                <Button title="Delete" onPress={() => { props.removeFailedTicket(item) }} />
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.logHeader}>
                <Text style={styles.subHeaderText}>
                    Logs
            </Text>
                <TouchableOpacity
                    onPress={() => {
                        refreshLogs(token, dispatch);
                    }}
                    style={styles.refreshButton}
                >
                    <View style={styles.refreshView}>
                        <FeatherIcon
                            name={'rotate-ccw'}
                            size={24}
                            color={colors.perfestGrey} />
                    </View>
                </TouchableOpacity>
                {downloadLogs}
            </View>
            <View style={styles.logsContainer}>

                <FlatList
                    data={logsData}
                    renderItem={({ item, index }) => {
                        if (item) {
                            let date, time;
                            if (item.date) {
                                [date, time] = getFormattedDateAndTime(item.date);
                            }
                            return (
                                <View style={styles.textViews}>
                                    <PLogs
                                    index={totalSold - index}
                                        id={item._id}
                                        issuer={item.vname}
                                        event={item.ename}
                                        price={item.paid}
                                        buyer={item.uemail}
                                        date={date}
                                        time={time}
                                        userType={userType}
                                        token={token}
                                        refreshLogs={refreshLogs}
                                    />
                                </View>
                            )
                        } else {
                            return null;
                        }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeFailedTicket: (ticket: PendingTicketsType) => dispatch({ type: REMOVE_FAILED_TICKET, ticket })
    }
}

export default connect(null, mapDispatchToProps)(HomeVol);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textViews: {
        marginVertical: wp(2.6),
    },
    logsTextViews: {
        marginVertical: wp(2),
    },
    logsContainer: {
        marginHorizontal: hp(3.5),
    },
    total: {
        marginHorizontal: hp(3.5),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    totalText: {
        marginVertical: wp(2),
        fontSize: hp(2.7),

    },
    textHolders: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    refreshButton: {},
    refreshView: {
        // marginHorizontal: hp(2.5),
        // marginTop: hp(2.6)
    },
    logHeader: {
        marginHorizontal: hp(3.5),
        marginTop: hp(2.6),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subHeaderText: {
        fontSize: hp(3.2),
        fontWeight: '600',
    },
});
