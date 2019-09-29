import React, { useEffect, useState } from 'react';
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
import { getExcelLogs, getUserDetails } from '../../..//library/networking/API/userAPI';
import PButton from '../../../library/components/PButton';
import LogType from '../../../library/interfaces/LogType';
import { getLogs } from '../../../library/networking/API/userAPI';
import LogRocket from 'logrocket';


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
    let logs = useSelector((state: AppState) => (state.logs.logList));
    let totalSold = useSelector((state: AppState) => (state.logs.totalSold));
    let totalCollected = useSelector((state: AppState) => (state.logs.totalCollected));
    let totalBalance = useSelector((state: AppState) => (state.logs.totalBalance));
    let eventData: ShortEventType[];
    let allPendingRequests = useSelector((state: any) => (state.offline.outbox));
    const events = useSelector((state: AppState) => (state.events.eventList));
    const [page, setPage] = useState(2);
    let [logsData, setLogsData] = useState<LogType[] | null>(null);
    let [additionalLogs, setAdditionalLogs] = useState<LogType[] | null>(null);
    const [disableButton, setDisableButton] = useState(false);

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

    useEffect(() => {
        if (logs && additionalLogs) {
            setLogsData([...logs, ...additionalLogs]);
        } else if (logs) {
            setLogsData(logs);
        }
    }, [logs, additionalLogs])

    useEffect(() => {
        getUserDetails(token).then((res) => {
            LogRocket.identify(res.user._id, {
                name: res.user.name,
                email: res.user.contact.email,
                userType: userType
            });
        })
    }, [token, userType])

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
            paid: data.payload.paid,
            phone: data.payload.phone,
            csi_member: data.payload.csi_member,
            college: data.payload.college
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

    let viewMoreButton;
    if (userType === 'admin') {
        viewMoreButton = (<PButton
            style={styles.logsContainer}
            text={'View More'}
            width={wp(86)}
            disable={disableButton}
            onPress={async () => {
                setDisableButton(true);
                let pageNo = page;
                let res = await getLogs(page, token);
                if (res.success && res.logList && additionalLogs) {
                    setAdditionalLogs([...additionalLogs, ...res.logList]);
                } else if (res.success && res.logList) {
                    setAdditionalLogs(res.logList);
                } else {
                    // Handle Error
                }
                console.log(pageNo);
                setPage(pageNo + 1);
                setDisableButton(false);
            }}
        />)
    }

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

            {autoRetryTickets.length > 0 ?
                <View>
                    <Text style={textStyles.subHeaderText}>Auto-Retrying tickets</Text>
                    <View style={styles.logsContainer}>
                        <FlatList
                            data={autoRetryTickets}
                            renderItem={({ item, index }) => {
                                let eventName: string = '';
                                let event = eventData.find(event => {
                                    return event.meta._id === item.event_id
                                });
                                if (event) eventName = event.name;
                                return (
                                    <View style={styles.textViews}>
                                        {/* <Text>{'Ticket for ' + item.email + ' of event ' + eventName + ' failed'}</Text> */}

                                        <PLogs
                                            issuer={item.email}
                                            buyer={item.phone.toString()}
                                            index={autoRetryTickets.length - index}
                                            event={eventName}
                                            price={item.paid}
                                            userType={userType}
                                            token={token}
                                            refreshLogs={refreshLogs}
                                            date={item.college.name}
                                            time={item.participantNo.toString()}
                                            notDeletable
                                        />

                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                : null}

            {failedTickets.length > 0 ?

                <View>
                    <Text style={textStyles.subHeaderText}>Failed Tickets</Text>
                    <View style={styles.logsContainer}>
                        <FlatList
                            data={failedTickets}
                            renderItem={({ item, index }) => {
                                // eslint-disable-next-line
                                let currentEventName: string = '';
                                let event = eventData.find(event => {
                                    return event.meta._id === item.event_id
                                });
                                if (event) currentEventName = event.name;
                                return (
                                    <View style={styles.textViews}>
                                        {/* <Text>{'Ticket for ' + item.email + ' of event ' + event + ' failed'}</Text> */}
                                        <PLogs
                                            issuer={item.email}
                                            buyer={item.phone.toString()}
                                            index={failedTickets.length - index}
                                            event={currentEventName}
                                            price={item.paid}
                                            userType={userType}
                                            token={token}
                                            refreshLogs={refreshLogs}
                                            date={item.college.name}
                                            time={item.participantNo.toString()}
                                            notDeletable
                                        />
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
                </View> : null}

            <View style={styles.logHeader}>
                <Text style={styles.subHeaderText}>
                    Logs
            </Text>
                <TouchableOpacity
                    onPress={() => {
                        setAdditionalLogs(null);
                        refreshLogs(token, dispatch);
                        setPage(2);
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

            {viewMoreButton}

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
