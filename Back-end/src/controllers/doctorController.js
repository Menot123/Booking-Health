import doctorService from '../services/doctorService'


const getAllDoctor = async (req, res, next) => {
    try {
        let response = await doctorService.getAllDoctorService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update user')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getInfoDoctor = async (req, res, next) => {
    try {
        let idDoctor = req.query.id
        let response = await doctorService.getInfoDoctorService(idDoctor)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get info doctor')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllPrice = async (req, res, next) => {
    try {
        let response = await doctorService.getAllPriceService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all prices')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllPayments = async (req, res, next) => {
    try {
        let response = await doctorService.getAllPaymentsService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all payments')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllProvinces = async (req, res, next) => {
    try {
        let response = await doctorService.getAllProvincesService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all provinces')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllSpecialties = async (req, res, next) => {
    try {
        let response = await doctorService.getAllSpecialtiesService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all speicalties')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllClinics = async (req, res, next) => {
    try {
        let response = await doctorService.getAllClinicService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all clinics')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateInfoDoctor = async (req, res, next) => {
    try {
        let data = req.body.data
        let response = await doctorService.updateInfoDoctorService(data)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from update info doctor')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getDetailDoctor = async (req, res, next) => {
    try {
        let id = req.query.id
        let response = await doctorService.getDetailDoctorService(id)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get info detail doctor')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllSchedule = async (req, res, next) => {
    try {
        let response = await doctorService.getAllScheduleService()
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all schedule doctor')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const createSchedule = async (req, res, next) => {
    try {
        let response = await doctorService.createScheduleService(req.body.data)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create schedules doctor')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getScheduleByDate = async (req, res, next) => {
    try {
        let response = await doctorService.getScheduleByDateService(req.query)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get schedules doctor by date ')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getInfoProfile = async (req, res, next) => {
    try {
        let response = await doctorService.getInfoProfileService(req.query)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get profile doctor to modal ')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const sendRemedy = async (req, res, next) => {
    try {
        let response = await doctorService.sendRemedyService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from send remedy ')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const checkFullSchedule = async (req, res, next) => {
    try {
        let response = await doctorService.checkFullScheduleService(req.query)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from check full schedule ')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteBooking = async (req, res) => {
    try {
        let response = await doctorService.deleteBookingService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from delete booking ')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    getAllDoctor, getAllPrice, getInfoDoctor, getAllPayments, getAllProvinces,
    getAllSpecialties, getAllClinics, updateInfoDoctor, getDetailDoctor, getAllSchedule,
    createSchedule, getScheduleByDate, getInfoProfile, sendRemedy, checkFullSchedule,
    deleteBooking
}