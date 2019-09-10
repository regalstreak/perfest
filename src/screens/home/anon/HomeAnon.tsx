import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../../library/res/styles';


interface IHomeAnonProps {

}

export default (props: IHomeAnonProps) => {
    return (
        <View style={styles.container}>
            <Text style={textStyles.headerText}>Hey there! Welcome to Perfest</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
