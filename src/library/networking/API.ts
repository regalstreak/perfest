import constants from './constants';
import { validateSignup } from '../utils/utils';


export const onSubmitSignup = (email: string, phone: string, password: string) => {
	if (validateSignup(email, phone, password)) {
		// Change url
		fetch(constants.BASE_URL + "/auth/createanonymous", {
			method: 'POST',
			headers: constants.defaultHeaders,
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