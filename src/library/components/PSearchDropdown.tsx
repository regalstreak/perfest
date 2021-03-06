import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import PTextInput, { IPTextInputProps } from './PTextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../res/colors';

interface DataType {
    name: string;
    meta?: any;
}

interface IPSearchDropdownProps extends IPTextInputProps {
    style?: StyleProp<ViewStyle>;
    data: DataType[];
    width?: any;
    searchable?: boolean;
    onChangeSelection?: (text: string) => void;
}

export const PSearchDropdown = (props: IPSearchDropdownProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [text, setText] = useState<string>(props.default ? props.default : '')

    let dataListInitial = props.data.map(({ name }) => name);

    const [searched, setSearched] = useState<Array<string>>(dataListInitial)

    useEffect(() => {
        let dataList = props.data.map(({ name }) => name);
        setSearched(dataList)
    }, [props.data])

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
        if (props.data.length > 0) {
            setIsFocused(true);


            let found = props.data.filter(({ name }) => {
                if (props.searchable) {
                    return name.toLowerCase().includes(input.toLowerCase());
                } else {
                    return name.toLowerCase();
                }
            });

            if (found.length === 0) {
                _handleBlur();
            }

            let foundList = found.map(({ name }) => name);
            setSearched(foundList);
        }
    }

    const containerStyle = { width: props.width ? props.width : wp(70) }

    return (
        <View>
            <View style={[styles.container, props.style, containerStyle]}>
                <PTextInput
                    width={props.width}
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
                        setText(' ');
                    }}
                    default={props.default}
                    noDirty
                    editable={props.editable}
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

PSearchDropdown.defaultProps = {
    searchable: true,
}

export default PSearchDropdown;


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
