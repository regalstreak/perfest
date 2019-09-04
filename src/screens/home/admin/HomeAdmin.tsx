import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface IHomeAdminProps {

}

export default (props: IHomeAdminProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello HomeAdmin</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
