import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import PTextInput, { IPTextInputProps } from './PTextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';

interface DataType {
    name: string;
    meta: any;
}

interface IPSearchDropdownProps extends IPTextInputProps {
    style?: StyleProp<ViewStyle>;
    data: DataType[];
    onChangeSelection?: (text: string) => void;
}

export default (props: IPSearchDropdownProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    let { data } = props;
    let dataList = data.map(({ name }) => name);
    const [searched, setSearched] = useState<Array<string>>(dataList)

    const _renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            onPress={() => {
                if (props.onChangeSelection) {
                    props.onChangeSelection(item);
                }
                setText(item);
                setIsFocused(false);
            }}
        >
            <View style={{ padding: 20 }}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    // handlers
    const _handleFocus = () => {
        setIsFocused(true);
    }

    const _handleBlur = () => {
        setIsFocused(false);
    }

    const _onChangeText = (input: string) => {
        if (data.length > 0) {
            setIsFocused(true);

            let found = data.filter(({ name }) => {
                return name.toLowerCase().includes(input.toLowerCase());
            });

            if (found.length === 0) {
                setIsFocused(false);
            }

            let foundList = found.map(({ name }) => name);
            setSearched(foundList);
        }
    }

    return (
        <View>
            <View style={[styles.container, props.style]}>
                <PTextInput
                    placeholder={props.placeholder}
                    onFocus={_handleFocus}
                    // onBlur={_handleBlur}
                    onChangeText={(input) => {
                        setText(input);
                        _onChangeText(input);
                    }}
                    value={text}
                    suffixIcon='x'
                    suffixIconOnPress={() => {
                        setIsFocused(false)
                        setText('');
                    }}
                    noDirty
                ></PTextInput>

                {isFocused ? (
                    <View>
                        <FlatList
                            style={styles.flatList}
                            keyboardShouldPersistTaps={'never'}
                            data={searched}
                            renderItem={_renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                ) : (null)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(70),
    },
    flatList: {
        maxHeight: 200,
        borderRadius: 4,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: colors.perfestPrimary
    }
})
