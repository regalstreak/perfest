import { ActionTypes } from '../../library/interfaces/EventActionType';
import EventType from '../../library/interfaces/EventType';
import { REFRESH_EVENT_LIST, REFRESH_EVENT_LIST_SUCCESS, REFRESH_EVENT_LIST_FAILED } from '../actions';

interface InitState {
	eventList: EventType[] | []
}

const initState: InitState = {
	eventList: []
}

const ticketReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case REFRESH_EVENT_LIST:
			return state
		case REFRESH_EVENT_LIST_SUCCESS:
			console.log(action);
			return {
				...state,
				eventList: action.payload.eventList
			}
		case REFRESH_EVENT_LIST_FAILED:
			return state
		default:
			console.log(action);
			console.log(state);
			return state
	}
}

export default ticketReducer;

export type ReducerState = ReturnType<typeof ticketReducer>;