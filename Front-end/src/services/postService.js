import axios from "../axios/axios";


const fetchAllPost = (page, limit) => {
    return axios.get(`/api/get-posts?page=${page}&limit=${limit}`)
}

const fetchAllPostWithoutPage = () => {
    return axios.get(`/api/get-posts`)
}

const fetchPostsByType = (type) => {
    return axios.get(`/api/get-posts-by-type?postType=${type}`)
}

const deletePost = (post) => {
    return axios.delete('/api/delete-post', { data: { post: post } })
}

const getDataUpdatePost = (data) => {
    return axios.get(`/api/get-post?postId=${data.postId}`)
}

const createPost = (data) => {
    return axios.post(`/api/create-post`, { data: data })
}

const updatePost = (id, data) => {
    return axios.put(`/api/update-post?postId=${id}`, { data: data })
}

const uploadImage = (data) => {
    return axios.post(`/api/upload-image`, data)
}

export {
    fetchAllPost,
    fetchAllPostWithoutPage,
    deletePost,
    getDataUpdatePost,
    updatePost,
    createPost,
    uploadImage,
    fetchPostsByType
}