import { ActionTypes } from '../../library/interfaces/AuthActionTypes';
import { ADD_TOKEN, DELETE_TOKEN } from '../actions';
import { AsyncStorage } from 'react-native';

interface InitState {
	token: string,
	userType: string,
	userId: string
}

const setToken = async (token: string) => {
	try {
		await AsyncStorage.setItem('token', token);
	} catch (err) {
		console.log(err)
	}
}

const deleteToken = async () => {
	await AsyncStorage.removeItem('token');
}

const initState: InitState = {
	token: '',
	userType: '',
	userId: ''
}

const authReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case ADD_TOKEN:
			setToken(action.token);
			return {
				token: action.token,
				userType: action.userType,
				userId: action.userId
			}
		case DELETE_TOKEN:
			deleteToken();
			return {
				token: '',
				userType: '',
				userId: ''
			}
		default:
			return state
	}
}

export default authReducer;

export type ReducerState = ReturnType<typeof authReducer>;