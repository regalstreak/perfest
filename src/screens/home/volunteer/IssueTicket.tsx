import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import PTextInput from '../../../library/components/PTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PSearchDropdown from '../../../library/components/PSearchDropdown';
import PButton from '../../../library/components/PButton';
import { useSelector, useDispatch } from 'react-redux';
import EventType from '../../../library/interfaces/EventType';
import { validateTicketIssue } from '../../../library/utils/utils';
import { tryIssueTicket, getLatestLogs } from '../../../store/actions/actions';
import Modal from 'modal-enhanced-react-native-web'
import { textStyles } from '../../../library/res/styles';
import PError from '../../../library/components/PError';
import { issueTicket } from '../../../library/networking/API/ticketAPI';


interface IIssueTicketProps {
}

interface ShortEventType {
    name: string;
    meta: any;
}

interface CollegeType {
    name: string,
    year: string,
    branch: string
}

export default (props: IIssueTicketProps) => {

    // state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState<number>(0);
    const [college, setCollege] = useState<CollegeType>({ name: '', year: '', branch: '' });

    const [membership, setMembership] = useState('Non CSI');
    const [csi_member, setCsiMember] = useState<boolean>(false);
    const [paid, setPaid] = useState<number>(0);
    // const [payment, setPayment] = useState('Full');

    const [price, setPrice] = useState(0);
    const [eventId, setEventId] = useState('');
    const [participantNo, setParticipantNo] = useState(1);
    const [eventName, setEventName] = useState('');

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
    const [fillAllErrorVisible, setFillAllErrorVisible] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    let eventData: ShortEventType[];

    // store
    const dispatch = useDispatch();
    const token = useSelector((state: any) => (state.auth.token));
    const events = useSelector((state: any) => (state.events.eventList));

    // functions
    if (events) {
        eventData = events.map((event: EventType) => {
            return {
                name: event.name,
                meta: {
                    _id: event._id,
                    cost_CSI: event.cost_CSI,
                    cost_nonCSI: event.cost_nonCSI,
                }
            }
        })
    } else {
        eventData = [{ name: 'Loading...', meta: { _id: '', cost_CSI: { cost_1: 0 }, cost_nonCSI: { cost_1: 0 } } }];
    }

    const onIssueTicketClicked = async () => {

        setModalVisible(false);

        if (validateTicketIssue(
            name, college.name,
            email, phone,
            eventId, participantNo,
            membership, price, paid
        )) {

            const payload = {
                name, phone, email, event_id: eventId, price, paid, participantNo, college, csi_member, token
            }

            console.log(payload);

            // dispatch(tryIssueTicket(payload));
            let res = await issueTicket(payload);
            if (res.success) {
                console.log('suc');
                setSuccess(true);
                dispatch(getLatestLogs(token));
            } else {
                // Handle failure
                console.log(res.error);
                setSuccess(false);
                let errorMessage: any = res.error;
                if (typeof errorMessage === 'string') {
                    setErrorMessage(errorMessage);
                } else {
                    if (res.error) {
                        if (res.error.toString() === 'TypeError: Failed to fetch') {
                            dispatch(tryIssueTicket(payload));
                            setErrorMessage('No Network. Will retry to send automatically');
                        } else {
                            if (JSON.stringify(res.error).includes('duplicate key error')) {
                                setErrorMessage('The phone number is already taken. Please try another phone number');
                            } else {
                                setErrorMessage(JSON.stringify(res.error));
                            }
                        }
                    } else {
                        setErrorMessage('An error occured. Please try again');
                    }
                }
            }
            console.log(success);
            setErrorModalVisible(true);

            // clear everything            
            // setName('');
            // setEmail('');
            // setPhone(0);
            // setEventId('');
            // setParticipantNo()
            // setCollege({ name: '', branch: '', year: '' })

        } else {
            // Handle Error
            console.log('Fill all fields');
        }
    }

    const calculatePricing = (eventInput: string,
        membershipInput: string,
        participantInput: number,
    ) => {
        let event = eventData.find(event => {
            return event.name === eventInput
        });
        if (event) {
            setEventId(event.meta._id);
            let priceLocal;
            if (membershipInput === 'CSI') {
                priceLocal = event.meta.cost_CSI[`cost_${participantInput.toString()}`];
            } else if (membershipInput === 'Non CSI') {
                priceLocal = event.meta.cost_nonCSI[`cost_${participantInput.toString()}`];
            } else {
                priceLocal = 0;
            }

            setPrice(priceLocal);
        }
    }

    // render Modal

    return (
        <KeyboardAvoidingView style={styles.issueTicketContainer} enabled>

            <PTextInput
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder="Name"
                onChangeText={(text: string) => {
                    setName(text);
                }}
            />

            <PTextInput
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder="Email"
                onChangeText={(text: string) => {
                    setEmail(text);
                }}
            />

            <PTextInput
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder="Phone"
                type='numeric'
                onChangeText={(text: number) => {
                    setPhone(text);
                }}
            />

            <View style={styles.issueTicket2Column}>
                <PTextInput
                    width={wp(41)}
                    style={[styles.issueTicketTextViews, { marginRight: wp(2) }]}
                    placeholder="College"
                    onChangeText={(text: string) => {
                        setCollege({ name: text, year: '', branch: '' });
                    }}
                />
                <PTextInput
                    width={wp(41)}
                    style={[styles.issueTicketTextViews, { marginLeft: wp(2) }]}
                    placeholder="Year"
                    type='numeric'
                    onChangeText={(text: string) => {
                        setCollege({ name: college.name, year: text, branch: '' });
                    }}
                />
            </View>

            <PSearchDropdown
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder='Event'
                data={eventData}
                onChangeSelection={(text: string) => {
                    setEventName(text);
                    calculatePricing(text, membership, participantNo);
                }}
            />

            <PSearchDropdown
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder='Participants'
                data={[
                    { name: '1', meta: '1' },
                    { name: '2', meta: '2' },
                    { name: '4', meta: '4' }
                ]}
                default='1'
                editable={false}
                onChangeSelection={(text: string) => {
                    setParticipantNo(parseInt(text));
                    calculatePricing(eventName, membership, parseInt(text))
                }}
            />


            <PSearchDropdown
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder='Membership'
                data={[
                    { name: 'CSI', meta: 'CSI' },
                    { name: 'Non CSI', meta: 'Non CSI' },
                ]}
                default='Non CSI'
                editable={false}
                searchable={false}
                onChangeSelection={(text: string) => {
                    setMembership(text);
                    if (text === 'CSI') {
                        setCsiMember(true);
                    } else {
                        setCsiMember(false);
                    }
                    calculatePricing(eventName, text, participantNo)
                }}
            />

            <View style={styles.price}>
                <PTextInput
                    width={wp(43)}
                    style={styles.issueTicketTextViews}
                    placeholder="Paid"
                    type='numeric'
                    onChangeText={(text: string) => {
                        let paidNum = parseInt(text);
                        setPaid(paidNum);
                    }}
                />
                <View style={{ width: wp(34) }}>

                    <Text style={styles.priceText}>Price: <Text style={styles.priceNumberText}>
                        {price}₹
                    </Text>
                    </Text>
                </View>
            </View>

            {/* 
            <PSearchDropdown
                width={wp(86)}
                style={styles.issueTicketTextViews}
                placeholder='Paid'
                data={[
                    { name: 'Half', meta: 'Half' },
                    { name: 'Full', meta: 'Full' },
                ]}
                default='Full'
                editable={false}
                searchable={false}
                onChangeSelection={(text: string) => {
                    calculatePricing(eventName, membership, participantNo, text)
                }}
            /> */}


            <PButton
                text={'Collect ' + paid + ' ₹'}
                width={wp(86)}
                onPress={() => {
                    if (validateTicketIssue(
                        name, college.name,
                        email, phone,
                        eventId, participantNo,
                        membership, price, paid
                    )) {
                        setModalVisible(true)
                    } else {
                        setFillAllErrorVisible(true)
                        console.log("Enter all details");
                    }

                }}
            />

            <PError
                isVisible={fillAllErrorVisible}
                onBackdropPress={() => {
                    setFillAllErrorVisible(false)
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={textStyles.subHeaderText}>Error</Text>
                    <Text style={styles.errorText}> Please fill all the details and check email id correctly</Text>
                    <Text style={styles.errorText}> Also, paid amount should be less than price</Text>
                </View>
            </PError>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => { setModalVisible(false) }}
            >
                <View style={styles.modal}>
                    <Text style={textStyles.subHeaderText}>
                        Confirmation
                    </Text>


                    <Text style={styles.errorText}>
                        Please recheck details
                    </Text>

                    <Text>Name: {name}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Phone: {phone}</Text>
                    <Text>College: {college.name}</Text>
                    <Text>Event: {eventName}</Text>
                    <Text>Participants: {participantNo}</Text>
                    <Text>Payment: {paid}</Text>

                    <View style={styles.modalButtons}>

                        <PButton style={styles.modalButton}
                            text='Cancel'
                            onPress={() => { setModalVisible(false) }}
                        />
                        <PButton style={styles.modalButton}
                            text='Issue'
                            onPress={() => { onIssueTicketClicked() }}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                isVisible={errorModalVisible}
                onBackdropPress={() => { setErrorModalVisible(false) }}
            >
                <View style={styles.modal}>
                    <Text style={textStyles.subHeaderText}>
                        Success: {success.toString()}
                    </Text>
                    {errorMessage ?

                        <Text>Error: {errorMessage}</Text>
                        : null
                    }

                    <View style={styles.modalButtons}>
                        <PButton style={styles.modalButton}
                            text='Done'
                            onPress={() => { setErrorModalVisible(false) }}
                        />
                    </View>

                </View>
            </Modal>

        </KeyboardAvoidingView>


    )
}

const styles = StyleSheet.create({
    issueTicketContainer: {
        marginHorizontal: hp(3.5),
    },
    issueTicketTextViews: {
        marginVertical: wp(2.6),
    },
    issueTicket2Column: {
        flexDirection: 'row',
    },
    issueTicketButton: {
        alignSelf: 'flex-start',
    },
    textHolders: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modal: {
        flex: 0.5,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        alignContent: 'center',
    },
    modalButtons: {
        flexDirection: 'row'
    },
    modalButton: {
        margin: wp(5)
    },
    errorText: {
        marginTop: wp(5),
        fontSize: 16,
        textAlign: 'center'
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceText: {
        fontSize: hp(3),
        fontWeight: '600',
    },
    priceNumberText: {
        fontSize: hp(3),
        fontWeight: '400',
    },
})
