import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import QrReader from 'react-qr-reader'
import { invalidateTicket } from '../../library/networking/API/ticketAPI';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/rootReducer';

interface IEventVolsProps {

}

export default (props: IEventVolsProps) => {

    const [qrResult, setQrResult] = useState<string>('');
    const token = useSelector((state: AppState) => (state.auth.token));
    const [uploading, setUploading] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState('');
    const handleScan = async (data: string) => {
        if (data) {
            console.log(data);
            setQrResult(data);
            setUploading(<Text>Loading</Text>);
            let res = await invalidateTicket(data, token);
            setUploading(null);
            // post data to server
            // show if valid or not
            if (res.success) {
                // Handle success
                console.log(res.ticketData);
                setUserData(res.ticketData);
            } else {
                console.log(res.error);
                setError(res.error);
            }
        }
    }

    let displayUser = null;
    if (userData) {
        displayUser = (
            <View>
                <Text>Event: {userData.event.name}</Text>
                <Text>Paid: {userData.paid}</Text>
                <Text>Validity: {userData.validity}</Text>
            </View>
        )
    }

    let errorText;
    if (error) {
        errorText = <Text>An error occured !!! {error}</Text>
    }

    const handleError = (error: any) => {
        console.log(error);
    }

    return (
        <View style={styles.container}>
            {uploading}
            {Platform.OS === 'web' ?

                <QrReader
                    delay={3000}
                    onError={(error: any) => { handleError(error) }}
                    onScan={(data: any) => (handleScan(data))}
                    style={{ width: '70%' }}
                    showViewFinder={false}
                /> : <Text>Abhi tak scanner implement nahi hua for native app</Text>
            }

            <Text>QR RESULT IS: {qrResult}</Text>
            {errorText}
            {displayUser}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
