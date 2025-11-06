import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: '"Chatbook" <no-reply@chatbook.com>',
            to,
            subject,
            text
        });

        console.log(`Emaill successfully sent to ${to}: ${info.messageId}`);
        return info
    } catch (err) {
        console.log(err)
    }
}