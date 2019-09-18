import { ActionTypes } from '../../library/interfaces/LogActionType';
import LogType from '../../library/interfaces/LogType';
import { REFRESH_LOG_LIST, REFRESH_LOG_LIST_SUCCESS, REFRESH_LOG_LIST_FAILED, ADD_LOG } from '../actions/ActionNames';

interface InitState {
	logList: LogType[],
	totalSold: number,
	totalCollected: number
}

const initState: InitState = {
	logList: [],
	totalSold: 0,
	totalCollected: 0
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
				totalCollected: action.payload.totalCollected
			}
		case REFRESH_LOG_LIST_FAILED:
			return state
		case ADD_LOG:
			let newLog: LogType = { vname: 'You', price: Number(action.ticket.price), ename: action.ticket.eventName, date: (new Date()).toString(), uemail: action.ticket.email }
			let newTotalCollected = Number(state.totalCollected + action.ticket.price);
			return {
				...state,
				logList: [newLog, ...state.logList],
				totalSold: state.totalSold + 1,
				totalCollected: newTotalCollected
			}
		default:
			return state
	}
}

export default eventReducer;

export type ReducerState = ReturnType<typeof eventReducer>;