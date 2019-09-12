import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, View, FlatList } from 'react-native';

import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PButton from '../../../library/components/PButton';
import PSearchDropdown from '../../../library/components/PSearchDropdown';
import { validateTicketIssue } from '../../../library/utils/utils';
import { getFormattedDateAndTime } from '../../../library/utils/utils'
import constants from '../../../library/networking/constants';
import EventType from '../../../library/interfaces/EventType';

import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { ADD_TICKET, ADD_TICKET_SUCCESS, ADD_TICKET_FAILED } from '../../../store/actions';
import { textStyles } from '../../../library/res/styles';

interface IHomeVolProps {
    tryIssueTicket: any;
}

interface ShortEventType {
    name: string;
    meta: any;
}

const tryIssueTicket = (email: string, event_id: string, price: number, paid: number, participantNo: number, token: string) => ({
    type: ADD_TICKET,
    payload: { email, event_id, price, paid, participantNo, token },
    meta: {
        offline: {
            effect: { url: constants.BASE_URL + '/ticket/issue', method: 'POST', json: { email, event_id, price, paid, participantNo, token } },
            commit: { type: ADD_TICKET_SUCCESS, meta: { email, event_id, price, paid, participantNo, token } },
            rollback: { type: ADD_TICKET_FAILED, meta: { email, event_id, price, paid, participantNo, token } }
        }
    }
});

const HomeVol = (props: IHomeVolProps) => {
    const [email, setEmail] = useState('');
    // const [paid, setPaid] = useState(0);
    const [eventId, setEventId] = useState('');
    const [price, setPrice] = useState(0);
    const [participantNo, setParticipantNo] = useState(1);
    const [eventName, setEventName] = useState('');
    const token = useSelector((state: AppState) => (state.auth.token));
    let logsData = useSelector((state: AppState) => (state.logs.logList))
    let totalSold = useSelector((state: AppState) => (state.logs.totalSold));
    let totalCollected = useSelector((state: AppState) => (state.logs.totalCollected))
    let eventData: ShortEventType[];
    let allPendingRequests = useSelector((state: any) => (state.offline.outbox));
    let autoRetryTickets = allPendingRequests.filter((request: any) => {
        return request.type === ADD_TICKET
    });
    let failedTickets = useSelector((state: AppState) => (state.ticket.pendingTickets));
    let pendingTicketData = [...autoRetryTickets, ...failedTickets];
    const events = useSelector((state: AppState) => (state.events.eventList));
    if (events) {
        eventData = events.map(event => {
            return {
                name: event.name,
                meta: {
                    _id: event._id,
                    cost_1: event.cost_1,
                    cost_2: event.cost_2,
                    cost_4: event.cost_4
                }
            }
        })
    } else {
        eventData = [{ name: 'Loading...', meta: { _id: '', cost_1: 0, cost_2: 0, cost_4: 0 } }];
    }

    const onIssueTicketClicked = async () => {
        if (validateTicketIssue(email, eventId, price, price, participantNo)) {
            props.tryIssueTicket(email, eventId, price, price, participantNo, token);
        } else {
            // Handle Error
            console.log('Fill all fields');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={textStyles.headerText}>Home</Text>
            <KeyboardAvoidingView style={styles.issueTicketContainer} enabled>

                <PTextInput
                    style={styles.issueTicketTextViews}
                    placeholder="Email"
                    onChangeText={(text: string) => {
                        setEmail(text);
                    }}
                />

                <PSearchDropdown
                    style={styles.issueTicketTextViews}
                    placeholder='Events'
                    data={eventData}
                    onChangeSelection={(text: string) => {
                        let event = eventData.find(event => {
                            return event.name === text
                        });
                        if (event) {
                            setEventId(event.meta._id);
                            let priceLocal = event.meta[`cost_${participantNo.toString()}`];
                            setPrice(priceLocal);
                        }
                        setEventName(text);
                    }}
                />
                <PSearchDropdown
                    style={styles.issueTicketTextViews}
                    placeholder='Number of Participants'
                    data={[
                        { name: '1', meta: '1' },
                        { name: '2', meta: '2' },
                        { name: '4', meta: '4' }
                    ]}
                    default='1'
                    editable={false}
                    onChangeSelection={(text: string) => {
                        setParticipantNo(parseInt(text));
                        let event = eventData.find(event => {
                            return event.name === eventName
                        });
                        if (event) {
                            let priceLocal = event.meta[`cost_${parseInt(text).toString()}`];
                            setPrice(priceLocal);
                        } else {
                            setPrice(0);
                        }
                    }}
                />
                <PTextInput
                    style={styles.issueTicketTextViews}
                    placeholder="Paid"
                    value={price}
                    editable={false}
                    default={'0'}
                />
                <PButton
                    style={[styles.issueTicketTextViews, styles.issueTicketButton]}
                    text='Issue Ticket'
                    onPress={() => onIssueTicketClicked()}
                />
            </KeyboardAvoidingView>

            <Text style={textStyles.subHeaderText}>Logs</Text>
            <View style={styles.logsContainer}>
                <Text style={styles.logsTextViews}>Total Sold: {totalSold}</Text>
                <Text style={styles.logsTextViews}>Total Collected: {totalCollected}</Text>
                <FlatList
                    data={logsData}
                    renderItem={log => {
                        let date, time;
                        if (log.item.date) {
                            [date, time] = getFormattedDateAndTime(log.item.date);
                        }
                        return (
                            <View style={styles.issueTicketTextViews}>
                                <Text>{log.item.vname + ' sold 1 ticket of event ' + log.item.ename + ' worth ' + log.item.price + '₹' + ' on ' + date + ' at ' + time}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <Text style={textStyles.subHeaderText}>Pending Tickets</Text>
            <View style={styles.logsContainer}>
                <FlatList
                    data={pendingTicketData}
                    renderItem={ticket => {
                        let eventName: string = '';
                        let event = eventData.find(event => {
                            return event.meta._id === ticket.item.event_id
                        });
                        if (event) eventName = event.name;
                        return (
                            <View style={styles.issueTicketTextViews}>
                                <Text>{'Ticket for ' + ticket.item.email + ' of event ' + eventName + ' failed'}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        tryIssueTicket: (email: string, event_id: string, price: number, paid: number, participantNo: number, token: string) => dispatch(tryIssueTicket(email, event_id, price, paid, participantNo, token))
    }
}

export default connect(null, mapDispatchToProps)(HomeVol);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    issueTicketContainer: {
        marginHorizontal: hp(3.5),
    },
    issueTicketTextViews: {
        marginVertical: wp(2.6),
    },
    issueTicketButton: {
        alignSelf: 'flex-start'
    },
    logsTextViews: {
        marginVertical: wp(2),
    },
    logsContainer: {
        marginHorizontal: hp(3.5),
    }
});
