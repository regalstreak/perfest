import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { INavigation } from '../interfaces/Navigation';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../res/colors';
import { useSelector } from 'react-redux';


interface IPBottomNavProps extends INavigation {
    style?: StyleProp<ViewStyle>,
    pressCallback?: (index: number) => any,
    items?: Array<Iitem>,
    index: number,
}

interface Iitem {
    component: string;
    title: string;
    icon: string;
}

const normalNavBar = [
    {
        component: 'Home',
        title: 'Home',
        icon: 'home',
    },
    {
        component: 'Events',
        title: 'Events',
        icon: 'align-justify',
    },
    {
        component: 'Notifications',
        title: 'Notifs',
        icon: 'bell',
    },
    {
        component: 'Profile',
        title: 'Profile',
        icon: 'user',
    },
]
const adminNavBar = [
    {
        component: 'Home',
        title: 'Home',
        icon: 'home',
    },
    {
        component: 'Events',
        title: 'Events',
        icon: 'align-justify',
    },
    {
        component: 'Volunteers',
        title: 'Volunteers',
        icon: 'users',
    },
    {
        component: 'Profile',
        title: 'Profile',
        icon: 'user',
    },
]

const PBottomNav = (props: IPBottomNavProps) => {

    const userType = useSelector((state: any) => state.auth.userType)

    let navBar: Iitem[];

    if (userType === 'admin') {
        navBar = adminNavBar;
    } else {
        navBar = normalNavBar;
    }

    let primaryTextStyle = { color: colors.perfestPrimary }
    let secondaryTextStyle = { color: colors.perfestGrey }

    return (
        <View style={[styles.container, props.style]}>

            <View style={styles.items}>
                {
                    navBar.map((item: Iitem, index: number) => {
                        if (props.index === index) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate(navBar[index].component)
                                    }}
                                    key={item.title}
                                    style={styles.itemView}
                                >
                                    <View style={styles.textIconContainer}>
                                        <FeatherIcon
                                            name={navBar[index].icon}
                                            size={24}
                                            color={colors.perfestPrimary} />
                                        <Text style={[styles.itemText, primaryTextStyle]}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate(navBar[index].component)
                                    }}
                                    key={item.title}
                                    style={styles.itemView}
                                >
                                    <View style={styles.textIconContainer}>
                                        <FeatherIcon
                                            name={navBar[index].icon}
                                            size={24}
                                            color={colors.perfestGrey}
                                        />
                                        <Text style={[styles.itemText, secondaryTextStyle]}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })
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
        // position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
    },
    items: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    textIconContainer: {
        alignItems: 'center',
    },
    itemView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 12,
        marginTop: 4,
    }
})

export default PBottomNav;