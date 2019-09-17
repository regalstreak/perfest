import { ActionTypes } from '../../library/interfaces/PendingTicketActionType';
import PendingTicketsType from '../../library/interfaces/PendingTicketsType';
import { ADD_TICKET_SUCCESS, ADD_TICKET_FAILED, REMOVE_FAILED_TICKET, ADD_LOG } from '../actions/ActionNames';

interface InitState {
	pendingTickets: PendingTicketsType[]
}

const initState: InitState = {
	pendingTickets: []
}

const ticketReducer = (state: InitState = initState, action: ActionTypes) => {
	switch (action.type) {
		case ADD_TICKET_SUCCESS:
			action.asyncDispatch({ type: ADD_LOG, ticket: action.meta })
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
		case REMOVE_FAILED_TICKET:
			let newList1 = state.pendingTickets.filter(ticket => {
				return !(action.ticket.email === ticket.email && action.ticket.event_id === ticket.event_id)
			});
			return{
				...state,
				pendingTickets: newList1
			}
		default:
			return state
	}
}

export default ticketReducer;

export type ReducerState = ReturnType<typeof ticketReducer>;