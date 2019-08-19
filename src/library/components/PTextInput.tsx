import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '../res/colors';

interface IPTextInputProps {
    placeholder: string;
    type?: 'default' | 'numeric' | 'email-address';
    password?: boolean;
}

const PTextInput: React.FC<IPTextInputProps> = (props) => {

    // hooks
    const [placeholderVal] = useState(new Animated.Value(0));
    const [outline, setOutline] = useState(colors.perfestGrey);
    const [outlineWidth, setOutlineWidth] = useState(1);
    const [text, setText] = useState('');
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
    }

    const _handleBlur = () => {
        placeholderVal.setValue(1);
        if (text.length === 0) {
            Animated.timing(placeholderVal, {
                toValue: 0,
                duration: 100,
            }).start();
        }
        if (textInputRef.current) {
            textInputRef.current.blur();
        }

        setOutline(colors.perfestGrey);
        setOutlineWidth(1);
    }

    return (
        <View style={styles.container}>
            <TextInput
                ref={textInputRef}
                onFocus={_handleFocus}
                onBlur={_handleBlur}
                style={[styles.textInput, outlineStyle]}
                value={text}
                keyboardType={props.type}
                onChangeText={(input) => setText(input)}
                secureTextEntry={props.password}
            />
            <TouchableWithoutFeedback onFocus={_handleFocus}>
                <Animated.View style={[styles.placeholder, placeHolderTopStyle]}>
                    <Animated.Text style={{ fontSize: placeholderFontSize, color: outline }}>
                        {props.placeholder}
                    </Animated.Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

PTextInput.defaultProps = {
    type: 'default',
    password: false
}

const styles = StyleSheet.create({
    container: {
        margin: hp(3),
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
})

export default PTextInput;