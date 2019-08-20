const BASE_URL = 'http://localhost:3001';

const validateSignup = (email: string, phone: string, password: string) => {
	if (!email && !phone) {
		// handle error
		return false;
	} else if (!password) {
		// handle error
		return false;
	}
	return true;
}

export const onSubmitSignup = (email: string, phone: string, password: string) => {
	if (validateSignup(email, phone, password)) {
		// Change url
		fetch(BASE_URL + "/auth/createanonymous", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify({ phone, email, password })
		})
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
}