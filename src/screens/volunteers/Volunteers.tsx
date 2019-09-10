import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import { useSelector } from 'react-redux';
import PTextInput from '../../library/components/PTextInput';
import PTicketVol from '../../library/components/PTicketVol';
import PButton from '../../library/components/PButton';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUserVolList } from '../../library/networking/API/userAPI';
import { getAllEventsDropdown } from '../../library/networking/API/eventAPI';
import { AppState } from '../../store/rootReducer';
import { connect } from 'react-redux';

interface IVolunteersProps extends INavigation {
    token: string
}

const Volunteers = (props: IVolunteersProps) => {
    const userType = useSelector((state: any) => state.auth.userType);
    const [searchVol, setSearchVol] = useState<string>('');
    const [events, setEvents] = useState<any>('');
    const [volunteers, setVolunteers] = useState<any>('');
    let { token } = props;
    useEffect(() => {
        if (token) {
            let isMounted = true;
            getUserVolList('volunteer', token)
                .then(res => {
                    if (res.success) {
                        if (isMounted) {
                            console.log(res.list);
                            setVolunteers(res.list);
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
                    console.log(newEventData);
                    if (isMounted) {
                        setEvents(newEventData);
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
    if (userType === 'admin') {
        return (
            <View style={styles.container}>

                <PTextInput
                    placeholder='Search'
                    onChangeText={(text: string) => {
                        setSearchVol(text)
                    }}
                />
                <ScrollView style={styles.container}>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <PTicketVol
                                key={index}
                                navigation={props.navigation}
                                title={item + ' Name'}
                                bottomLeft={JSON.stringify(item)}
                                bottomRight={JSON.stringify(item) + ' right'}
                            />
                        ))
                    }
                </ScrollView>

                <PButton
                    style={styles.addButtonContainer}
                    text='Add Volunteer'
                    onPress={() => {
                        props.navigation.navigate('AddVolunteerModal')
                    }}
                />


                <PBottomNav index={2} navigation={props.navigation} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}></View>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Volunteers);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        marginBottom: hp(8) + 12,
    },
})
