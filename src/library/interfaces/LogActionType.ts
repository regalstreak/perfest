import LogType from '../interfaces/LogType';
import PendingTicketsType from './PendingTicketsType';

interface RefreshLogListAction {
	type: string,
	payload: {
		logList: LogType[],
		totalSold: number,
		totalCollected: number,
		totalBalance: number
	}
}

interface AddLogAction {
	type: string,
	ticket: PendingTicketsType & { eventName: string }
}

export type ActionTypes = RefreshLogListAction & AddLogAction;