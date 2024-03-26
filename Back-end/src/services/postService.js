import db from '../models/index'
const { Op } = require("sequelize");

// Get all post
const getAllPostService = async () => {
    try {
        let res = {}
        let posts = await db.Post.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })

        if (posts) {
            res.EC = 0
            res.EM = 'Get all posts successfully'
            res.DT = posts
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all posts failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}

// Get posts with pagination
const getPostsPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Post.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })

        let pages = Math.ceil(count / limit)

        let response = {
            totalRows: count,
            totalPage: pages,
            posts: rows
        }

        return {
            EM: 'Get posts pagination successful',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getPostsPagination service',
            EC: 1,
            DT: {}
        }
    }
}

// Get post with post ID
const getPostWithIdService = async (postId) => {
    try {
        let res = {}
        let post = await db.Post.findOne({
            order: [['createdAt', 'DESC']],
            where: {
                id: postId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })
        if (post) {
            // console.log(post)
            res.EC = 0
            res.EM = `Get post with id ${postId} successfully`
            res.DT = { post }
        } else {
            res.EC = 1
            res.EM = `Post with id ${postId} not found`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get post from id service',
            EC: 1,
            DT: ''
        }
    }
}

// Get post by popular
const getPostsByPopular = async () => {
    try {
        let res = {}
        let posts = await db.Post.findAll({
            order: [
                ['viewCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })

        if (posts) {
            res.EC = 0
            res.EM = 'Get posts by popular successfully'
            res.DT = posts
            return res
        } else {
            res.EC = 1
            res.EM = 'Get posts by popular failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}

// Get post with post type
const getPostsByType = async (type) => {
    try {
        let res = {}
        let post = await db.Post.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                type: type,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })
        if (post) {
            // console.log(post)
            res.EC = 0
            res.EM = `Get post with type ${type} successfully`
            res.DT = { post }
        } else {
            res.EC = 1
            res.EM = `Post with type ${type} not found`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get post from id service',
            EC: 1,
            DT: ''
        }
    }
}

// Create post Service
const createPostService = async (postData) => {
    try {
        let res = {}
        if (postData) {
            let checkDuplicate = await db.Post.findOne({
                where: { title: postData.title }
            })
            if (checkDuplicate) {
                res.EC = 2
                res.EM = 'Post already exists'
                res.DT = {}

            } else {
                await db.Post.create(postData)
                res.EC = 0
                res.EM = 'Create post successfully'
                res.DT = {}
            }
        } else {
            res.EC = 1
            res.EM = 'Create post failed'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with createPostService service',
            EC: 1,
            DT: ''
        }
    }
}

// Update post service
const updatePostService = async (id, data) => {
    try {
        let res = {}
        let post = await db.Post.findOne({
            where: { id: id }
        })
        // console.log(post)
        if (post) {
            // console.log(post)
            await post.update({ ...data })
            res.EC = 0
            res.EM = `Update post with id ${id} successfully`
            res.DT = {}
        } else {
            res.EC = 1
            res.EM = `Update post failed`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update post service',
            EC: 1,
            DT: ''
        }
    }
}

// Post view count + 1
const postViewCountAddOne = async (id) => {
    try {
        let res = {}
        let post = await db.Post.findOne({
            where: { id: id },
        })
        // console.log(post)
        if (post) {
            const view = post.dataValues.viewCount
            const currentUpdateAt = post.dataValues.updatedAt
            // console.log(currentUpdateAt)
            await post.update(
                { viewCount: view + 1 },
                { silent: true }
            )
            res.EC = 0
            res.EM = `Update post view count with id ${id} successfully`
            res.DT = {}
        } else {
            res.EC = 1
            res.EM = `Update post view count failed`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update post service',
            EC: 1,
            DT: ''
        }
    }
}

// Delete post
const deletePostService = async (postDelete) => {
    try {
        let { postId } = postDelete
        let res = {}
        let post = await db.Post.findOne({
            where: { id: postId }
        })
        // console.log(post)
        if (post) {
            // console.log(post)
            await post.update({ status: 'deleted' })
            res.EC = 0
            res.EM = `Delete post with id ${postId} successfully`
            res.DT = {}
        } else {
            res.EC = 1
            res.EM = `Delete post failed`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with delete post service',
            EC: 1,
            DT: ''
        }
    }
}

const convertBlob2Img = (blob) => {
    let imageCloud = ''
    imageCloud = new Buffer.from(blob, 'base64').toString('binary')
    return imageCloud
}

const changePostBlobValueToUrl = (posts) => {
    for (const post in posts) {
        posts[post].titleImg = convertBlob2Img(posts[post].titleImg)
    }
    return posts
}

// Chatbot
// Get post by popular
const getPostsByPopularChatbot = async () => {
    try {
        let res = {}
        let posts = await db.Post.findAll({
            order: [
                ['viewCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })

        if (posts) {
            let postsChatbot = changePostBlobValueToUrl(posts)
            res.EC = 0
            res.EM = 'Get posts by popular successfully'
            res.DT = postsChatbot
            return res
        } else {
            res.EC = 1
            res.EM = 'Get posts by popular failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}

// Get all post
const getAllPostServiceChatbot = async () => {
    try {
        let res = {}
        let posts = await db.Post.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })

        if (posts) {
            let postsChatbot = changePostBlobValueToUrl(posts)
            res.EC = 0
            res.EM = 'Get all posts successfully'
            res.DT = postsChatbot
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all posts failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}

// Get post with post ID
const getPostWithIdServiceChatbot = async (postId) => {
    try {
        let res = {}
        let post = await db.Post.findOne({
            order: [['createdAt', 'DESC']],
            where: {
                id: postId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })
        if (post) {
            let postsChatbot = changePostBlobValueToUrl(post)
            res.EC = 0
            res.EM = `Get post with id ${postId} successfully`
            res.DT = { postsChatbot }
        } else {
            res.EC = 1
            res.EM = `Post with id ${postId} not found`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get post from id service',
            EC: 1,
            DT: ''
        }
    }
}

// Get post with post type
const getPostsByTypeChatbot = async (type) => {
    try {
        let res = {}
        let posts = await db.Post.findAll({
            order: [
                ['viewCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            where: {
                [Op.or]: [
                    {
                        type: {
                            [Op.like]: `%${type}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${type}%`
                        }
                    }
                ],
                status: {
                    [Op.not]: 'deleted'
                }
            }
        })
        if (posts) {
            let postsChatbot = changePostBlobValueToUrl(posts)
            res.EC = 0
            res.EM = `Get post with type ${type} successfully`
            res.DT = { postsChatbot }
        } else {
            res.EC = 1
            res.EM = `Post with type ${type} not found`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get post from id service',
            EC: 1,
            DT: ''
        }
    }
}

module.exports = {
    getAllPostService,
    getPostsPagination,
    updatePostService,
    deletePostService,
    getPostWithIdService,
    createPostService,
    getPostsByType,
    getPostsByPopular,
    postViewCountAddOne,
    getPostsByPopularChatbot,
    getAllPostServiceChatbot,
    getPostWithIdServiceChatbot,
    getPostsByTypeChatbot
}