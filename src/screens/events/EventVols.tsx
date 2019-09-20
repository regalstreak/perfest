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
    const [uploading, setUploading] = useState(false);
    const handleScan = async (data: string) => {
        if (data) {
            console.log(data);
            setUploading(true);
            let res = await invalidateTicket(data, token);
            setQrResult(data);
            setUploading(false);
            // post data to server
            // show if valid or not
            if (res.success) {
                // Handle success
                console.log(res.ticketData);
            } else {
                console.log(res.error);
            }
        }
    }

    const handleError = (error: any) => {
        console.log(error);
    }

    const uploadingText = () => {
        if (uploading) {
            return <Text>Loading...</Text>
        } else {
            return null;
        }
    }

    return (
        <View style={styles.container}>
            {uploadingText()}
            {Platform.OS === 'web' ?


                <QrReader
                    delay={300}
                    onError={(error: any) => { handleError(error) }}
                    onScan={(data: any) => (handleScan(data))}
                    style={{ width: '70%' }}
                    showViewFinder={false}
                /> : <Text>Abhi tak scanner implement nahi hua for native app</Text>
            }

            <Text>QR RESULT IS: {qrResult}</Text>
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
