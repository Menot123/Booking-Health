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
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Health thành công</p>
            <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm. </p>
            
            <div>Xin chân thành cảm ơn</div>
            `
        }
        if (data.language === 'en') {
            result = `
        
            <h3>Dear ${data.patientName}</h3>
            <p>You received this email because you made an online medical appointment on Booking Health</p>
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
        attachments: [
            {
                filename: `booking-health-remedy-${data.patientId}- ${new Date().getTime()}.png`,
                content: data.imgBase64.split("base64,")[1],
                encoding: 'base64'
            },
        ]
    });
}





module.exports = { sendEmail, senRemedy }