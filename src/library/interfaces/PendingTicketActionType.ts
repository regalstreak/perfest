import PendingTicketsType from './PendingTicketsType';

interface AddPendingTicket {
	type: string,
	meta: PendingTicketsType,
	payload: string,
	asyncDispatch: any
}

interface DeletePendingTicket {
	type: string,
	meta: PendingTicketsType,
	payload: string,
	asyncDispatch: any;
}

interface RemoveFailedTicket{
	type: string,
	ticket: PendingTicketsType,
	asyncDispatch: any;
}

export type ActionTypes = AddPendingTicket & DeletePendingTicket & RemoveFailedTicket;