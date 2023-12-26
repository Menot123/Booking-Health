import db from '../models/index'
import { createNewJWT } from '../middleware/JWTServices'

const loginChecked = async (us, pwd) => {
    try {
        let user = await db.User.findOne({
            where: {
                username: us,
                password: pwd
            }
        });
        if (user) {
            let payload = {
                username: user.username,
            }
            let token = createNewJWT(payload)
            return {
                EM: 'OK',
                EC: 0,
                DT: {
                    access_token: token,
                    username: user.username,
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

module.exports = { loginChecked }