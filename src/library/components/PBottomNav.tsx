import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface IPBottomNavProps {
    style?: StyleProp<ViewStyle>,
}


const ourProps: any = [
    {
        title: 'abc',
    },
    {
        title: 'bcd',
    },
    {
        title: 'cde',
    },
    {
        title: 'cdes',
    },
]

interface Iitem {
    component?: string;
    title?: string;
    icon?: string;
}

export default (props: IPBottomNavProps) => {
    return (
        <View style={[styles.container, props.style]}>

            <View style={styles.items}>
                {
                    ourProps.map((item: Iitem) => (
                        <View key={item.title} style={styles.itemView}>
                            <Text style={styles.itemText}>
                                {item.title}
                            </Text>
                        </View>
                    ))
                }
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(8),
        elevation: 4, // TODO: Correct elevation or shadow for android
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 16,
        position: 'absolute',
        bottom: 0

    },
    items: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemView: {
        backgroundColor: 'red',
        alignItems: 'center'
    },
    itemText: {
        color: 'blue'
    }
})
