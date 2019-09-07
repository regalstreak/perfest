import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, TouchableWithoutFeedback, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

import { colors } from '../res/colors';

export interface IPTextInputProps {
    placeholder: string;
    type?: 'default' | 'numeric' | 'email-address';
    password?: boolean;
    onChangeText?: (text: string) => void;
    style?: StyleProp<ViewStyle>;
    onFocus?: () => void;
    onBlur?: () => void;
    value?: string | number;
    noDirty?: true;
    suffixIcon?: string;
    suffixIconOnPress?: () => void;
    default?: string;
    editable?: boolean;
}

const PTextInput: React.FC<IPTextInputProps> = (props) => {

    // hooks
    const [placeholderVal] = useState(props.default ? new Animated.Value(1) : new Animated.Value(0));
    const [outline, setOutline] = useState(colors.perfestGrey);
    const [outlineWidth, setOutlineWidth] = useState(1);
    const [text, setText] = useState(props.default ? props.default : '');
    const textInputRef = useRef<TextInput>(null);

    // animations
    let placeholderTop = placeholderVal.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(1.6), hp(-1.2)]
    })
    let placeholderFontSize = placeholderVal.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(2.8), hp(2)]
    })

    let placeHolderTopStyle = { top: placeholderTop }
    let outlineStyle = { borderColor: outline, borderWidth: outlineWidth }

    // handlers
    const _handleFocus = () => {
        Animated.timing(placeholderVal, {
            toValue: 1,
            duration: 100,
        }).start();
        if (textInputRef.current) {
            textInputRef.current.focus();
        }

        setOutline(colors.perfestPrimary);
        setOutlineWidth(2);

        if (props.onFocus) {
            props.onFocus();
        }
    }

    const _handleBlur = () => {

        if (!props.noDirty) {
            placeholderVal.setValue(1);

            let checkTextCondition = props.value ? props.value.toString().length : text.length;
            if (checkTextCondition === 0) {
                Animated.timing(placeholderVal, {
                    toValue: 0,
                    duration: 100,
                }).start();
            }
        }
        if (textInputRef.current) {
            textInputRef.current.blur();
        }

        setOutline(colors.perfestGrey);
        setOutlineWidth(1);

        if (props.onBlur) {
            props.onBlur();
        }
    }

    return (
        <View style={[styles.container, props.style]}>
            <TextInput
                ref={textInputRef}
                onFocus={_handleFocus}
                onBlur={_handleBlur}
                style={[styles.textInput, outlineStyle]}
                value={props.value ? props.value.toString() : text}
                keyboardType={props.type}
                onChangeText={(input) => {
                    setText(input);
                    if (props.onChangeText) {
                        props.onChangeText(input);
                    }
                }}
                secureTextEntry={props.password}
                editable={props.editable}
            />
            <TouchableWithoutFeedback onFocus={_handleFocus}>
                <Animated.View style={[styles.placeholder, placeHolderTopStyle]}>
                    <Animated.Text
                        style={{ fontSize: placeholderFontSize, color: outline }}
                        selectable={false}
                    >
                        {props.placeholder}
                    </Animated.Text>
                </Animated.View>
            </TouchableWithoutFeedback>

            {
                props.suffixIcon ?

                    (
                        <TouchableOpacity
                            onPress={() => {
                                if (props.suffixIconOnPress) {
                                    props.suffixIconOnPress();
                                }
                            }}
                            style={styles.buttonSuffix}
                        >
                            <FeatherIcon
                                name={props.suffixIcon}
                                size={22}
                                color={colors.perfestGrey} />
                        </TouchableOpacity>
                    )
                    : null
            }
        </View>
    )
}

PTextInput.defaultProps = {
    type: 'default',
    password: false
}

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
        height: hp(7),
        width: wp(70),
        fontSize: hp(3),
        paddingVertical: hp(1),
        paddingHorizontal: hp(2),
        borderRadius: 4,
    },
    placeholder: {
        position: 'absolute',
        backgroundColor: 'white',
        left: hp(1),
        paddingHorizontal: 6,
    },
    buttonSuffix: {
        position: 'absolute',
        right: hp(1),
        paddingHorizontal: 6,
        top: hp(1.8),
        opacity: 0.5,
    }
})

export default PTextInput;