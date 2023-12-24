import axios from "../axios/axios";

const fetchAllUser = () => {
    return axios.get('/api/users')
}

export { fetchAllUser }