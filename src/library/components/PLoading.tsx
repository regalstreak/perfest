import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';


interface IPLoadingProps {

}

export default (props: IPLoadingProps) => {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Happiness</Text> */}
            <ActivityIndicator
                size={wp(36)}
                color={colors.perfestPrimary}
            />
            <Text style={styles.textLoading}>Loading...</Text>
            {/* <Text style={styles.textError}>Fingers crossed for no errors</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: hp(3)
    },
    textLoading: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: hp(2)
    },
    textError: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        marginVertical: 16,
        fontSize: hp(2)
    }
})
