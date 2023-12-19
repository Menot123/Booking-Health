import db from '../models/index'

const testCreateWithORM = async() => {
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

const loginChecked = async(us, pwd) => {
    try {
        console.log(us + pwd);
        const checked = await db.User.findAll({
            where: {
                username: us,
                password: pwd
            }
        });
        return checked[0]
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = { testCreateWithORM, loginChecked }