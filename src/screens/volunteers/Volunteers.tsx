import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import { useSelector } from 'react-redux';
import PTextInput from '../../library/components/PTextInput';
import PMainListItem from '../../library/components/PMainListItem';
import PButton from '../../library/components/PButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getUserVolList, UserTypeMin } from '../../library/networking/API/userAPI';
import { getAllEventsDropdown } from '../../library/networking/API/eventAPI';
import { textStyles } from '../../library/res/styles';

interface IVolunteersProps extends INavigation {
}

const Volunteers = (props: IVolunteersProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchVol, setSearchVol] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [events, setEvents] = useState<any>('');
    const [volunteers, setVolunteers] = useState<UserTypeMin[]>();

    const userType = useSelector((state: any) => state.auth.userType);
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        if (token) {
            let isMounted = true;
            getUserVolList('volunteer', token)
                .then(res => {
                    if (res.success) {
                        if (isMounted) {
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
                <Text style={textStyles.headerText}>Volunteers</Text>
                <View style={styles.main}>

                    <PTextInput
                        style={{ marginVertical: 16 }}
                        placeholder='Search'
                        onChangeText={(text: string) => {
                            setSearchVol(text)
                        }}
                    />
                    <ScrollView >
                        {volunteers ?
                            volunteers.map((item: { _id: string, name: string }, index: number) => (
                                <PMainListItem
                                    type='volunteer'
                                    navigId={item._id}
                                    key={index}
                                    navigation={props.navigation}
                                    title={item.name}
                                />
                            )) : <View></View>
                        }
                    </ScrollView>
                </View>

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

export default Volunteers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        marginLeft: hp(3),
    },
    addButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        marginBottom: hp(8) + 12,
    },
})
