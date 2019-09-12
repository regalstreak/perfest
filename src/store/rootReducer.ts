import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import ticketReducer from './reducers/ticketReducer';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	ticket: ticketReducer,
	events: eventReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;