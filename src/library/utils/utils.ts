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


export const validateEmail = (email: string): boolean => {
	// let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const validateTicketIssue = (
	name: string, college: string,
	email: string, phone: number,
	event_id: string, participantNo: number,
	membership: string, price: number, paid: number) => {
	if (name && college && email && phone && event_id && participantNo && membership && price && paid) {
		if (validateEmail(email) && paid <= price) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}


export const getFormattedDateAndTime = (dateString: string) => {
	let date = new Date(dateString);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	let finalMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
	let strTime = hours + ':' + finalMinutes + ' ' + ampm;
	let currentDate = date.getDate();
	let month = date.toLocaleString('default', { month: 'short' });
	// let year = date.getFullYear();
	dateString = currentDate + ' ' + month;
	return [dateString, strTime];
}