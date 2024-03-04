const transporter = require("../config/mailerConfig")
const ejs = require("ejs")
const path = require("path")

function sendGreetingEmail(user) {
  ejs.renderFile(
    path.join(__dirname, "../views/greetingEmailTemplate.ejs"),
    { user },
    (err, data) => {
      if (err) {
        console.error("Error rendering email template:", err)
        return
      }

      // Send the email with the rendered HTML content
      transporter.sendMail(
        {
          from: "rahul.choudhary7813@gmail.com",
          to: user?.email,
          subject: "Welcome to Task Hub!",
          html: data,
        },
        (error, info) => {
          if (error) {
            console.error("Error sending email:", error)
            // return res.status(500).json({ error: "Failed to send email. Please try again later." });
          }

          next()
        }
      )
    }
  )
  // const { to, subject, text } = req.body;
}

module.exports = sendGreetingEmail
