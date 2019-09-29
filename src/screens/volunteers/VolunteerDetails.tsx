import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import PBottomNav from '../../library/components/PBottomNav';
import { getAllEventsDropdown } from '../../library/networking/API/eventAPI';
import { assignEvent, getVolunteerDetails } from '../../library/networking/API/volunteerAPI';
import PButton from '../../library/components/PButton';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import PSearchDropdown from '../../library/components/PSearchDropdown';
import { VolunteerType } from '../../library/interfaces/VolunteerType';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import PTextInput from '../../library/components/PTextInput';
import { updateAdminBalance } from '../../library/networking/API/userAPI';

interface IVolunteerDetailsProps extends INavigation {
    token: string;
}

interface EventType {
    name: string;
    meta: any;
}

const onSubmit = async (eventId: string, volunteerId: string, token: string) => {
    let res = await assignEvent(eventId, volunteerId, token);
    if (res.success) {
        console.log('successfully assigned event');
        
    } else {
        console.log(res.error);
    }
}

const VolunteerDetails = (props: IVolunteerDetailsProps) => {
    const volId = props.navigation.getParam('volunteerId');
    const [eventData, setEventData] = useState<EventType[]>([{ name: 'Loading...', meta: { _id: '' } }]);
    const [selectedEventId, setSelectedEventId] = useState<string>('');
    const [vol, setVolunteer] = useState<VolunteerType>({ _id: '', name: '', contact: { email: '', phone: '' }, college: { name: '', department: '', year: '' }, events: [''], sold: { ticket: [''], amountCollected: 0 }, adminBalance: 0 });

    const [adminBalanceVol, setAdminBalanceVol] = useState<string>('');

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [assignedEvents, setAssignedEvents] = useState<any[]>([]);
    let { token } = props;

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
                                _id: event._id
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
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        if (token) {
            let isMounted = true;
            getVolunteerDetails(volId, token)
                .then(res => {
                    console.log(res);
                    if (res.success) {
                        let { volunteer } = res;
                        if (isMounted) {
                            setVolunteer(volunteer);
                            setAdminBalanceVol(res.volunteer.adminBalance.toString())
                        }
                    } else {
                        console.log(res.error);
                    }
                })
                .catch(console.log)
            return () => {
                isMounted = false;
            }
        }
    }, [token, volId]);

    useEffect(() => {
        let isMounted = true;
        let eventsAssigned: any[] = [];
        if (vol.name) {
            vol.events.map(eventId => {
                let event = eventData.find(oneEvent => {
                    return oneEvent.meta._id === eventId
                });
                eventsAssigned.push(event);

                return null;
            });
            if (isMounted) {
                setAssignedEvents(eventsAssigned);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [vol.name, eventData, vol.events]);


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text>Name: {vol.name}</Text>
                <Text>Email: {vol.contact.email}</Text>
                <Text>Phone: {vol.contact.phone}</Text>
                {/* <Text>College Name: {vol.college.name}</Text>
                <Text>Department: {vol.college.department}</Text>
                <Text>Year: {vol.college.year}</Text> */}
                <Text>Tickets Sold: {vol.sold.ticket.length}</Text>
                <Text>Amount Collected: {vol.sold.amountCollected}</Text>
                <Text>Admin Balance: {vol.adminBalance}</Text>
                <Text>Events Assigned: {
                    assignedEvents.map((event, index) => {
                        if (index === assignedEvents.length - 1) {
                            return event.name + '. '
                        } else {
                            return event.name + ', '
                        }
                    })
                }</Text>

                <KeyboardAvoidingView>


                    <View style={{ marginVertical: 60 }}>
                        <PTextInput
                            style={styles.volTextViews}
                            placeholder='Admin Balance'
                            default={adminBalanceVol}
                            value={adminBalanceVol}
                            type='numeric'
                            onChangeText={(text: string) => {
                                setAdminBalanceVol(text);
                            }}
                        />

                        <PButton text='Update Admin Balance'
                            width={widthPercentageToDP(86)}
                            onPress={() => {
                                updateAdminBalance(token, parseInt(adminBalanceVol), volId)
                                getVolunteerDetails(volId, token)
                                    .then(res => {
                                        console.log(res);
                                        if (res.success) {
                                            let { volunteer } = res;
                                            setVolunteer(volunteer);
                                        } else {
                                            console.log(res.error);
                                        }
                                    })
                                    .catch(console.log)
                            }}
                        />

                    </View>

                    <View>

                        <PSearchDropdown
                            style={styles.volTextViews}
                            placeholder='Events'
                            data={eventData}
                            onChangeSelection={(text: string) => {
                                let event = eventData.find(event => {
                                    return event.name === text
                                });
                                if (event) {
                                    setSelectedEventId(event.meta._id);
                                }
                            }}
                        />
                        <PButton
                            width={widthPercentageToDP(86)}
                            text='Assign'
                            onPress={() => onSubmit(selectedEventId, volId, token)}
                        />
                    </View>

                </KeyboardAvoidingView>
            </View>
            <PBottomNav navigation={props.navigation} index={2} />
        </View>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(VolunteerDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        margin: hp(4)
    },
    volDetailViews: {
        marginTop: hp(5)
    },
    volTextViews: {
        marginVertical: hp(2)
    }
})
