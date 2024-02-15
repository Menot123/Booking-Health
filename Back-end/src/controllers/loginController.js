import { loginChecked, sendForgotPasswordCode, changeUserPassword } from '../services/userService'


let handleLogin = async(req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({
                EM: 'Missing parameters!',
                EC: '1',
                DT: ''
            })
        }
        // Checking Username and Password
        let data = await loginChecked(username, password)
        if (data && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }

}

const handleForgotPassword = async(req, res, next) => {
    // console.log(req.body);
    // return res.status(200).json({ EM: 'ok' });
    try {
        // let userData = req.body.data
        let response = await sendForgotPasswordCode(req.body.email)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from send code OTP')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleChangePassword = async(req, res, next) => {
    try {
        // let userData = req.body.data
        let response = await changeUserPassword(req.body.email, req.body.password)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from change password')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = { handleLogin, handleForgotPassword, handleChangePassword }