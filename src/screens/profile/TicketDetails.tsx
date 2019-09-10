import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import { getDetailsFromTicketUrl, GetDetailsFromTicketUrl } from '../../library/networking/API/ticketAPI';
import PBottomNav from '../../library/components/PBottomNav';
import { useSelector } from 'react-redux';
import User from './User';
import { TokenType } from '../../library/interfaces/AuthTypes';
import PLoading from '../../library/components/PLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const QRCode = require('qrcode.react');

interface IPTicketDetailsProps extends INavigation {
}

export default (props: IPTicketDetailsProps) => {

    const [userRes, setUserRes] = useState<any>('');
    const [eventDetails, setEventDetails] = useState<any>(null)
    const [ticketDetails, setTicketDetails] = useState<any>(null)
    const userTypeRedux = useSelector((state: any) => state.auth.userType);


    const RenderQr = () => {
        if (Platform.OS === 'web') {
            return (
                ticketDetails ?

                    <View style={styles.qrMain}>
                        <Text style={styles.qrSecret}>{eventDetails.name}</Text>
                        <QRCode size={wp(50)} value={ticketDetails.secretString} />
                        <Text style={styles.qrSecret}>{ticketDetails.secretString}</Text>
                        <Text style={styles.qrText}>₹{ticketDetails.paid}</Text>
                    </View>


                    : <PLoading />
            )
        } else {
            return (
                <Text>platform android/ios qr code to be implemented</Text>
            )
        }
    }

    const RenderUpgradeLoginUser = () => {
        return (
            userRes ? <User navigation={props.navigation} userRes={userRes}></User> : <PLoading />
        )
    }

    useEffect(() => {
        let isMounted = true;

        if (Platform.OS === 'web') {
            let ticketUrl = window.location.href.split('/').slice(-1)[0];

            getDetailsFromTicketUrl(ticketUrl).then((res: GetDetailsFromTicketUrl) => {
                console.log(res);


                if (isMounted) {
                    setUserRes(res.userId);
                    setEventDetails(res.eventDetails);

                    if (res.ticketDetails) {
                        setTicketDetails(res.ticketDetails)
                    }
                }

            }).catch(err => {
                console.log(err);
            })

        }

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.container}>
                {
                    userTypeRedux ? <RenderQr /> :
                        <RenderUpgradeLoginUser />
                }
            </View>
            <PBottomNav index={3} navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    qrMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrSecret: {
        fontSize: hp(3),
        fontWeight: '700',
        textTransform: 'uppercase',
        marginVertical: hp(3),
    },
    qrText: {
        fontSize: hp(2),
        marginVertical: hp(3),
    }
})
