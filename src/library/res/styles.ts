import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const textStyles = StyleSheet.create({
    headerText: {
        fontSize: hp(4),
        fontWeight: '600',
        marginHorizontal: hp(3.5),
        marginTop: hp(4)
    },
    subHeaderText: {
        fontSize: hp(3.2),
        fontWeight: '600',
        marginHorizontal: hp(3.5),
        marginTop: hp(2.6)
    },
})