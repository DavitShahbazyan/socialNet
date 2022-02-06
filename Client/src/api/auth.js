import axios from './axios';

export function login({ email, password }) {
    return axios.post('auth/login', { email, password });
}


export function registration({ email,
    password,
    agreement,
    gender,
    nickname,
    phone,
    prefix, }) {
    return axios.post('auth/register', {
        email,
        password,
        agreement,
        gender,
        nickname,
        phone,
        prefix,
    });
}