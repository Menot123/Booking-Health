import patientService from '../services/patientService'


const createUser = async (req, res, next) => {
    try {
        let response = await patientService.createUserPatientService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create user patient')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const verifyBookingSchedule = async (req, res, next) => {
    try {
        let response = await patientService.verifyBookingScheduleService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create user patient')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const cancelBookingSchedule = async (req, res, next) => {
    try {
        let response = await patientService.cancelBookingScheduleService(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from create user patient')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllPatients = async (req, res, next) => {
    try {
        let response = await patientService.getAllPatientsService(req.query)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (e) {
        console.log('Something went wrong from get all patients')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}



module.exports = {
    createUser, verifyBookingSchedule, getAllPatients, cancelBookingSchedule
}