import { ActionTypes } from '../library/interfaces/ActionTypes';
import { ADD_TOKEN, DELETE_TOKEN } from './actions';
import { AsyncStorage } from 'react-native-web';
import jwt_decode from 'jwt-decode';

interface InitState {
	token: string,
	userType: string,
	userId: string
}

interface TokenType {
	type: string,
	userId: string
}

const getToken = () => {
	AsyncStorage.getItem('token').then(token => {
		return token;
	}).catch(err => {
		console.log(err);
		return '';
	});
	return '';
}

const setToken = async (token: string) => {
	try {
		await AsyncStorage.setItem('token', token);
	} catch (err) {
		console.log(err)
	}
	return token;
}

const deleteToken = async () => {
	await AsyncStorage.removeItem('token');
	return '';
}

const getUserType = () => {
	if (getToken()) {
		return jwt_decode<TokenType>(getToken()).type;
	} else {
		return '';
	}
}

const getUserId = () => {
	if (getToken()) {
		return jwt_decode<TokenType>(getToken()).userId;
	} else {
		return '';
	}
}

const initState: InitState = {
	token: getToken(),
	userType: getUserType(),
	userId: getUserId()
}

const RootReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case ADD_TOKEN:
			setToken(action.token);
			return {
				token: action.token,
				userType: jwt_decode<TokenType>(action.token).type,
				userId: jwt_decode<TokenType>(action.token).userId
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

export default RootReducer

export type ReducerState = ReturnType<typeof RootReducer>