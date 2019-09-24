import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PTextInput, { IPTextInputProps } from './PTextInput';
import PButton from './PButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface IPEditableTextInputProps extends IPTextInputProps {
    buttonText?: string;
    value: string;
    onSave?: () => void;
}

export default (props: IPEditableTextInputProps) => {

    const [editing, setEditing] = useState<boolean>(false);

    if (editing) {
        return (
            <View style={[styles.container, props.style]}>
                <PTextInput
                    width={props.width}
                    placeholder={props.placeholder}
                    default={props.value}
                    onChangeText={(input) => {
                        if (props.onChangeText) {
                            props.onChangeText(input);
                        }
                    }}
                    editable={props.editable}
                />

                <PButton onPress={() => {
                    setEditing(false);
                    if (props.onSave) {
                        props.onSave();
                    }
                }} text={props.buttonText ? props.buttonText : 'Save'} />
            </View>
        )
    } else {
        return (
            <View style={[styles.container, props.style]}>

                <TouchableOpacity
                    onPress={() => {
                        setEditing(true)
                    }}
                >

                    <Text style={styles.editableText}>{props.placeholder}:
                    <Text style={{ fontWeight: '400' }}>
                            &nbsp;{props.value}
                        </Text>
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    editableText: {
        fontSize: hp(2.7),
        fontWeight: '500'
    }
})
