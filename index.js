require("dotenv").config()
// Database connection
const Connection = require("./config/db_config/db.js")
Connection()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./docs/swagger.js")
const seedUserDummyData = require("./seeds/userSeeds.js")

const usersRoutes = require("./routes/users.js")
const todosRoutes = require("./routes/todos.js")
const loginRoute = require("./routes/login.js")

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
app.use(cors())
app.use(express.static("uploads/"))
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(morgan("tiny"))

// Generate Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// Routes
const apiV1Routes = express.Router()
apiV1Routes.use("/users", usersRoutes)
apiV1Routes.use("/todos", todosRoutes)
apiV1Routes.use("/login", loginRoute)
app.use("/api/v1", apiV1Routes)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
