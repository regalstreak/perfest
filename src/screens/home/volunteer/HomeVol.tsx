import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PButton from '../../../library/components/PButton';
import PSearchDropdown from '../../../library/components/PSearchDropdown';

interface IHomeVolProps {

}

export default (props: IHomeVolProps) => {
    return (
        <View style={styles.container}>
            <Text>HomeVol</Text>
            <View style={styles.issueTicketContainer}>
                <PTextInput style={styles.issueTicketTextViews} placeholder="Email"></PTextInput>
                <PTextInput style={styles.issueTicketTextViews} placeholder="Paid"></PTextInput>
                <PSearchDropdown style={styles.issueTicketTextViews} placeholder='Events'></PSearchDropdown>
                <PButton style={styles.issueTicketTextViews} text='Issue Ticket'></PButton>
            </View>
        </View>
    )
}

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
})
