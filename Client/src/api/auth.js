import axios from './axios';

export function login({ email, password }) {
    return axios.post('auth/login', { email, password });
}


export function registration({ email, password }) {
    return axios.post('auth/register', { email, password });
}