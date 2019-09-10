import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../../library/res/styles';


interface IHomeAdminProps {

}

export default (props: IHomeAdminProps) => {
    return (
        <View style={styles.container}>
            <Text style={textStyles.headerText}>Hey there admin!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
