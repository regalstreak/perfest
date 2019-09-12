import { ActionTypes } from '../../library/interfaces/PendingTicketActionType';
import PendingTicketsType from '../../library/interfaces/PendingTicketsType';

interface InitState {
	pendingTickets: PendingTicketsType[]
}

const initState: InitState = {
	pendingTickets: []
}

const ticketReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case 'ADD_TICKET_SUCCESS':
			console.log(action)
			console.log(state);
			let newList = state.pendingTickets.filter(ticket => {
				return !(action.meta.email === ticket.email && action.meta.event_id === ticket.event_id)
			});
			return {
				...state,
				pendingTickets: newList
			}
		case 'ADD_TICKET_FAILED':
			console.log(action)
			console.log(state);
			return {
				...state,
				pendingTickets: [...state.pendingTickets, action.meta]
			};
		default:
			console.log(action);
			console.log(state);
			return state
	}
}

export default ticketReducer;

export type ReducerState = ReturnType<typeof ticketReducer>;