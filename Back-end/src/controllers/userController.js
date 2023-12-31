import userService from '../services/userService'

let getAllCode = async (req, res, next) => {
    try {
        let data = await userService.getAllCode(req.query.type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all code')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = { getAllCode }