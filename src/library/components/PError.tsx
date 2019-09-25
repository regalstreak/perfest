import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import { ChildInterface } from '../interfaces/PropInterfaces';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

interface IPErrorProps extends ChildInterface {
    isVisible: boolean;
    onBackdropPress: () => void;
}

export default (props: IPErrorProps) => {


    return (
        <View style={styles.container}>
            <Modal
                isVisible={props.isVisible}
                onBackdropPress={() => {
                    props.onBackdropPress()
                }}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        onPress={() => { props.onBackdropPress() }}
                    >
                        <FeatherIcon
                            name={'x'}
                            size={24}
                        />
                    </TouchableOpacity>
                    <View style={styles.modalChildren}>
                        {props.children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 0.3,
    },
    modalChildren: {
        alignItems: 'center'
    }
})
