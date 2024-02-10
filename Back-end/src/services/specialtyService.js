import db from '../models/index'
const { Op } = require("sequelize");

const createSpecialtyService = async (dataSend) => {
    try {
        let res = {}
        if (!dataSend.nameVi || !dataSend.nameEn || !dataSend.image || !dataSend.descriptionVi || !dataSend.descriptionEn
            || !dataSend.markdownVi || !dataSend.markdownEn) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {
            await db.Specialty.create({ ...dataSend, status: 'active' })
            res.EC = 0
            res.EM = 'Create specialty successfully'
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with create specialty service',
            EC: 1,
            DT: ''
        }
    }
}

const getSpecialtiesService = async () => {
    try {
        let res = {}

        let data = await db.Specialty.findAll({
            where: {
                status: 'active'
            }
        })
        if (data) {
            res.EC = 0
            res.EM = 'Get specialties successfully'
            res.DT = data
        } else {
            res.EC = 2
            res.EM = 'Get specialties fail'
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

const getDetailSpecialtyService = async (idSpecialty) => {
    try {
        let res = {}

        let specialty = await db.Specialty.findOne({
            where: {
                id: idSpecialty
            }
        })
        if (specialty) {
            res.EC = 0
            res.EM = 'Get detail specialty successfully'
            res.DT = specialty
        } else {
            res.EC = 2
            res.EM = 'Get detail specialty fail'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get detail specialty service',
            EC: 1,
            DT: ''
        }
    }
}

const updateSpecialtyService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.id || !dataSend.nameVi || !dataSend.nameEn || !dataSend.image || !dataSend.descriptionVi || !dataSend.descriptionEn
            || !dataSend.markdownVi || !dataSend.markdownEn) {
            res.EC = 2
            res.EM = 'Missing parameter'
            res.DT = {}
        } else {
            let specialty = await db.Specialty.findOne({
                where: {
                    id: dataSend.id
                },
                raw: false
            })
            if (specialty) {
                specialty.update({ ...dataSend })
                res.EC = 0
                res.EM = 'Update specialty successfully'
                res.DT = specialty
            } else {
                res.EC = 3
                res.EM = 'Update specialty fail'
                res.DT = {}
            }
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update specialty service',
            EC: 1,
            DT: ''
        }
    }
}

const deleteSpecialtyService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.id) {
            res.EC = 2
            res.EM = 'Missing parameter'
            res.DT = {}
        } else {
            let specialty = await db.Specialty.findOne({
                where: {
                    id: dataSend.id
                },
            })
            if (specialty) {
                specialty.update({ status: 'deleted' })
                res.EC = 0
                res.EM = 'Delete specialty successfully'
                res.DT = specialty
            } else {
                res.EC = 3
                res.EM = 'Delete specialty fail'
                res.DT = {}
            }
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with update specialty service',
            EC: 1,
            DT: ''
        }
    }
}

const getSpecialtiesPaginationService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Specialty.findAndCountAll({
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
            specialties: rows
        }

        return {
            EM: 'Get specialties pagination successful',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getSpecialtiesPagination service',
            EC: 1,
            DT: {}
        }
    }
}

const getDoctorSpecialtyLocationService = async (dataSend) => {
    try {
        let res = {}

        let doctors = []

        if (dataSend.provinceId === 'ALL') {
            doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    {
                        model: db.Doctor_info, as: 'dataIdDoctor',
                        where: {
                            specialtyId: dataSend.specialtyId
                        },
                        attributes: ['clinicId', 'specialtyId', 'priceId', 'provinceId', 'paymentId'
                            , 'addressClinic', 'nameClinic', 'note'],
                        include: [
                            {
                                model: db.Markdown, as: 'dataMarkdown', attributes: ['textMarkdown', 'textHTML', 'description']

                            },
                            {
                                model: db.Allcode, as: 'dataPrice', attributes: ['valueVi', 'valueEn']

                            },
                            {
                                model: db.Allcode, as: 'dataProvince', attributes: ['valueVi', 'valueEn']

                            },
                            {
                                model: db.Clinic, as: 'dataClinic', attributes: ['nameVi', 'nameEn']
                            }
                        ]
                    },

                ]
            })
        } else {
            doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    {
                        model: db.Doctor_info, as: 'dataIdDoctor',
                        where: {
                            provinceId: dataSend.provinceId,
                            specialtyId: dataSend.specialtyId
                        },
                        attributes: ['clinicId', 'specialtyId', 'priceId', 'provinceId', 'paymentId'
                            , 'addressClinic', 'nameClinic', 'note'],
                        include: [
                            {
                                model: db.Markdown, as: 'dataMarkdown', attributes: ['textMarkdown', 'textHTML', 'description']

                            },
                            {
                                model: db.Allcode, as: 'dataPrice', attributes: ['valueVi', 'valueEn']

                            },
                            {
                                model: db.Allcode, as: 'dataProvince', attributes: ['valueVi', 'valueEn']

                            },
                            {
                                model: db.Clinic, as: 'dataClinic', attributes: ['nameVi', 'nameEn']
                            }
                        ]
                    },

                ]
            })
        }



        if (doctors) {
            res.EC = 0
            res.EM = 'Get doctors specialty and location successfully'
            res.DT = doctors
        } else {
            res.EC = 2
            res.EM = 'Get doctors specialty and location fail'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get doctors specialty and location service',
            EC: 1,
            DT: ''
        }
    }
}

module.exports = {
    createSpecialtyService, getSpecialtiesService, getDetailSpecialtyService, updateSpecialtyService,
    deleteSpecialtyService, getSpecialtiesPaginationService, getDoctorSpecialtyLocationService
}