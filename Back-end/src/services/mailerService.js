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
        from: '"Felix Dev 👻" <khanhduy8768@gmail.com>', // sender address
        to: dataMail.receiver, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: contentMail(dataMail)
    });




}





module.exports = { sendEmail }