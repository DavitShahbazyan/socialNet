import axios from './axios';
import { userActions } from './../actions/user.actions';

const API_URL = "http://localhost:5000/api/auth/";

const login = async ({ email, password }) => {
    const response = await axios.post(API_URL + "login", {
        email,
        password,
    });
    if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data
};

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + "register", { firstName, lastName, email, password });
}

const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
};

const getPosts = () => {
    return axios.get("http://localhost:5000/api/login");
}

const getUsers = () => {
    return axios.get("http://localhost:5000/api/allusers");
}

const authService = {
    register,
    login,
    logout,
    getPosts,
    getUsers
}

export default authService;
