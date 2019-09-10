import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import { getEvent } from '../../library/networking/API/eventAPI';
import PBottomNav from '../../library/components/PBottomNav';

interface IEventDetailsProps extends INavigation {
}

export default (props: IEventDetailsProps) => {
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [date, setDate] = useState('');
    let [cost_1, setCost_1] = useState(0);
    let [cost_2, setCost_2] = useState(0);
    let [cost_4, setCost_4] = useState(0);
    let [image, setImage] = useState('');
    let [venue, setVenue] = useState('');
    useEffect(() => {
        let isMounted = true;
        getEvent(props.navigation.getParam('name'))
            .then(res => {
                if (res.success) {
                    let event = res.event;
                    console.log(res);
                    if (isMounted) {
                        setName(event.name);
                        setDescription(event.description);
                        let ISODate = new Date(event.date);
                        let displayDate: string = ISODate.getDate().toString() + ' ' + ISODate.toLocaleString('default', { month: 'short' }) + ', ' + ISODate.getFullYear().toString();;
                        setDate(displayDate);
                        setCost_1(event.cost_1);
                        if (event.cost_2) setCost_2(event.cost_2);
                        if (event.cost_4) setCost_4(event.cost_4);
                        setImage(event.image);
                        setVenue(event.venue);
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
    let cost_2Display: any = null;
    if (cost_2 != 0) cost_2Display = <Text>Cost(2): {cost_2}</Text>;
    let cost_4Display: any = null;
    if (cost_4 != 0) cost_4Display = <Text>Cost(4): {cost_4}</Text>;
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>Hello EventDetails</Text>
                <Text>Name: {name}</Text>
                <Text>Description: {description}</Text>
                <Text>Date: {date}</Text>
                <Text>Venue: {venue}</Text>
                <Text>Cost(1): {cost_1}</Text>
                {cost_2Display}
                {cost_4Display}
            </View>
            <PBottomNav navigation={props.navigation} index={1}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
