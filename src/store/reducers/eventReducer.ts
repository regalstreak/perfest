import { ActionTypes } from '../../library/interfaces/EventActionType';
import EventType from '../../library/interfaces/EventType';
import { REFRESH_EVENT_LIST, REFRESH_EVENT_LIST_SUCCESS, REFRESH_EVENT_LIST_FAILED } from '../actions';

interface InitState {
	eventList: EventType[]
}

const initState: InitState = {
	eventList: []
}

const eventReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case REFRESH_EVENT_LIST:
			return state
		case REFRESH_EVENT_LIST_SUCCESS:
			return {
				...state,
				eventList: action.payload.eventList
			}
		case REFRESH_EVENT_LIST_FAILED:
			return state
		default:
			return state
	}
}

export default eventReducer;

export type ReducerState = ReturnType<typeof eventReducer>;