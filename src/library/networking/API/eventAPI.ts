import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi'

// Check _id type
interface FullEventType {
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

interface GetAllEventsType extends BasicApiType {
	eventList: FullEventType[]
}

export const getAllEvents = () => {
	fetch(constants.BASE_URL + "/event/list")
		.then(res => res.json())
		.then((res: GetAllEventsType) => {
			if (res.success) {
				// Handle success
				console.log('success');
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

interface EventsDropdownType {
	'_id': string;
	name: string;
	cost_1: number;
	cost_2: number;
	cost_4: number;
}

interface GetAllEventsDropdownType extends BasicApiType {
	eventList: EventsDropdownType[];
}

export const getAllEventsDropdown = async () => {
	try {
		let res = await fetch(constants.BASE_URL + '/event/dropdownList');
		let response: GetAllEventsDropdownType = await res.json();
		return response;
	} catch (err) {
		const eventList = [{ _id: '', name: 'Loading...', cost_1: 0, cost_2: 0, cost_4: 0 }];
		return { success: false, eventList, error: err };
	}
}

interface GetEventType extends BasicApiType {
	event: FullEventType,
}

export const getEvent = (eventId: string) => {
	fetch(constants.BASE_URL + "/event/" + eventId)
		.then(res => res.json())
		.then((res: GetEventType) => {
			if (res.success) {
				// Handle success
				console.log('success');
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

export const addEvent = (event: EventType, token: string) => {
	fetch(constants.BASE_URL + "/event/add", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token, event })
	})
		.then(res => res.json())
		.then((res: BasicApiType) => {
			if (res.success) {
				// Handle success
				console.log('event added successfully');
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

export const editEvent = (event: FullEventType, token: string) => {
	fetch(constants.BASE_URL + "/event/add", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token, event })
	})
		.then(res => res.json())
		.then((res: BasicApiType) => {
			if (res.success) {
				// Handle success
				console.log('event edited successfully');
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