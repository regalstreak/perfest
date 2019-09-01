import jwt_decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';


export const validateSignup = (email: string, phone: string, password: string) => {
	if (!email && !phone) {
		// handle error
		return false;
	} else if (!password) {
		// handle error
		return false;
	}
	return true;
}

export const validateLogin = (email: string, phone: string, password: string) => {
	if (password && (email || phone)) {
		// handle success
		return true;
	} else {
		// handle error
		return false;
	}
}

interface TokenType {
	type: string,
	userId: string
}

export const getUserType = async () => {
	let userType: string, token: string | null;
	try {
		token = await AsyncStorage.getItem('token');
		if (token) {
			userType = jwt_decode<TokenType>(token).type;
			return userType;
		}
	} catch (err) {
		console.log(err)
	}
}