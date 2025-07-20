const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function sendVerificationEmail(email, token){
    const link = `http://localhost:3000/auth/verify?token=${token}`;
    await transporter.sendMail({
      from: "APPPAPUN",
      to: email,
      subject: "Email Verification",
      html: `Please click the link to verify your email: <a href="${link}">Verify Email</a>`,
    });
}

module.exports = sendVerificationEmail;