import db from '../models/index'
const { Op } = require("sequelize");

const createClinicService = async (dataSend) => {
    try {
        let res = {}
        if (!dataSend.nameVi || !dataSend.nameEn || !dataSend.image || !dataSend.descriptionVi || !dataSend.descriptionEn
            || !dataSend.markdownVi || !dataSend.markdownEn || !dataSend.addressVi || !dataSend.addressEn) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {
            await db.Clinic.create({ ...dataSend, status: 'active' })
            res.EC = 0
            res.EM = 'Create Clinic successfully'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with create Clinic service',
            EC: 1,
            DT: ''
        }
    }
}

const getClinicsService = async () => {
    try {
        let res = {}

        let data = await db.Clinic.findAll({
            where: {
                status: 'active'
            }
        })
        if (data) {
            res.EC = 0
            res.EM = 'Get clinics successfully'
            res.DT = data
        } else {
            res.EC = 2
            res.EM = 'Get clinics fail'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get specialties service',
            EC: 1,
            DT: ''
        }
    }
}

const getDetailClinicService = async (idClinic) => {
    try {
        let res = {}

        let Clinic = await db.Clinic.findOne({
            where: {
                id: idClinic
            }
        })
        if (Clinic) {
            res.EC = 0
            res.EM = 'Get detail Clinic successfully'
            res.DT = Clinic
        } else {
            res.EC = 2
            res.EM = 'Get detail Clinic fail'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get detail Clinic service',
            EC: 1,
            DT: ''
        }
    }
}

const updateClinicService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.id || !dataSend.nameVi || !dataSend.nameEn || !dataSend.image || !dataSend.descriptionVi || !dataSend.descriptionEn
            || !dataSend.markdownVi || !dataSend.markdownEn || !dataSend.addressEn || !dataSend.addressVi) {
            res.EC = 2
            res.EM = 'Missing parameter'
            res.DT = {}
        } else {
            let Clinic = await db.Clinic.findOne({
                where: {
                    id: dataSend.id
                },
                raw: false
            })
            if (Clinic) {
                Clinic.update({ ...dataSend })
                res.EC = 0
                res.EM = 'Update Clinic successfully'
                res.DT = Clinic
            } else {
                res.EC = 3
                res.EM = 'Update Clinic fail'
                res.DT = {}
            }
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update Clinic service',
            EC: 1,
            DT: ''
        }
    }
}

const deleteClinicService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.id) {
            res.EC = 2
            res.EM = 'Missing parameter'
            res.DT = {}
        } else {
            let Clinic = await db.Clinic.findOne({
                where: {
                    id: dataSend.id
                },
            })
            if (Clinic) {
                Clinic.update({ status: 'deleted' })
                res.EC = 0
                res.EM = 'Delete Clinic successfully'
                res.DT = Clinic
            } else {
                res.EC = 3
                res.EM = 'Delete Clinic fail'
                res.DT = {}
            }
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update Clinic service',
            EC: 1,
            DT: ''
        }
    }
}

const getClinicsServicePaginationService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Clinic.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['nameVi', 'ASC']],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            },
            attributes: {
                exclude: ['image', 'descriptionVi', 'descriptionEn', 'markdownVi', 'markdownEn']
            }
        })

        let pages = Math.ceil(count / limit)

        let response = {
            totalRows: count,
            totalPage: pages,
            clinics: rows
        }

        return {
            EM: 'Get clinics pagination successful',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with clinicsPagination service',
            EC: 1,
            DT: {}
        }
    }
}

module.exports = {
    createClinicService, getClinicsService, getDetailClinicService, updateClinicService,
    deleteClinicService, getClinicsServicePaginationService
}