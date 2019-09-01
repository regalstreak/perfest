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