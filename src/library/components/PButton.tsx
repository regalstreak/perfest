import React from 'react';
import { Text, StyleSheet, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../res/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IPButtonProps {
    text: string,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
}

export default (props: IPButtonProps) => {

    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={'#4561d1'}
            style={[styles.container, props.style]}
        >
            <Text style={styles.text}>{props.text}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.perfestPrimary,
        paddingHorizontal: wp(6),
        paddingVertical: wp(2.5),
        borderRadius: 4,
    },
    text: {
        color: 'white',
        fontSize: hp(2.2)
    }
})
