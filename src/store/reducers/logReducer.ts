import { ActionTypes } from '../../library/interfaces/LogActionType';
import LogType from '../../library/interfaces/LogType';
import {
	REFRESH_LOG_LIST, REFRESH_LOG_LIST_SUCCESS, REFRESH_LOG_LIST_FAILED,
	ADD_LOG, DELETE_ALL_LOGS
} from '../actions/ActionNames';

interface InitState {
	logList: LogType[],
	totalSold: number,
	totalCollected: number,
	totalBalance: number
}

const initState: InitState = {
	logList: [],
	totalSold: 0,
	totalCollected: 0,
	totalBalance: 0
}

const eventReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case REFRESH_LOG_LIST:
			return state
		case REFRESH_LOG_LIST_SUCCESS:
			return {
				...state,
				logList: action.payload.logList,
				totalSold: action.payload.totalSold,
				totalCollected: action.payload.totalCollected,
				totalBalance: action.payload.totalBalance
			}
		case REFRESH_LOG_LIST_FAILED:
			return state
		case ADD_LOG:
			let newLog: LogType = { vname: 'You', paid: Number(action.ticket.paid), price: Number(action.ticket.price), ename: action.ticket.eventName, date: (new Date()).toString(), uemail: action.ticket.email, _id: '' }
			let newTotalCollected = Number(state.totalCollected + action.ticket.paid);
			let newTotalBalance = Number(state.totalBalance - action.ticket.paid + action.ticket.price);
			return {
				...state,
				logList: [newLog, ...state.logList],
				totalSold: state.totalSold + 1,
				totalCollected: newTotalCollected,
				totalBalance: newTotalBalance
			}
		case DELETE_ALL_LOGS:
			return initState
		default:
			return state
	}
}

export default eventReducer;

export type ReducerState = ReturnType<typeof eventReducer>;