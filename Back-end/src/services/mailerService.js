require('dotenv').config()
const nodemailer = require("nodemailer");

let sendEmail = async (dataMail) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD,
        },
    });

    const contentMail = (dataMail) => {
        console.log('>>>>> dataMail.cancelBooking:', dataMail.cancelBooking)
        let content = ''
        if (dataMail.currentLang === 'vi') {
            content =
                `
                <h3>Xin chào, ${dataMail.name}</h3>
                <p style='font-style: italic'>Bạn nhận được email này do đã đặt lịch trên hệ thống chăm sóc sức khỏe Booking Health</p>
                <br/>
                <p>Thông tin đặt lịch:</p>
                <b>Thời gian khám: ${dataMail.timeBooking}</b>
                <div>
                <b>Bác sĩ: ${dataMail.doctorBooking}</b>
                </div>
                <br/>
                <p>Vui lòng nhấn vào đường link phía dưới để xác nhận lịch hẹn khám bệnh này.</p>
                <div><a href=${dataMail.redirectLink} target='_blank'>  
                Nhấn vào đây
                </a></div>
                <b>Hủy lịch hẹn khám bệnh.</b>
                <div><a href=${dataMail.cancelBooking} target='_blank'>  
                Nhấn vào đây để hủy lịch hẹn khám bệnh
                </a></div>
                <div>Xin cảm ơn quý khách hàng tin dùng Booking Health</div>
                `
        } else {
            content =
                `
            <h3>Dear, ${dataMail.name}</h3>
            <p style='font-style: italic'>You received this email because you made a booking on the Booking Health healthcare website</p>
            <br/>
            <p>Booking information:</p>
            <b>Examination time: ${dataMail.timeBooking}</b>
            <div>
            <b>Doctor: ${dataMail.doctorBooking}</b>
            </div>
            <br/>
            <p>Please click on the link below to confirm this medical appointment.</p>
            <div><a href=${dataMail.redirectLink} target='_blank'>  
            Click here
            </a></div>
            <b>Cancel medical appointment.</b>
                <div><a href=${dataMail.cancelBooking} target='_blank'>  
                Click here to cancel your medical appointment
                </a></div>
            <div>Thank you for trusting Booking Health</div>
            `
        }
        return content
    }


    const info = await transporter.sendMail({
        from: '"Felix Dev 👻" <From Booking Health>', // sender address
        to: dataMail.receiver, // list of receivers
        subject: dataMail.currentLang === 'vi' ? "Thông tin đặt lịch khám bệnh" : "Information for scheduling medical examination", // Subject line
        html: contentMail(dataMail)
    });

}

const senRemedy = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD,
        },
    });

    const contentRemedyMail = (data) => {
        let result = ''
        if (data.language === 'vi') {
            result = `
        
            <h3>Xin chào ${data.patientName}</h3>
            <p>Cảm ơn bạn đã đặt lịch khám bệnh với Booking Health.</p>
            <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm. </p>
            
            <div>Xin chân thành cảm ơn</div>
            `
        }
        if (data.language === 'en') {
            result = `
        
            <h3>Dear ${data.patientName}</h3>
            <p>Thank you for booking your medical appointment with Booking Health.</p>
            <p>Prescription/invoice information is sent in the attached file.</p>
            
            <div>Sincerely thank</div>
            `
        }
        return result
    }

    const info = await transporter.sendMail({
        from: '"Felix Dev 👻" <From Booking Health>', // sender address
        to: data.receiver, // list of receivers
        subject: data.language === 'vi' ? "Kết quả đặt lịch khám bệnh" : "Result of medical examination appointment", // Subject line
        html: contentRemedyMail(data),
        attachments: [{
            filename: `booking-health-remedy-${data.patientId}- ${new Date().getTime()}.png`,
            content: data.imgBase64.split("base64,")[1],
            encoding: 'base64'
        },]
    });
}

let sendCode = async (user, OTP) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD,
        },
    });

    const contentMail = (user) => {
        let content = ''
        content =
            `<h3>Xin chào, ${user.lastName} ${user.firstName}</h3>
        <p style='font-style: italic'>Đây là mã xác thực email của bạn:</p>
        <br/>
        <div>
        <h1 style='text-align: center'>${OTP}</h1>
        </div>
        <br/>
        <p>Vui lòng bảo quản mã xác thực cẩn thận và không để người khác nhìn thấy.</p>

        <div>Xin cảm ơn</div>`

        return content
    }

    const info = await transporter.sendMail({
        from: '"Felix Dev 👻" <khanhduy8768@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Mã xác thực OTP", // Subject line
        html: contentMail(user)
    });

}





module.exports = { sendEmail, sendCode, senRemedy }