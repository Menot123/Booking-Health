import jwt from 'jsonwebtoken';
require('dotenv').config()

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

module.exports = { createNewJWT, verifyToken }