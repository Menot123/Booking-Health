import { loginChecked, sendForgotPasswordCode, changeUserPassword, chekingOTPService } from '../services/userService'
import express from "express"
import session from "express-session"

let handleLogin = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({
                EM: 'Missing parameters!',
                EC: '1',
                DT: ''
            })
        }
        // Checking Username and Password
        let data = await loginChecked(username, password)
        if (data && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }

}

const handleForgotPassword = async (req, res, next) => {
    try {
        // let userData = req.body.data
        req.session.canChangePassword = false
        let response = await sendForgotPasswordCode(req.body.email)
        if (response.EC == 0) {
            req.session.otp = response.DT.OTP
            setTimeout(function () {
                req.session.destroy();
            }, 120000);
        }
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: {}
        })

    } catch (e) {
        console.log('Something went wrong from send code OTP')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleCheckingOTP = async (req, res, next) => {
    try {
        // let userData = req.body.data
        let response = await chekingOTPService(req.body.email)
        if (response.EC == 0) {
            if (req.session.otp == req.body.otp) {
                req.session.canChangePassword = true
                return res.status(200).json({
                    EM: 'OTP is true',
                    EC: response.EC,
                    DT: response.DT
                })
            }
            else {
                return res.status(200).json({
                    EM: 'OTP is false',
                    EC: -1,
                    DT: response.DT
                })
            }
        }
        else
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })

    } catch (e) {
        console.log('Something went wrong from checkingOTP')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleChangePassword = async (req, res, next) => {
    try {
        // let userData = req.body.data
        if (req.session.canChangePassword) {
            let response = await changeUserPassword(req.body.email, req.body.password)
            if (response.EC == 0) {
                req.session.canChangePassword = false
            }
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        else {
            return res.status(200).json({
                EM: "You do not have permission to change password",
                EC: -1,
                DT: {}
            })
        }

    } catch (e) {
        console.log('Something went wrong from change password')
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = { handleLogin, handleForgotPassword, handleChangePassword, handleCheckingOTP }