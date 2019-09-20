import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import QrReader from 'react-qr-reader'


interface IEventVolsProps {

}

export default (props: IEventVolsProps) => {

    const [qrResult, setQrResult] = useState<string>('');

    const handleScan = (data: string) => {
        if (data) {
            setQrResult(data);

            // post data to server
            // show if valid or not
        }
    }

    const handleError = (error: any) => {
        console.log(error);
    }

    return (
        <View style={styles.container}>
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
