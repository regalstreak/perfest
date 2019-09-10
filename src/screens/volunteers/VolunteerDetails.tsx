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
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    const [vol, setVolunteer] = useState<VolunteerType>({ _id: '', name: '', contact: { email: '', phone: '' }, college: { name: '', department: '', year: '' }, events: [''], sold: { ticket: [''], amountCollected: 0 } });
    const [assignedEvents, setAssignedEvents] = useState<any>(null);
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
    }, [token]);

    let eventsAssigned: any = null;
    useEffect(() => {
        let isMounted = true;
        if (vol.name) {
            eventsAssigned = vol.events.map(eventId => {
                let event = eventData.find(oneEvent => {
                    return oneEvent.meta._id === eventId
                });
                console.log(event);
                if (event) return (<Text key={event.meta._id}>{event}</Text>);
                return null;
            });
            if (isMounted) {
                setAssignedEvents(eventsAssigned);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [vol.name]);
    let volPhone = <Text>''</Text>;
    if (vol.contact.phone) {
        volPhone = <Text>Phone No.: {vol.contact.phone}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text>Name: {vol.name}</Text>
                {/* {assignedEvents} */}
                <Text>Email: {vol.contact.email}</Text>
                {volPhone}
                <Text>College Name: {vol.college.name}</Text>
                <Text>Department: {vol.college.department}</Text>
                <Text>Year: {vol.college.year}</Text>
                <Text>Tickets Sold: {vol.sold.ticket.length}</Text>
                <Text>Amount Collected: {vol.sold.amountCollected}</Text>
                <Text>Events Assigned: </Text>

                <KeyboardAvoidingView>
                    <PSearchDropdown
                        style={styles.volDetailViews}
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
                        style={styles.volDetailViews}
                        text='Assign'
                        onPress={() => onSubmit(selectedEventId, volId, token)}
                    />
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
    }
})
