import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';


interface IPTextInputProps {

}

export default (props: IPTextInputProps) => {

    const [placeholderVal] = useState(new Animated.Value(10));

    const animatePlaceholder = () => {
        placeholderVal.setValue(10);
        Animated.timing(placeholderVal, {
            toValue: 30,
            delay: 300,
        }).start();
    }

    return (
        <View style={styles.container}>
            <TextInput onFocus={animatePlaceholder} style={styles.textInput} />
            <Animated.View style={{ ...styles.placeHolder, width: placeholderVal }}>
                <Text style={styles.placeholderText}>abc</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    textInput: {
        fontSize: 20,
        padding: 8,
        borderColor: 'blue',
        borderRadius: 4,
        borderWidth: 1.5,
    },
    placeHolder: {
        position: 'absolute',
        top: 10,
        left: 12,
        // transform: [{ translateY: -16 }],
        backgroundColor: 'white',
        paddingHorizontal: 4,
    },
    placeholderText: {
        fontSize: 20,
    }
})
