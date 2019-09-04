import React from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, ScrollView,  } from 'react-native';

import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PButton from '../../../library/components/PButton';
import PSearchDropdown from '../../../library/components/PSearchDropdown';

interface IHomeVolProps {

}

export default (props: IHomeVolProps) => {
    return (

            
        <ScrollView style={styles.container}>
            <Text>HomeVol</Text>
            <KeyboardAvoidingView style={styles.issueTicketContainer} enabled>
                <PTextInput style={styles.issueTicketTextViews} placeholder="Email"></PTextInput>
                <PTextInput style={styles.issueTicketTextViews} placeholder="Paid"></PTextInput>
                <PSearchDropdown style={styles.issueTicketTextViews} placeholder='Events'></PSearchDropdown>
                <PButton style={styles.issueTicketTextViews} text='Issue Ticket'></PButton>
            </KeyboardAvoidingView>
        </ScrollView>
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
