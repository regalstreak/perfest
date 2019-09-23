import { ActionTypes } from '../../library/interfaces/AuthActionTypes';
import { ADD_TOKEN, DELETE_TOKEN } from '../actions/ActionNames';

interface InitState {
	token: string,
	userType: string,
	userId: string
}

const initState: InitState = {
	token: '',
	userType: '',
	userId: ''
}

const authReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case ADD_TOKEN:
			return {
				token: action.token,
				userType: action.userType,
				userId: action.userId
			}
		case DELETE_TOKEN:
			return initState
		default:
			return state
	}
}

export default authReducer;

export type ReducerState = ReturnType<typeof authReducer>;