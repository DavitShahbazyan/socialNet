import axios from './axios';

const API_URL = "http://localhost:5000/api/auth/";

const login = async ({ email, password }) => {
    const response = await axios.post(API_URL + "login", {
        email,
        password,
    });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.Data.user));
    }
    return response.data;
};

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + "register", { firstName, lastName, email, password });
}

const logout = () => {
    localStorage.removeItem("user");
};

const getPosts = () => {
    return axios.get("http://localhost:5000/api/login");
}

const authService = {
    register,
    login,
    logout,
    getPosts
}

export default authService;
