import clinicService from '../services/clinicService'


const createClinic = async (req, res, next) => {
    try {
        let response = await clinicService.createClinicService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create Clinic')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getClinics = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await clinicService.getClinicsServicePaginationService(+page, +limit)

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let response = await clinicService.getClinicsService()
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

const getDetailClinic = async (req, res, next) => {
    try {
        let response = await clinicService.getDetailClinicService(req.query.idClinic)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get detail Clinic')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateClinic = async (req, res, next) => {
    try {
        let response = await clinicService.updateClinicService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update Clinic')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteClinic = async (req, res, next) => {
    try {
        let response = await clinicService.deleteClinicService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from delete Clinic')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}



module.exports = {
    createClinic, getClinics, getDetailClinic, updateClinic, deleteClinic
}