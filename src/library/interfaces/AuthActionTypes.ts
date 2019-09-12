interface AddTokenAction {
	type: string,
	token: string,
	userId: string,
	userType: string
}

interface DeleteTokenAction {
	type: string
}

export type ActionTypes = AddTokenAction & DeleteTokenAction;