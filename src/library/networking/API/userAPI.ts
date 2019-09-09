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
	let response: GetLogsType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/logs", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ page, token })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, logList: [{ vname: '', price: 0, ename: '', date: new Date() }], totalSold: 0, totalCollected: 0, error: err };
		return response;
	}
}

interface UserTypeMin {
	_id: string,
	name: string,
	email: string
}

interface GetUserVolListType extends BasicApiType {
	list: UserTypeMin[]
}

export const getUserVolList = async (type: string, token: string) => {
	let response: GetUserVolListType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/list", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ token, type })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, list: [{ _id: '', name: '', email: '' }], error: err };
		return response;
	}
}

export const upgradeUserToVolunteer = async (token: string, email: string) => {
	let response: BasicApiType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/updateUser", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ token, email })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, error: err };
		return response;
	}
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
		valid: boolean;
		event: EventType;
	}[]
}

export const getAllTickets = async (token: string) => {
	let response: GetAllTicketsType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/getAllTickets", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ token })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, ticketList: [{ valid: false, event: { _id: '', name: '', description: '', date: new Date(), cost: { cost_1: 0, cost_2: 0, cost_4: 0 }, image: '', venue: '' } }], error: err };
		return response;
	}
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

export const getTicketById = async (userId: string, token: string) => {
	let response: GetTicketByIdType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/getTicketById", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ userId, token })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, ticket: { valid: false, event: { _id: '', name: '', description: '', date: new Date(), cost: { cost_1: 0, cost_2: 0, cost_4: 0 }, image: '', venue: '', }, price: 0, paid: 0, balance: 0, participantNo: 0, date: new Date() }, error: err };
		return response;
	}
}

interface UserType {
	userId: string;
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
	let response: BasicApiType
	try {
		let res = await fetch(constants.BASE_URL + "/user/updateProfile", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify(data)
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, error: err };
		return response;
	}
}

interface AnonymousUserType {
	_id?: string,
	college?: {
		name: null | string,
		department: null | string,
		year: null | string
	},
	name?: null | string,
	password?: null | string,
	type?: boolean,
	csi_member?: boolean,
	tickets?: string[] | [],
	contact?: {
		email: string;
		phone?: string;
	}
}

interface GetAnonymousUserDetailsType extends BasicApiType {
	user: AnonymousUserType;
}

export const getAnonymousUserDetails = async (userId: string) => {
	let response: GetAnonymousUserDetailsType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/getAnonymousUserDetails", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ userId })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, user: { _id: '', college: { name: null, department: null, year: null }, name: null, password: null, type: false, csi_member: false, tickets: [], contact: { email: '' } }, error: err };
		return response;
	}
}

interface UpgradeAnonymousToUserType extends BasicApiType {
	token: string;
}

export const upgradeAnonymousToUser = async (userId: string, data: AnonymousUserType) => {
	let response: UpgradeAnonymousToUserType;
	try {
		let res = await fetch(constants.BASE_URL + "/user/upgradeAnonymousToUser", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ userId, data })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, token: '', error: err };
		return response;
	}
}