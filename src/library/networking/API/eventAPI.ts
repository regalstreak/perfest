import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi'
// import EventType from '../../interfaces/EventType';

// interface GetAllEventsType extends BasicApiType {
// 	eventList: EventType[]
// }

// export const getAllEvents = async () => {
// 	let response: GetAllEventsType;
// 	try {
// 		let res = await fetch(constants.BASE_URL + '/event/list');
// 		response = await res.json();
// 		return response;
// 	} catch (err) {
// 		response = { success: false, eventList: [{ _id: '', name: 'Loading...', description: '', date: '', cost_1: 0, cost_2: 0, cost_4: 0, image: '', venue: '' }], error: err };
// 		return response;
// 	}
// }

interface EventsDropdownType {
	'_id': string;
	name: string;
	cost_CSI: {
		cost_1: number;
		cost_2?: number;
		cost_4?: number;
	}
	cost_nonCSI: {
		cost_1: number;
		cost_2?: number;
		cost_4?: number;
	}

}

interface GetAllEventsDropdownType extends BasicApiType {
	eventList: EventsDropdownType[];
}

export const getAllEventsDropdown = async () => {
	let response: GetAllEventsDropdownType;
	try {
		let res = await fetch(constants.BASE_URL + '/event/dropdownList');
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, eventList: [{ name: 'Loading...', _id: '', cost_CSI: { cost_1: 0 }, cost_nonCSI: { cost_1: 0 } }], error: err };
		return response;
	}
}

// interface GetEventType extends BasicApiType {
// 	event: EventType,
// }

// export const getEvent = async (name: string) => {
// 	let response: GetEventType;
// 	try {
// 		let res = await fetch(constants.BASE_URL + "/event/" + name);
// 		response = await res.json();
// 		return response;
// 	} catch (err) {
// 		response = { success: false, event: { _id: '', name: 'Loading...', description: '', date: '', cost_1: 0, cost_2: 0, cost_4: 0, image: '', venue: '' }, error: err };
// 		return response;
// 	}
// }

// interface PostEventType {
// 	name: string,
// 	description: string,
// 	date: Date,
// 	cost: {
// 		cost_1: number,
// 		cost_2?: number,
// 		cost_4?: number
// 	},
// 	image: string,
// 	venue: string,
// }

// export const addEvent = (event: PostEventType, token: string) => {
// 	fetch(constants.BASE_URL + "/event/add", {
// 		method: 'POST',
// 		headers: constants.defaultHeaders,
// 		body: JSON.stringify({ token, event })
// 	})
// 		.then(res => res.json())
// 		.then((res: BasicApiType) => {
// 			if (res.success) {
// 				// Handle success
// 				console.log('event added successfully');
// 			} else {
// 				// Handle error
// 				console.log('error');
// 			}
// 		})
// 		.catch(err => {
// 			// Handle error
// 			console.log('error');
// 		});
// }

// export const editEvent = (event: any, token: string) => {
// 	fetch(constants.BASE_URL + "/event/add", {
// 		method: 'POST',
// 		headers: constants.defaultHeaders,
// 		body: JSON.stringify({ token, event })
// 	})
// 		.then(res => res.json())
// 		.then((res: BasicApiType) => {
// 			if (res.success) {
// 				// Handle success
// 				console.log('event edited successfully');
// 			} else {
// 				// Handle error
// 				console.log('error');
// 			}
// 		})
// 		.catch(err => {
// 			// Handle error
// 			console.log('error');
// 		});
// }

export const a = 0;