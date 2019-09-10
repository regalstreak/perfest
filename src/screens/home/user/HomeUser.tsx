import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../../library/res/styles';

interface IHomeUserProps {

}

export default (props: IHomeUserProps) => {
    return (
        <View style={styles.container}>
            <Text style={textStyles.headerText}>Hey user! Welcome to Perfest</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
