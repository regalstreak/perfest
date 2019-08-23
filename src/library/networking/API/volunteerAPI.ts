import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi';

export const assignEvent = (eventId: string, volunteerId: string, token: string) => {
	fetch(constants.BASE_URL + "/volunteer/assignEvent", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ eventId, volunteerId, token })
	})
		.then(res => res.json())
		.then((res: BasicApiType) => {
			if (res.success) {
				// Handle success
				console.log('Successful');
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

export const unassignEvent = (eventId: string, volunteerId: string, token: string) => {
	fetch(constants.BASE_URL + "/volunteer/unassignEvent", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ eventId, volunteerId, token })
	})
		.then(res => res.json())
		.then((res: BasicApiType) => {
			if (res.success) {
				// Handle success
				console.log('Successful');
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

export const deleteVolunteer = (volunteerId: string, token: string) => {
	fetch(constants.BASE_URL + "/volunteer/deleteVolunteer", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ volunteerId, token })
	})
		.then(res => res.json())
		.then(res => {
			if (res.success) {
				// Handle success
				console.log('Successful');
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