'use server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { user_name, user_email, user_message } = await req.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.verify();
        console.log("SMTP connection established");

        const mailOptions = {
            from: user_email,
            to: process.env.EMAIL_USER,
            subject: `New message from ${user_name} and Email: ${user_email}`,
            text: user_message,
        };

        await transporter.sendMail(mailOptions);
        return Response.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ success: false, error: 'Failed to send email' });
    }
};