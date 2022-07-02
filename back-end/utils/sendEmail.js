const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;