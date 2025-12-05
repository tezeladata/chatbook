import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
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