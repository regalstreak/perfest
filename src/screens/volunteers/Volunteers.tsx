import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PBottomNav from '../../library/components/PBottomNav';
import { INavigation } from '../../library/interfaces/Navigation';
import { useSelector } from 'react-redux';
import PTextInput from '../../library/components/PTextInput';
import PTicketVol from '../../library/components/PTicketVol';
import PButton from '../../library/components/PButton';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


interface IVolunteersProps extends INavigation {

}

export default (props: IVolunteersProps) => {

    const userType = useSelector((state: any) => state.auth.userType);
    const [searchVol, setSearchVol] = useState<string>('');


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