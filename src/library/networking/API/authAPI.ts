import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi';

export const onSubmitSignup = async (email: string, phone: string, password: string) => {
	let response: BasicApiType;
	try {
		let res = await fetch(constants.BASE_URL + "/auth/createUser", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ phone, email, password })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, error: err };
		return response;
	}
}

interface LoginType extends BasicApiType {
	token: string
}

export const onSubmitLogin = async (email: string, password: string, ) => {
	let response: LoginType;
	try {
		let res = await fetch(constants.BASE_URL + "/auth/login", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ email, password })
		});
		response = await res.json();
		return response;
	} catch (err) {
		response = { success: false, token: '', error: err };
		return response;
	}
}