import specialtyService from '../services/specialtyService'


const createSpecialty = async (req, res, next) => {
    try {
        let response = await specialtyService.createSpecialtyService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create specialty')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getSpecialties = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await specialtyService.getSpecialtiesPaginationService(+page, +limit)

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let response = await specialtyService.getSpecialtiesService()
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })

        }

    } catch (e) {
        console.log('Something went wrong from get specialties')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getDetailSpecialty = async (req, res, next) => {
    try {
        let response = await specialtyService.getDetailSpecialtyService(req.query.idSpecialty)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get detail specialty')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateSpecialty = async (req, res, next) => {
    try {
        let response = await specialtyService.updateSpecialtyService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update specialty')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteSpecialty = async (req, res, next) => {
    try {
        let response = await specialtyService.deleteSpecialtyService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from delete specialty')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}



module.exports = {
    createSpecialty, getSpecialties, getDetailSpecialty, updateSpecialty, deleteSpecialty
}