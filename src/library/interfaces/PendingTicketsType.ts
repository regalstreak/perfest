interface PendingTicketsType {
	name: string;
	email: string;
	event_id: string;
	price: number;
	participantNo: number;
	token: string;
	paid: number;
	college: any;
	phone: number;
	csi_member: boolean;
}

export default PendingTicketsType;