import { userConstants } from '../constants';

const initialState = {
    posts: null,
    loading: true
};

export function posts(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_ALL_POSTS_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_ALL_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.posts
            };
        case userConstants.GET_ALL_POSTS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}