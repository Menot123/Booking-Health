import axios from "../axios/axios";


const fetchAllUser = (page, limit) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`)
}

const fetchAllGender = (type) => {
    return axios.get(`/api/type-role?type=${type}`)
}

const login = (username, password) => {
    return axios.post('/api/login', { username, password })
}

const getUserAccount = () => {
    return axios.get('/api/account')
}

const createNewUser = (data) => {
    return axios.post('/api/create-user', { data })
}

export { fetchAllUser, fetchAllGender, login, getUserAccount, createNewUser }