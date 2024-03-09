const transporter = require("../config/mailerConfig")
const ejs = require("ejs")
const path = require("path")

function sendForgotPasswordEmail(userName, email, otp) {
  // Render the EJS template
  ejs.renderFile(
    path.join(__dirname, "../views/forgotPasswordEmailTemplate.ejs"),
    { otp: otp, userName: userName },
    (err, data) => {
      if (err) {
        console.error("Error rendering email template:", err)
        return
      }

      // Send the email with the rendered HTML content
      transporter.sendMail(
        {
          from: "rahul.choudhary7813@gmail.com",
          to: email,
          subject: "Reset Your Password",
          html: data,
        },
        (error, info) => {
          if (error) {
            console.error("Error sending email:", error)
          } else {
            console.log("Email sent:", info.response)
          }
        }
      )
    }
  )
}

module.exports = sendForgotPasswordEmail
