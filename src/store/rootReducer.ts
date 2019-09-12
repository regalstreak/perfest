import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import ticketReducer from './reducers/ticketReducer';
import eventReducer from './reducers/eventReducer';
import logReducer from './reducers/logReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	ticket: ticketReducer,
	events: eventReducer,
	logs: logReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;