import db from '../models/index'
import { sendEmail } from '../services/mailerService'
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()
const { Op } = require("sequelize");

const buildTokenVerify = (token, idDoctor) => {
    let result = ''
    result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${idDoctor}`
    return result
}

const createUserPatientService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.email || !dataSend.fullName || !dataSend.doctorId || !dataSend.dateSelectBooking || !dataSend.timeTypeBooking
            || !dataSend.dateTimeMailer || !dataSend.nameDoctorBooking || !dataSend.contact
            || !dataSend.gender) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {

            let tokenVerify = uuidv4()


            const [patient, created] = await db.User.findOrCreate({
                where: { email: dataSend.email },
                defaults: {
                    email: dataSend.email,
                    roleId: 'R3',
                    address: dataSend.contact,
                    gender: dataSend.gender,
                    firstName: dataSend.fullName,
                    status: 'patient'
                }
            });

            if (patient) {

                const finderBooking = await db.Booking_doctor.findOne({
                    where: {
                        date: dataSend.dateSelectBooking,
                        timeType: dataSend.timeTypeBooking,
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    raw: true
                })

                if (finderBooking) {
                    let checkExistBooking = await db.Booking_doctor.findAll({
                        where: {
                            date: dataSend.dateSelectBooking,
                            timeType: dataSend.timeTypeBooking,
                            patientId: patient.id,
                        },
                    })
                    if (checkExistBooking.length === 0 && finderBooking?.numberPatient < 3) {
                        let booking = await db.Booking_doctor.create({
                            statusId: 'S1',
                            doctorId: dataSend.doctorId,
                            patientId: patient.id,
                            date: dataSend.dateSelectBooking,
                            timeType: dataSend.timeTypeBooking,
                            verify: tokenVerify,
                            numberPatient: +finderBooking.numberPatient + 1
                        })
                        await sendEmail({
                            receiver: dataSend.email,
                            name: dataSend.fullName,
                            timeBooking: dataSend.dateTimeMailer,
                            currentLang: dataSend.currentLang,
                            doctorBooking: dataSend.nameDoctorBooking,
                            redirectLink: buildTokenVerify(tokenVerify, dataSend.doctorId),
                            cancelBooking: `${process.env.REACT_URL}/cancel-booking?bookingId=${booking?.dataValues?.id}`
                        })
                    } else {
                        res.EC = 2
                        res.EM = 'You have another appointment scheduled today or schedule is full, please check back!'
                        res.DT = {}
                        return res

                    }
                } else {
                    let booking = await db.Booking_doctor.create({
                        statusId: 'S1',
                        doctorId: dataSend.doctorId,
                        patientId: patient.id,
                        date: dataSend.dateSelectBooking,
                        timeType: dataSend.timeTypeBooking,
                        verify: tokenVerify,
                        numberPatient: 1
                    })
                    await sendEmail({
                        receiver: dataSend.email,
                        name: dataSend.fullName,
                        timeBooking: dataSend.dateTimeMailer,
                        currentLang: dataSend.currentLang,
                        doctorBooking: dataSend.nameDoctorBooking,
                        redirectLink: buildTokenVerify(tokenVerify, dataSend.doctorId),
                        cancelBooking: `${process.env.REACT_URL}/cancel-booking?bookingId=${booking?.dataValues?.id}`
                    })
                }
                res.EC = 0
                res.EM = 'Create user patient successfully'
                res.DT = {}
                return res
            }

            res.EC = 2
            res.EM = 'You have another appointment scheduled today, please check back!'
            res.DT = {}
            return res
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with create patient account service',
            EC: 1,
            DT: ''
        }
    }
}

const verifyBookingScheduleService = async (dataSend) => {
    try {
        let res = {}
        if (!dataSend.token || !dataSend.idDoctor) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {

            let booking = await db.Booking_doctor.findOne({
                where: {
                    doctorId: dataSend.idDoctor,
                    verify: dataSend.token,
                    statusId: 'S1'
                },
                raw: false
            })

            if (booking) {

                booking.statusId = 'S2'
                booking.save()

                res.EC = 0
                res.EM = 'Verify booking successfully'
                res.DT = {}
            } else {
                res.EC = 2
                res.EM = 'Booking has been confirmed or does not exist'
                res.DT = {}
            }
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with create patient account service',
            EC: 1,
            DT: ''
        }
    }
}

const cancelBookingScheduleService = async (dataSend) => {
    try {
        let res = {}
        if (!dataSend.bookingId) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {

            await db.Booking_doctor.destroy({
                where: {
                    id: dataSend.bookingId
                }

            })
            res.EC = 0
            res.EM = `Cancel booking id: ${dataSend.bookingId}  successfully`
            res.DT = {}
        }
        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with create patient account service',
            EC: 1,
            DT: ''
        }
    }
}

const getAllPatientsService = async (dataSend) => {
    try {
        let res = {}
        if (!dataSend.idDoctor || !dataSend.dateSelected) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {

            let patients = await db.Booking_doctor.findAll({
                where: {
                    doctorId: dataSend.idDoctor,
                    date: dataSend.dateSelected,
                    statusId: 'S2'
                },
                include: [
                    {
                        model: db.Allcode, as: 'dataTime', attributes: ['valueVi', 'valueEn'],
                    },
                    {
                        model: db.User, as: 'dataPatient', attributes: ['email', 'address', 'gender', 'firstName'],
                        include: [
                            {
                                model: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'],
                            },
                        ]
                    },

                ]

            })

            if (patients) {
                res.EC = 0
                res.EM = 'Get all patients successfully'
                res.DT = patients
            } else {
                res.EC = 2
                res.EM = 'Get all patients failed'
                res.DT = {}
            }
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get all patients service',
            EC: 1,
            DT: ''
        }
    }
}


module.exports = {
    createUserPatientService, verifyBookingScheduleService, getAllPatientsService, cancelBookingScheduleService
}