import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface IHomeUserProps {

}

export default (props: IHomeUserProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello HomeUser</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
