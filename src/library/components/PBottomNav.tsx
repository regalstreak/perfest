import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { INavigation } from '../interfaces/Navigation';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../res/colors';


interface IPBottomNavProps extends INavigation {
    style?: StyleProp<ViewStyle>,
    pressCallback?: (index: number) => any,
    items?: Array<Iitem>,
    index: number,
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

const PBottomNav = (props: IPBottomNavProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(props.index);

    return (
        <View style={[styles.container, props.style]}>

            <View style={styles.items}>
                {
                    volunteerNavBar.map((item: Iitem, index: number) => {
                        if (props.index === index) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate(volunteerNavBar[index].component)
                                        setCurrentIndex(index);
                                    }}
                                    key={item.title}
                                    style={styles.itemView}
                                >
                                    <View>
                                        <FeatherIcon
                                            name={volunteerNavBar[index].icon}
                                            size={24}
                                            color={colors.perfestPrimary} />
                                        <Text style={{ ...styles.itemText, color: colors.perfestPrimary }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate(volunteerNavBar[index].component)
                                        setCurrentIndex(index);
                                    }}
                                    key={item.title}
                                    style={styles.itemView}
                                >
                                    <View>
                                        <FeatherIcon
                                            name={volunteerNavBar[index].icon}
                                            size={24}
                                            color={colors.perfestGrey}
                                        />
                                        <Text style={{ ...styles.itemText, color: colors.perfestGrey }}>
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
        textAlign: 'center'
    },
    itemText: {
        fontSize: 12,
    }
})

export default PBottomNav;