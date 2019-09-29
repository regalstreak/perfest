import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { deleteTicket } from '../networking/API/ticketAPI';
import { useDispatch } from 'react-redux';
import Modal from 'modal-enhanced-react-native-web'
import PButton from './PButton';
import { textStyles } from '../res/styles';

interface IPLogsProps {
    id?: string;
    index: number;
    issuer?: string;
    event: string;
    price: string | number;
    buyer: string;
    date?: string | undefined;
    time?: string | undefined;
    userType: string | undefined;
    token: string;
    refreshLogs?: (token: string, dispatch: any) => void;
    notDeletable?: boolean;
}

export default (props: IPLogsProps) => {
    let { token, userType, id } = props;
    const dispatch = useDispatch();

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    let deleteIcon, deleteTicketFunction: () => void;
    if (token && userType === 'admin' && !props.notDeletable) {

        deleteTicketFunction = async () => {
            if (id) {
                let res = await deleteTicket(id, token);
                if (res.success && props.refreshLogs) {
                    props.refreshLogs(token, dispatch);
                    setIsDeleteModal(false);
                } else {
                    //Handle error
                    setIsDeleteModal(false);
                }
            }
        }

        deleteIcon = (
            <TouchableOpacity
                onPress={() => {
                    setIsDeleteModal(true)
                }}
                style={styles.deleteButton}
            >
                <FeatherIcon
                    name={'x-circle'}
                    size={24}
                    color={'red'}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.issuerText}>{props.index}) {props.issuer}</Text>
                <Text style={styles.issuerText}>{props.price}₹</Text>
            </View>
            <View style={styles.deleteIcon}>
                <Text style={styles.buyerText} >
                    {props.buyer}
                </Text>
                {deleteIcon}
            </View>
            <View style={[styles.mainContainer, styles.lastChild]}>
                <Text style={styles.eventText}>{props.event}</Text>
                <Text style={styles.eventText}>{props.date} | {props.time}</Text>
            </View>

            <Modal
                isVisible={isDeleteModal}
                onBackdropPress={() => {
                    setIsDeleteModal(false);
                }}
            >
                <View style={styles.modal}>

                    <Text style={textStyles.subHeaderText}>
                        Confirmation
                    </Text>

                    <View style={styles.modalButtons}>

                        <PButton style={styles.modalButton}
                            text='Cancel'
                            onPress={() => { setIsDeleteModal(false) }}
                        />
                        <PButton style={styles.modalButton}
                            text='Delete'
                            onPress={() => { deleteTicketFunction(); }}
                        />
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: colors.perfestGrey
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    issuerText: {
        fontSize: hp(2.7),
        fontWeight: '500'
    },
    eventText: {
        fontSize: hp(2),
    },
    buyerText: {
        fontSize: hp(2.4),
        marginVertical: 4
    },
    lastChild: {
        marginBottom: 8
    },
    deleteButton: {
        marginLeft: hp(1)
    },
    deleteIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4
    },
    modalButtons: {
        flexDirection: 'row'
    },
    modalButton: {
        margin: wp(5)
    },
    modal: {
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        alignContent: 'center',
    },
})
