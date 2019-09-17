import {
    REFRESH_EVENT_LIST, REFRESH_EVENT_LIST_SUCCESS, REFRESH_EVENT_LIST_FAILED,
    REFRESH_LOG_LIST, REFRESH_LOG_LIST_FAILED, REFRESH_LOG_LIST_SUCCESS,
} from './ActionNames';
import constants from '../../library/networking/constants';

export const getLatestEvents = () => ({
    type: REFRESH_EVENT_LIST,
    payload: {},
    meta: {
        offline: {
            effect: { url: constants.BASE_URL + '/event/list', method: 'GET' },
            commit: { type: REFRESH_EVENT_LIST_SUCCESS, meta: {} },
            rollback: { type: REFRESH_EVENT_LIST_FAILED, meta: {} }
        }
    }
});

export const getLatestLogs = (token: string) => ({
    type: REFRESH_LOG_LIST,
    payload: { token },
    meta: {
        offline: {
            effect: { url: constants.BASE_URL + '/user/logs', method: 'POST', json: { token, page: 1 /* Try to make this dynamic */ } },
            commit: { type: REFRESH_LOG_LIST_SUCCESS, meta: {} },
            rollback: { type: REFRESH_LOG_LIST_FAILED, meta: {} }
        }
    }
});