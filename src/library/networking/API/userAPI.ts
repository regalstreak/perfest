import constants from '../constants';

export const getLogs = (page: number, token: string) => {
	fetch(constants.BASE_URL + "/ticket/invalidate", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ page, token })
	})
		.then(res => res.json())
		.then(res => {
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

export const getUserVolList = (type: string, token: string) => {
	fetch(constants.BASE_URL + "/user/list", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ type, token })
	})
		.then(res => res.json())
		.then(res => {
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
		.then(res => {
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

export const getAllTickets = (token: string) => {
	fetch(constants.BASE_URL + "/user/getAllTickets", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ token })
	})
		.then(res => res.json())
		.then(res => {
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

export const getTicketById = (userId: string, token: string) => {
	fetch(constants.BASE_URL + "/user/getTicketById", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ userId, token })
	})
		.then(res => res.json())
		.then(res => {
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

export const updateUserProfile = (data: UserType, token: string) => {
	fetch(constants.BASE_URL + "/user/upddateProfile", {
		method: 'POST',
		headers: constants.defaultHeaders,
		body: JSON.stringify({ data, token })
	})
		.then(res => res.json())
		.then(res => {
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