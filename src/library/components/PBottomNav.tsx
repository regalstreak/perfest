import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { INavigation } from '../interfaces/Navigation';

interface IPBottomNavProps extends INavigation {
    style?: StyleProp<ViewStyle>,
    pressCallback?: (index: number) => any,
    items?: Array<Iitem>,
}

interface Iitem {
    title: string;
    icon: string;
    component: string;
}

const volunteerNavBar = [
    {
        component: 'Home',
        title: 'Home',
        icon: 'home',
    },
    {
        component: 'Events',
        title: 'Events',
        icon: 'events',
    },
    {
        component: 'Notifications',
        title: 'Notifs',
        icon: 'bell',
    },
    {
        component: 'Profile',
        title: 'Profile',
        icon: 'person',
    },
]


const PBottomNav = (props: IPBottomNavProps) => {

    // const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <View style={[styles.container, props.style]}>

            <View style={styles.items}>
                {
                    volunteerNavBar.map((item: Iitem, index: number) => (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate(volunteerNavBar[index].component)
                            }}
                            key={item.title}
                            style={styles.itemView}>
                            <Text style={styles.itemText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
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
        bottom: 0,
        backgroundColor: 'white'
    },
    items: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    itemView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        textAlign: 'center'
    }
})

export default PBottomNav;