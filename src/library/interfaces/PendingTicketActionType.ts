import PendingTicketsType from './PendingTicketsType';

interface AddPendingTicket {
	type: string,
	meta: PendingTicketsType,
	payload: string
}

interface DeletePendingTicket {
	type: string,
	meta: PendingTicketsType,
	payload: string
}

export type ActionTypes = AddPendingTicket & DeletePendingTicket;