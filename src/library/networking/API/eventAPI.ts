import constants from '../constants';

export const getAllEvents = () => {
	fetch(constants.BASE_URL + "/event/list")
		.then(res => res.json())
		.then(res => {
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

export const getEvent = (eventId: string) => {
	fetch(constants.BASE_URL + "/event/" + eventId)
		.then(res => res.json())
		.then(res => {
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
		.then(res => {
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

export const editEvent = (event: FullEventType, token: string) => {
	fetch(constants.BASE_URL + "/event/add", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token, event })
	})
		.then(res => res.json())
		.then(res => {
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