import { StackActions } from 'react-navigation'

const pop = ({ navigation, n }: any) => {
    navigation.dispatch(StackActions.pop({ n }))
}

export default pop
