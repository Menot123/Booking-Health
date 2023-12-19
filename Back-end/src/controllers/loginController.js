import { loginChecked } from '../services/userService'

let login = async(req, res) => {
    const { username, password } = req.body;

    // Checking Username and Password
    const checked = await loginChecked(username, password)

    if (checked) {
        // Success
        console.log(checked.dataValues)
        res.json({ success: true });
    } else {
        // Fail
        res.json({ success: false });
    }
}

module.exports = { login }