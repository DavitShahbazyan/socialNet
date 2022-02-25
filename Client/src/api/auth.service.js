import axios from './axios';

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

const createPosts = (data) => {
    return axios.post("http://localhost:5000/api/posts", data);
}

const getCountres = () => {
    return axios.get('https://restcountries.com/v3.1/all');
}

const addComment = (data) => {
    return axios.post('http://localhost:5000/api/comment', data);
}

const postLike = (data) => {
    return axios.post('http://localhost:5000/api/postLike', data);
}

const authService = {
    register,
    login,
    logout,
    getPosts,
    getUsers,
    createPosts,
    getCountres,
    addComment,
    postLike
}

export default authService;
