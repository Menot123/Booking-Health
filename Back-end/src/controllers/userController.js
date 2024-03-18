import userService from '../services/userService'

let getUser = async (req, res, next) => {
    return res.status(200).json('')
}

const getAccount = async (req, res) => {
    try {
        return res.status(200).json({
            EM: 'OK',
            EC: 0,
            DT: {
                access_token: req.token,
                username: req?.user?.username,
                firstName: req?.user?.firstName,
                lastName: req?.user?.lastName
            }
        })

    } catch (e) {
        console.log('Something went wrong from get account')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }

}

const handleGetRoleUser = async (req, res, next) => {
    try {
        let response = await userService.handleGetRoleUserService(req.query)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogout = (req, res, next) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({
            EM: 'Clear cookie done',
            EC: 0,
            DT: ''
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleCreateUser = async (req, res, next) => {
    try {
        let dataSend = req.body.data
        let response = await userService.createUserService(dataSend)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleDeleteUser = async (req, res, next) => {
    try {
        // console.log(req.body)
        let user = req.body.user
        let response = await userService.deleteUserService(user)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from delete user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleGetDataUpdateUser = async (req, res, next) => {
    try {
        let userId = req.query.userId
        let userEmail = req.query.userEmail
        let response = await userService.getDataUserUpdate({ userId, userEmail })
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleUpdateUser = async (req, res, next) => {
    try {
        let userData = req.body.data
        let response = await userService.updateUserService(userData)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    getUser,
    getAccount,
    handleLogout,
    handleCreateUser,
    handleDeleteUser,
    handleGetDataUpdateUser,
    handleUpdateUser,
    handleGetRoleUser
}