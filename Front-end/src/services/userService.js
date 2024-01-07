import axios from "../axios/axios";


const fetchAllUser = () => {
    return axios.get('/api/users')
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


export { fetchAllUser, fetchAllGender, login, getUserAccount }