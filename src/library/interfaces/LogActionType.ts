import LogType from '../interfaces/LogType';

interface RefreshLogListAction {
	type: string,
	payload: {
		logList: LogType[],
		totalSold: number,
		totalCollected: number
	}
}

export type ActionTypes = RefreshLogListAction;