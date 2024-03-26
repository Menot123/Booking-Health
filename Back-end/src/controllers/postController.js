import postService from '../services/postService';

// Get all posts
const getAllPost = async(req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await postService.getPostsPagination(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await postService.getAllPostService()
                // console.log(data)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get all posts')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get post with id
const getPostWithId = async(req, res, next) => {
    try {
        let postId = req.query.postId;
        if (postId) {
            let response = await postService.getPostWithIdService(postId)
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get one post')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get posts by type
const getPostsWithType = async(req, res, next) => {
    try {
        let postType = req.query.postType;
        if (postType) {
            let response = await postService.getPostsByType(postType)
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get posts by type')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


// Create post
const handleCreatePost = async(req, res, next) => {
    try {
        let dataSend = req.body.data
        let response = await postService.createPostService(dataSend)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create post')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


// Update post
const handleUpdatePost = async(req, res, next) => {
    try {
        // console.log(req.body)
        let id = req.query.postId
        let data = req.body.data
            // console.log(data)
            // console.log(postId)
        let response = await postService.updatePostService(id, data)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update post')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Update post count + 1
const handleUpdatePostViewCount = async(req, res, next) => {
    try {
        console.log(req.query.postId)
        let id = req.query.postId
            // console.log(data)
            // console.log(postId)
        let response = await postService.postViewCountAddOne(id)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update post view count')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Delete post
const handleDeletePost = async(req, res, next) => {
    try {
        console.log(req.body)
        let post = req.body.post
            // console.log(postId)
        let response = await postService.deletePostService(post)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from delete post')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Upload Image to Cloud
const uploadImage = (req, res) => {
    try {
        console.log(req.file);
        return res.status(200).json({
            EM: "Upload Ok",
            EC: 0,
            DT: req.file.path
        })

    } catch (e) {
        console.log('Something went wrong from upload image')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get all posts
const getPostsWithPopular = async(req, res, next) => {
    try {
        let data = await postService.getPostsByPopular()
            // console.log(data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log('Something went wrong from get popular posts')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


// Chatbot
// Get all posts
const getAllPostChatbot = async(req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await postService.getPostsPagination(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await postService.getAllPostServiceChatbot()
                // console.log(data)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get all posts')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get post with id
const getPostWithIdChatbot = async(req, res, next) => {
    try {
        let postId = req.query.postId;
        if (postId) {
            let response = await postService.getPostWithIdServiceChatbot(postId)
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get one post')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get posts by type
const getPostsWithTypeChatbot = async(req, res, next) => {
    try {
        let postType = req.query.postType;
        if (postType) {
            let response = await postService.getPostsByTypeChatbot(postType)
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
    } catch (e) {
        console.log('Something went wrong from get posts by type')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

// Get all posts
const getPostsWithPopularChatbot = async(req, res, next) => {
    try {
        let data = await postService.getPostsByPopularChatbot()
            // console.log(data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log('Something went wrong from get popular posts')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    getAllPost,
    handleDeletePost,
    getPostWithId,
    getPostsWithType,
    getPostsWithPopular,
    handleUpdatePost,
    handleCreatePost,
    uploadImage,
    handleUpdatePostViewCount,
    getAllPostChatbot,
    getPostsWithTypeChatbot,
    getPostsWithPopularChatbot,
    getPostWithIdChatbot
}