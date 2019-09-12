import EventType from '../interfaces/EventType';

interface RefreshEventListAction {
	type: string,
	payload: {
		eventList: EventType[]
	}
}

export type ActionTypes = RefreshEventListAction;