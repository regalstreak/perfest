import { ActionTypes } from '../../library/interfaces/LogActionType';
import LogType from '../../library/interfaces/LogType';
import { REFRESH_LOG_LIST, REFRESH_LOG_LIST_SUCCESS, REFRESH_LOG_LIST_FAILED } from '../actions';

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
		default:
			return state
	}
}

export default eventReducer;

export type ReducerState = ReturnType<typeof eventReducer>;