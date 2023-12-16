import db from '../models/index'

const testCreateWithORM = async () => {
    try {
        await db.User.create({
            username: 'felix',
            email: 'felix@example.com',
            password: '123123'
        })
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = { testCreateWithORM }