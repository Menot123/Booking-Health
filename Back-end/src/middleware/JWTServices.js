import jwt from 'jsonwebtoken';
require('dotenv').config()

const notCheckPath = ['/', '/home', '/logout', '/login',];

const createNewJWT = (payload) => {
    let key = process.env.JWT_SECRET_KEY
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (e) {
        console.log(e)
    }
    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET_KEY
    let data = null
    let decode = null
    try {
        decode = jwt.verify(token, key)
        data = decode
    } catch (e) {
        console.log(e)
    }
    return data
}

const checkUserJWT = (req, res, next) => {
    if (notCheckPath.includes(req.path)) {
        return next()
    }
    let cookies = req.cookies
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decode = verifyToken(token)
        if (decode) {
            req.user = decode
            req.token = token
            next()
        }
    }
}

module.exports = { createNewJWT, verifyToken, checkUserJWT }