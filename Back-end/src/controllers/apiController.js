import allCodeService from '../services/allCodeService'
import userService from '../services/userService'

let getAllCode = async (req, res, next) => {
    try {
        let data = await allCodeService.getAllCode(req.query.type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all code')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

let getUsers = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await userService.getUsersPagination(+page, +limit)
            console.log(data)

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await userService.getAllUsers()
            console.log(data)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }


    } catch (e) {
        console.log('Something went wrong from get all users')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

let getTypeRole = async (req, res, next) => {
    try {
        let type = req.query.type;
        let data = await userService.getTypeRoleService(type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log('Something went wrong from get all users')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    getAllCode,
    getUsers,
    getTypeRole,
}