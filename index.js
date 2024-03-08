require("dotenv").config()
// Database connection
const Connection = require("./config/db_config/db.js")
Connection()
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./docs/swagger.js")

const authRoute = require("./routes/auth.routes.js")
const todoRoute = require("./routes/todo.routes.js")
const userRoute = require("./routes/user.routes.js")
const AuthController = require("./controller/auth.controller.js")
const AuthOTPController = require("./controller/authOTP.controller.js")

const app = express()

const port = process.env.PORT

// Middleware
app.use(
  helmet.crossOriginEmbedderPolicy({
    policy: "require-corp", // Set the Cross-Origin-Embedder-Policy to require-corp
  })
)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      objectSrc: ["none"],
    },
  })
)

const corsOptions = {
  origin: ["http://localhost:3000", "https://taskhub-web.netlify.app"],
  methods: ["get", "put", "post", "patch", "delete"],
  preflightContinue: false,
  credentials: false,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static("uploads/"))

app.use(
  express.json({
    limit: "16kb",
    strict: true,
    type: "application/json",
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(morgan("tiny"))

// Generate Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// Routes
const apiV1Routes = express.Router()
apiV1Routes.use("/users", userRoute)
apiV1Routes.use("/todos", todoRoute)
apiV1Routes.use("/login", authRoute)
apiV1Routes.use("/token", authRoute)
apiV1Routes.use("/password", authRoute)
apiV1Routes.use("/avatar", userRoute)

//  forgot password Otp
apiV1Routes.post("/send-otp", AuthController.sendForgotPasswordOtp)
apiV1Routes.post("/password/forgot-password", AuthController.forgotPassword)
app.use("/api/v1", apiV1Routes)

// Start server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
app.on("error", (error) => {
  console.log("Error", error)
})
