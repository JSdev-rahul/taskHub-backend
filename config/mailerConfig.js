const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.server.com", // e.g., 'smtp.example.com'
  // port: 587, // or your SMTP port
  // secure: false, // true for 465, false for other ports
  auth: {
    user: "rahul.choudhary7813@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
})

module.exports = transporter
