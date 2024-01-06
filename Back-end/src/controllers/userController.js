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
            username: req.user.username
        }
    })
}

module.exports = { getUser, getAccount }