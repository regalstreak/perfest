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
	if (!email && !phone) {
		// handle error
		return false;
	} else if (!password) {
		// handle error
		return false;
	}
	return true;
}