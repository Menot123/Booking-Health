import db from '../models/index'
import { createNewJWT } from '../middleware/JWTServices'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(7);


const loginChecked = async (us, pwd) => {
    try {
        let user = await db.User.findOne({
            where: {
                email: us,
                password: pwd
            }
        });
        if (user) {
            let payload = {
                username: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            let token = createNewJWT(payload)
            return {
                EM: 'OK',
                EC: 0,
                DT: {
                    access_token: token,
                    username: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        }
        return {
            EM: 'Your username or password is incorrect',
            EC: 1,
            DT: ''
        }
    } catch (e) {
        console.log('>>> error: ', e)
        return {
            EM: 'Something wrong in login checked service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllCode = async (type) => {
    try {
        let res = {}
        if (!type) {
            res.EC = 0
            res.EM = 'Missing parameter!'
            res.DT = {}
            return res
        }
        let allcode = await db.Allcode.findAll({
            where: { type: type }
        })
        if (allcode) {
            res.EC = 0
            res.EM = 'Get allCode successfully'
            res.DT = allcode
            return res
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getAllCode service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllUsers = async () => {
    try {
        let res = {}
        let users = await db.User.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                }
            }
        })
        if (users) {
            res.EC = 0
            res.EM = 'Get all users successfully'
            res.DT = users
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all users failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}

const getUsersPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                }
            }
        })

        let pages = Math.ceil(count / limit)

        let response = {
            totalRows: count,
            totalPage: pages,
            users: rows
        }

        return {
            EM: 'Get users pagination successful',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getUsersPagination service',
            EC: 1,
            DT: {}
        }
    }
}

const getTypeRoleService = async (type) => {
    try {
        let res = {}
        let data = await db.Allcode.findAll({
            where: { type: type }
        })
        if (data) {
            res.EC = 0
            res.EM = 'Get type role successfully'
            res.DT = data
        } else {
            res.EC = 1
            res.EM = 'Get all type role failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getTypeRoleService service',
            EC: 1,
            DT: ''
        }
    }
}

let hashUserPassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        throw err;
    }
};

const createUserService = async (userData) => {
    try {
        let res = {}
        if (userData) {
            let password = userData.password
            let hashPassword = await hashUserPassword(password)
            let userDataCreate = {
                email: userData.email,
                password: hashPassword,
                address: userData.address,
                firstName: userData.firstName,
                lastName: userData.lastName,
                gender: userData.gender,
                phoneNumber: userData.phone,
                image: userData.avatar,
                roleId: userData.role,
                position: userData.position
            }
            let checkDuplicate = await db.User.findOne({
                where: { email: userData.email }
            })
            if (checkDuplicate) {
                res.EC = 2
                res.EM = 'User already exists'
                res.DT = {}

            } else {
                await db.User.create(userDataCreate)
                res.EC = 0
                res.EM = 'Create user successfully'
                res.DT = {}
            }
        } else {
            res.EC = 1
            res.EM = 'Create user failed'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with createUserService service',
            EC: 1,
            DT: ''
        }
    }
}


module.exports = {
    loginChecked, getAllCode, getAllUsers, getTypeRoleService, createUserService,
    getUsersPagination
}