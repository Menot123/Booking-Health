import db from '../models/index'
const { Op } = require("sequelize");



const getAllDoctorService = async () => {
    try {
        let res = {}
        let doctors = await db.User.findAll({
            order: [['firstName', 'DESC']],
            where: {
                roleId: 'R2',
                status: {
                    [Op.not]: 'deleted'
                }
            },
            attributes: {
                exclude: ['password', 'image']
            }
        })

        if (doctors) {
            res.EC = 0
            res.EM = 'Get all doctors successfully'
            res.DT = doctors
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all doctors failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all doctors service',
            EC: 1,
            DT: ''
        }
    }
}

const getInfoDoctorService = async (id) => {
    try {
        let res = {}
        let doctor = await db.Doctor_info.findOne({
            where: {
                doctorId: id,
            }
        })

        if (doctor) {
            res.EC = 0
            res.EM = 'Get info doctor successfully'
            res.DT = doctor
        } else {
            res.EC = 1
            res.EM = 'Get info doctor failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get info doctor service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllPriceService = async () => {
    try {
        let res = {}
        let prices = await db.Allcode.findAll({
            where: {
                type: 'PRICE',
            }
        })

        if (prices) {
            res.EC = 0
            res.EM = 'Get all prices successfully'
            res.DT = prices
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all prices failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all prices service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllPaymentsService = async () => {
    try {
        let res = {}
        let payments = await db.Allcode.findAll({
            where: {
                type: 'PAYMENT',
            }
        })

        if (payments) {
            res.EC = 0
            res.EM = 'Get all payments successfully'
            res.DT = payments
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all payments failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all payments service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllProvincesService = async () => {
    try {
        let res = {}
        let provinces = await db.Allcode.findAll({
            where: {
                type: 'PROVINCE',
            }
        })

        if (provinces) {
            res.EC = 0
            res.EM = 'Get all provinces successfully'
            res.DT = provinces
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all provinces failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all provinces service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllSpecialtiesService = async () => {
    try {
        let res = {}
        let specialties = await db.Specialty.findAll({
            attributes: {
                exclude: ['descriptionVi', 'descriptionEn', 'image']
            }
        })

        if (specialties) {
            res.EC = 0
            res.EM = 'Get all specialties successfully'
            res.DT = specialties
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all specialties failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all specialties service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllClinicService = async () => {
    try {
        let res = {}
        let clinics = await db.Clinic.findAll()

        if (clinics) {
            res.EC = 0
            res.EM = 'Get all clinics successfully'
            res.DT = clinics
            return res
        } else {
            res.EC = 1
            res.EM = 'Get all clinics failed'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all clinics service',
            EC: 1,
            DT: ''
        }
    }
}

module.exports = {
    getAllDoctorService, getInfoDoctorService, getAllPriceService, getAllPaymentsService, getAllProvincesService,
    getAllSpecialtiesService, getAllClinicService
}