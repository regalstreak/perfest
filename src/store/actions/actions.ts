import {
    REFRESH_EVENT_LIST, REFRESH_EVENT_LIST_SUCCESS, REFRESH_EVENT_LIST_FAILED,
    REFRESH_LOG_LIST, REFRESH_LOG_LIST_FAILED, REFRESH_LOG_LIST_SUCCESS,
    ADD_TICKET, ADD_TICKET_FAILED, ADD_TICKET_SUCCESS
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

interface tryissueticketpayloadInterface {
    name: string;
    phone: number;
    email: string;
    event_id: string;
    price: number;
    paid: number;
    participantNo: number;
    college: {
        name: string,
        year: string,
        branch: string
    };
    csi_member: boolean;
    token: string;
}

export const tryIssueTicket = (payload: tryissueticketpayloadInterface) => ({
    type: ADD_TICKET,
    payload,
    meta: {
        offline: {
            effect: {
                url: constants.BASE_URL + '/ticket/issue', method: 'POST',
                // json: { email, event_id, price, paid, participantNo, token }
                json: payload
            },
            commit: { type: ADD_TICKET_SUCCESS, meta: payload },
            rollback: { type: ADD_TICKET_FAILED, meta: payload }
        }
    }
});