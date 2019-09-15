import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeVol from '../volunteer/HomeVol';


interface IHomeAdminProps {

}

export default (props: IHomeAdminProps) => {
    return (
        <View style={styles.container}>
            <HomeVol />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
