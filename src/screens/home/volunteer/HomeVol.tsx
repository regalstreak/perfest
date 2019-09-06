import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, ScrollView, } from 'react-native';

import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PButton from '../../../library/components/PButton';
import PSearchDropdown from '../../../library/components/PSearchDropdown';
import { validateTicketIssue } from '../../../library/utils/utils';
import { issueTicket } from '../../../library/networking/API/ticketAPI';
import { getAllEventsDropdown } from '../../../library/networking/API/eventAPI';

import { connect } from 'react-redux';
import { ReducerState } from '../../../store/reducer';

interface IHomeVolProps {
    token: string;
}

const onSubmit = async (email: string, event_id: string, price: number, paid: number, participantNo: number, token: string) => {
    if (validateTicketIssue(email, event_id, price, paid, participantNo)) {
        let res = await issueTicket(email, event_id, price, paid, participantNo, token)
        if (res.success) {
            // Succesfully issued ticket
            console.log('Succesfully issued ticket');
        } else {
            console.log(res.error);
        }
    } else {
        // Handle Error
        console.log('Fill all fields');
    }
}

interface EventType {
    name: string;
    meta: any;
}

const HomeVol = (props: IHomeVolProps) => {
    const [email, setEmail] = useState('');
    const [paid, setPaid] = useState(0);
    const [eventId, setEventId] = useState('');
    const [price, setPrice] = useState(0);
    const [participantNo, setParticipantNo] = useState(1);
    const [eventName, setEventName] = useState('');
    const { token } = props;
    let defaultData = [{ name: 'Loading...', meta: { _id: '', cost_1: 0, cost_2: 0, cost_4: 0 } }];
    const [eventData, setEventData] = useState<EventType[]>(defaultData);
    useEffect(() => {
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
                    setEventData(newEventData);
                } else {
                    console.log(res.error);
                }
            })
            .catch(console.log)
    }, []);
    return (
        <ScrollView style={styles.container}>
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
                            let price = event.meta[`cost_${participantNo.toString()}`];
                            setPrice(price);
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
                            let price = event.meta[`cost_${participantNo.toString()}`];
                            setPrice(price);
                        } else {
                            setPrice(0);
                        }
                    }}
                />
                <PTextInput
                    style={styles.issueTicketTextViews}
                    placeholder="To be paid"
                    onChangeText={(text: string) => {
                        setPaid(parseInt(text));
                    }}
                    value={price}
                    editable={false}
                    default={'0'}
                />
                <PButton
                    style={styles.issueTicketTextViews}
                    text='Issue Ticket'
                    onPress={() => onSubmit(email, eventId, price, paid, participantNo, token)}
                />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const mapStateToProps = (state: ReducerState) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(HomeVol);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    issueTicketContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    issueTicketTextViews: {
        margin: wp(2.6),
    }
});
