import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { INavigation } from '../../library/interfaces/Navigation';
import { getDetailsFromTicketUrl, GetDetailsFromTicketUrl } from '../../library/networking/API/ticketAPI';
import PBottomNav from '../../library/components/PBottomNav';
import { useSelector } from 'react-redux';
import User from './User';

const QRCode = require('qrcode.react');

interface IPTicketDetailsProps extends INavigation {
}

export default (props: IPTicketDetailsProps) => {

    const [qrSecret, setQrSecret] = useState<string>('');
    const [userRes, setUserRes] = useState<any>('');
    const userTypeRedux = useSelector((state: any) => state.auth.userType);


    const RenderQr = () => {
        if (Platform.OS === 'web') {
            return (
                <QRCode size={256} value={qrSecret} />
            )
        } else {
            return (
                <Text>platform android/ios qr code to be implemented</Text>
            )
        }
    }

    const RenderUpgradeLoginUser = () => {
        return (
            <User userRes={userRes}></User>
        )
    }

    useEffect(() => {
        let isMounted = true;

        if (Platform.OS === 'web') {
            let ticketUrl = window.location.href.split('/').slice(-1)[0];

            getDetailsFromTicketUrl(ticketUrl).then((res: GetDetailsFromTicketUrl) => {
                console.log(res);

                setUserRes(res.userId);

                if (isMounted && res.ticketDetails) {
                    setQrSecret(res.ticketDetails.secretString)
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
                <Text>Hello PTicketDetails</Text>
                <Text>Redux type: {userTypeRedux}</Text>

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
    }
})
