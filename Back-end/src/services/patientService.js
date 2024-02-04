import db from '../models/index'
import { testSendEmail } from '../services/mailerService'
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()

const buildTokenVerify = (token, idDoctor) => {
    let result = ''
    result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${idDoctor}`
    return result
}

const createUserPatientService = async (dataSend) => {
    try {
        let res = {}

        if (!dataSend.email || !dataSend.fullName || !dataSend.doctorId || !dataSend.dateSelectBooking || !dataSend.timeTypeBooking
            || !dataSend.dateTimeMailer || !dataSend.nameDoctorBooking) {
            res.EC = 1
            res.EM = 'Missing parameter !'
            res.DT = {}
        } else {

            let tokenVerify = uuidv4()


            const [patient, created] = await db.User.findOrCreate({
                where: { email: dataSend.email },
                defaults: {
                    email: dataSend.email,
                    roleId: 'R3'
                }
            });

            if (patient) {

                const [newBooking, createdBooking] = await db.Booking_doctor.findOrCreate({
                    where: {
                        date: dataSend.dateSelectBooking,
                        timeType: dataSend.timeTypeBooking
                    },
                    defaults: {
                        statusId: 'S1',
                        doctorId: dataSend.doctorId,
                        patientId: patient.id,
                        date: dataSend.dateSelectBooking,
                        timeType: dataSend.timeTypeBooking,
                        verify: tokenVerify
                    }
                })

                if (createdBooking) {


                    await sendEmail({
                        receiver: dataSend.email,
                        name: dataSend.fullName,
                        timeBooking: dataSend.dateTimeMailer,
                        currentLang: dataSend.currentLang,
                        doctorBooking: dataSend.nameDoctorBooking,
                        redirectLink: buildTokenVerify(tokenVerify, dataSend.doctorId),
                    })

                    res.EC = 0
                    res.EM = 'Create user patient successfully'
                    res.DT = {}
                    return res
                }
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


module.exports = {
    createUserPatientService, verifyBookingScheduleService
}