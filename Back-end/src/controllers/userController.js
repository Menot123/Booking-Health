// import userService from '../services/userService'

let getUser = async (req, res, next) => {
    return res.status(200).json('')
}

const getAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'OK',
        EC: 0,
        DT: {
            access_token: req.token,
            username: req.user.username,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        }
    })
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

module.exports = { getUser, getAccount, handleLogout }