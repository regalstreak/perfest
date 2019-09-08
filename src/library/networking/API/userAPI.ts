import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi';

interface LogType {
	vname: string,
	price: number,
	ename: string,
	date: Date,
}

interface GetLogsType extends BasicApiType {
	logList: LogType[],
	totalSold: number,
	totalCollected: number
}

export const getLogs = async (page: number, token: string) => {
	try {
		let res = await fetch(constants.BASE_URL + "/user/logs", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ page, token })
		});
		let response: GetLogsType = await res.json();
		return response;
	} catch (err) {
		return { success: false, logList: [{ vname: '', price: 0, ename: '' }], totalSold: 0, totalCollected: 0, error: err };
	}
}

interface UserType {
	_id: string,
	name: string,
	contact: string,
	college: string
}

interface GetUserVolListType extends BasicApiType {
	list: UserType[]
}

export const getUserVolList = (type: string, token: string) => {
	fetch(constants.BASE_URL + "/user/list", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ type, token })
	})
		.then(res => res.json())
		.then((res: GetUserVolListType) => {
			if (res.success) {
				return res;
			} else {
				// Handle error
				console.log('error');
			}
		})
		.catch(err => {
			// Handle error
			console.log('error');
		});
}

export const upgradeUser = (token: string) => {
	fetch(constants.BASE_URL + "/user/updateUser", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token })
	})
		.then(res => res.json())
		.then((res: BasicApiType) => {
			if (res.success) {
				return res;
			} else {
				// Handle error
				console.log('error');
			}
		})
		.catch(err => {
			// Handle error
			console.log('error');
		});
}

interface EventType {
	_id: string,
	name: string,
	description: string,
	date: Date,
	cost: {
		cost_1: number,
		cost_2?: number,
		cost_4?: number
	},
	image: string,
	venue: string,
}

interface GetAllTicketsType extends BasicApiType {
	ticketList: {
		valid: boolean,
		event: EventType
	}
}

export const getAllTickets = (token: string) => {
	fetch(constants.BASE_URL + "/user/getAllTickets", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token })
	})
		.then(res => res.json())
		.then((res: GetAllTicketsType) => {
			if (res.success) {
				return res;
			} else {
				// Handle error
				console.log('error');
			}
		})
		.catch(err => {
			// Handle error
			console.log('error');
		});
}

interface TicketType {
	valid: boolean,
	event: EventType,
	price: number,
	paid: number,
	balance: number,
	participantNo: number,
	date: Date
}

interface GetTicketByIdType extends BasicApiType {
	ticket: TicketType,
}

export const getTicketById = (userId: string, token: string) => {
	fetch(constants.BASE_URL + "/user/getTicketById", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ userId, token })
	})
		.then(res => res.json())
		.then((res: GetTicketByIdType) => {
			if (res.success) {
				return res;
			} else {
				// Handle error
				console.log('error');
			}
		})
		.catch(err => {
			// Handle error
			console.log('error');
		});
}

interface UserType {
	data: {
		name: string,
		password: string,
		contact: {
			email: string,
			phone: string,
		},
		college: {
			name: string,
			department: string,
			year: string
		},
		type: boolean,
		csi_member: boolean
	}
}

export const updateUserProfile = async (data: UserType) => {
	try {
		let res = await fetch(constants.BASE_URL + "/user/updateProfile", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ data })
		});
		let response: BasicApiType = await res.json();
		return response;
	} catch (err) {
		return { success: false, error: err };
	}
}

interface AnonymousUserType {
	"_id": string,
	"college": {
		"name": null,
		"department": null,
		"year": null
	},
	"name": null,
	"password": null,
	"type": boolean,
	"csi_member": boolean,
	"tickets": string[] | [],
	"contact": {
		"email": string
	}
}

interface GetAnonymousUserDetailsType extends BasicApiType {
	user: AnonymousUserType;
}

export const getAnonymousUserDetails = async (userId: string) => {
	try {
		let res = await fetch(constants.BASE_URL + "/user/getAnonymousUserDetails", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ userId })
		});
		let response: GetAnonymousUserDetailsType = await res.json();
		return response;
	} catch (err) {
		return { success: false, user: { _id: '', college: { name: null, department: null, year: null }, name: null, password: null, type: false, csi_member: false, tickets: [], contact: { email: '' } }, error: err };
	}
}