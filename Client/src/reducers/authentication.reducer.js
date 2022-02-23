import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user, loading: false } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loading: true,
                loggedIn: false,
                user: {}
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loading: false,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.REGISTER_SUCCESS:
            return {
                loading: false,
                loggedIn: false,
                user: {}
            };
        default:
            return state
    }
}