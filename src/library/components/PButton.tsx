import React from 'react';
import { Text, StyleSheet, TouchableHighlight, StyleProp, ViewStyle, ActivityIndicator, View } from 'react-native';
import { colors } from '../res/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IPButtonProps {
    text: string,
    width?: any;
    disable?: boolean;
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
}

export default (props: IPButtonProps) => {

    let disable = props.disable;
    let disableButton = false;
    let loader = null;
    if (disable) {
        disableButton = true;
        loader = <ActivityIndicator color="#ffffff" style={styles.loader} />;
    }

    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={'#4561d1'}
            style={[styles.container, props.style]}
            disabled={disableButton}
        >
            <View style={styles.content}>
                {loader}
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.perfestPrimary,
        paddingHorizontal: wp(6),
        paddingVertical: wp(2.5),
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: hp(15)
    },
    text: {
        color: 'white',
        fontSize: hp(2.2),
    },
    content:{
        flexDirection: 'row'
    },
    loader: {
        marginRight: hp(1)
    }
})
