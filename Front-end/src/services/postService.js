import axios from "../axios/axios";


const fetchAllPost = (page, limit) => {
    return axios.get(`/api/get-posts?page=${page}&limit=${limit}`)
}

const deletePost = (post) => {
    return axios.delete('/api/delete-post', { data: { post: post } })
}

export {
    fetchAllPost, deletePost
}