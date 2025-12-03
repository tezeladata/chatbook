import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: 'support <no-reply@chatbook.com>',
            to,
            subject,
            html
        });

        console.log(`Email successfully sent to ${to}: ${info.messageId}`);
        return info
    } catch (err) {
        console.log(err)
    }
}