import db from '../models/index'



let getAllCode = async (type) => {
    try {
        let res = {}
        if (!type) {
            res.EC = 0
            res.EM = 'Missing parameter!'
            res.DT = {}
            return res
        }
        let allcode = await db.Allcode.findAll({
            where: { type: type }
        })
        if (allcode) {
            res.EC = 0
            res.EM = 'Get allCode successfully'
            res.DT = allcode
            return res
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
    }
}


module.exports = { getAllCode }