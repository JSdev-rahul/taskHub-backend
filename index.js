require("dotenv").config()
// Database connection
const Connection = require("./config/db_config/db.js")
Connection()
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./docs/swagger.js")
const seedUserDummyData = require("./seeds/userSeeds.js")

const authRoute = require("./routes/auth.routes.js")
const todoRoute = require("./routes/todo.routes.js")
const userRoute = require("./routes/user.routes.js")

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
  origin: "http://localhost:3001",
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
app.use("/api/v1", apiV1Routes)

// Start server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
app.on("error", (error) => {
  console.log("Error", error)
})
