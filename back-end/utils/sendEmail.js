const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: "Outlook365",
        auth: {
            user: "prodzoid4521@outlook.com",
            pass: "djkankdnIwkm4523698s#"
        },
    });

    const mailOptions = {
        from: "prodzoid4521@outlook.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;