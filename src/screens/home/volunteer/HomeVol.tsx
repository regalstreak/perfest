import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, View, FlatList } from 'react-native';

import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PButton from '../../../library/components/PButton';
import PSearchDropdown from '../../../library/components/PSearchDropdown';
import { validateTicketIssue } from '../../../library/utils/utils';
import { issueTicket } from '../../../library/networking/API/ticketAPI';
import { getAllEventsDropdown } from '../../../library/networking/API/eventAPI';
import { getFormattedDateAndTime } from '../../../library/utils/utils'

import { connect } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { getLogs } from '../../../library/networking/API/userAPI';
import { textStyles } from '../../../library/res/styles';

interface IHomeVolProps {
    token: string;
}

interface EventType {
    name: string;
    meta: any;
}

interface LogType {
    vname: string,
    price: number,
    ename: string,
    date: string
}

const HomeVol = (props: IHomeVolProps) => {
    const [email, setEmail] = useState('');
    // const [paid, setPaid] = useState(0);
    const [eventId, setEventId] = useState('');
    const [price, setPrice] = useState(0);
    const [participantNo, setParticipantNo] = useState(1);
    const [eventName, setEventName] = useState('');
    const { token } = props;

    let defaultData = [{ name: 'Loading...', meta: { _id: '', cost_1: 0, cost_2: 0, cost_4: 0 } }];
    let [logsData, setLogData] = useState<LogType[]>([
        { vname: '', price: 0, ename: '', date: '' }
    ]);
    let [totalSold, setTotalSold] = useState(0);
    let [totalCollected, setTotalCollected] = useState(0);
    const [eventData, setEventData] = useState<EventType[]>(defaultData);

    useEffect(() => {

        let isMounted = true;

        getAllEventsDropdown()
            .then(res => {
                if (res.success) {
                    let eventList = res.eventList;
                    let newEventData = eventList.map(event => {
                        return {
                            name: event.name,
                            meta: {
                                _id: event._id,
                                cost_1: event.cost_1,
                                cost_2: event.cost_2,
                                cost_4: event.cost_4
                            }
                        }
                    });
                    if (isMounted) {
                        setEventData(newEventData);
                    }
                } else {
                    console.log(res.error);
                }
            })
            .catch(console.log)


        return () => {
            // cleanup
            isMounted = false;
        }

    }, []);

    useEffect(() => {

        let isMounted = true;

        // Make page number dynamic
        getLogs(1, token)
            .then(res => {
                if (res.success) {
                    if (isMounted) {
                        setTotalSold(res.totalSold);
                        setTotalCollected(res.totalCollected);
                        setLogData(res.logList);
                    }
                } else {
                    console.log(res.error);
                }
            })
            .catch(console.log);


        return () => {
            // cleanup
            isMounted = false;
        }

    }, [token]);



    const onIssueTicketClicked = async () => {
        if (validateTicketIssue(email, eventId, price, price, participantNo)) {
            let res = await issueTicket(email, eventId, price, price, participantNo, token)
            if (res.success) {
                // Succesfully issued ticket
                console.log('Succesfully issued ticket');

                // get latest logs
                getLogs(1, token)
                    .then(res => {
                        if (res.success) {
                            setTotalSold(res.totalSold);
                            setTotalCollected(res.totalCollected);
                            setLogData(res.logList);
                        } else {
                            console.log(res.error);
                        }
                    })
                    .catch(console.log);
            } else {
                console.log(res.error);
            }
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
                        let displayDate: string = '';
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
        </ScrollView>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(HomeVol);

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
