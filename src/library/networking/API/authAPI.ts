import constants from '../constants';
import { BasicApiType } from '../../interfaces/BasicApi';

export const onSubmitSignup = async (email: string, phone: string, password: string) => {
	try {
		let res = await fetch(constants.BASE_URL + "/auth/createUser", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ phone, email, password })
		})
		let response: BasicApiType = await res.json();
		return response;
	} catch (err) {
		return { success: false, error: err };
	}
}

interface LoginType extends BasicApiType {
	token: string
}

export const onSubmitLogin = async (email: string, password: string, ) => {
	try {
		let res = await fetch(constants.BASE_URL + "/auth/login", {
			method: 'POST',
			headers: constants.defaultHeaders,
			body: JSON.stringify({ email, password })
		})
		let response: LoginType = await res.json();
		return response;
	} catch (err) {
		return { success: false, token: '', error: err };
	}
}