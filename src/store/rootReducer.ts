import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import ticketReducer from './reducers/ticketReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	ticket: ticketReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;