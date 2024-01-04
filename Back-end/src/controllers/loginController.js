import { loginChecked } from '../services/userService'


let handleLogin = async (req, res) => {
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

module.exports = { handleLogin }