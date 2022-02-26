import { userConstants } from '../constants';

export function successAction(user) {
    localStorage.setItem("user", JSON.stringify(user));
    return { type: userConstants.LOGIN_SUCCESS, user }
}

export function failureAction(error) { return { type: userConstants.LOGIN_FAILURE, error } }
export function loginRequestAction() { return { type: userConstants.LOGIN_REQUEST } }
export function logountAction() { return { type: userConstants.LOGOUT } }

export function registerSuccessAction() { return { type: userConstants.REGISTER_SUCCESS } }

// Users
export function getAllUserRequestAction() { return { type: userConstants.GETALL_REQUEST } }
export function getAllUserSuccessAction(users) { return { type: userConstants.GETALL_SUCCESS, users } }

// Posts
export function getAllPostsRequestAction() { return { type: userConstants.GET_ALL_POSTS_REQUEST } }
export function getAllPostsSuccessAction(posts) { return { type: userConstants.GET_ALL_POSTS_SUCCESS, posts } }
export function getAllPostsFailureAction(error) { return { type: userConstants.GET_ALL_POSTS_FAILURE, error } }