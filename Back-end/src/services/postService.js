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

// Get post with pagination
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

module.exports = {
    getAllPostService,
    getPostsPagination,
    deletePostService
}