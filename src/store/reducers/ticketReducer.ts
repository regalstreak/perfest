import { ActionTypes } from '../../library/interfaces/PendingTicketActionType';
import PendingTicketsType from '../../library/interfaces/PendingTicketsType';
import { ADD_TICKET_SUCCESS, ADD_TICKET_FAILED } from '../actions';

interface InitState {
	pendingTickets: PendingTicketsType[]
}

const initState: InitState = {
	pendingTickets: []
}

const ticketReducer = (state: InitState = initState, action: ActionTypes) => {
	console.log(action);
	switch (action.type) {
		case ADD_TICKET_SUCCESS:
			let newList = state.pendingTickets.filter(ticket => {
				return !(action.meta.email === ticket.email && action.meta.event_id === ticket.event_id)
			});
			return {
				...state,
				pendingTickets: newList
			}
		case ADD_TICKET_FAILED:
			return {
				...state,
				pendingTickets: [...state.pendingTickets, action.meta]
			};
		default:
			return state
	}
}

export default ticketReducer;

export type ReducerState = ReturnType<typeof ticketReducer>;