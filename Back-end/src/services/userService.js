import db from '../models/index'
import { createNewJWT } from '../middleware/JWTServices'

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
            }
            let token = createNewJWT(payload)
            return {
                EM: 'OK',
                EC: 0,
                DT: {
                    access_token: token,
                    username: user.email,
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
    }
}

let getAllCode = async (type) => {
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
    }
}

let getAllUsers = async () => {
    try {
        let res = {}
        let users = await db.User.findAll()
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

let getTypeRoleService = async (type) => {
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
    }
}


module.exports = { loginChecked, getAllCode, getAllUsers, getTypeRoleService }