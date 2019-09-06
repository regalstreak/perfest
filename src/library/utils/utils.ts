import jwt_decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';

export const validateSignup = (email: string, phone: string, password: string) => {
	if (!email && !phone) {
		return false;
	} else if (!password) {
		return false;
	}
	return true;
}

export const validateLogin = (email: string, phone: string, password: string) => {
	if (password && (email || phone)) {
		return true;
	} else {
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

export const validateTicketIssue = (email: string, event_id: string, price: number, paid: number, participantNo: number) => {
	if (email && event_id && price && paid && participantNo) {
		
		return true;
	} else {
		return false;
	}
}