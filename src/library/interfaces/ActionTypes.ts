interface AddTokenAction {
	type: string,
	token: string
}

interface DeleteTokenAction{
	type: string
}

export type ActionTypes = AddTokenAction & DeleteTokenAction;