const mongoose = require("mongoose")

const Connection = async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  // 1. Approch to connect with mongoDb

  try {
    mongoose.connect(MONGODB_URI)

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully")
    })

    mongoose.connection.on("disconnected", () => {})

    mongoose.connection.on("error", (err) => {
      console.error("Error occurred:", err.message)
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
}

module.exports = Connection

// 2. approch -->  inside a try catch use await only and grab response and print

// try {
//   const connectionInstanse = await mongoose.connect(MONGODB_URI)
//
// } catch (error) {
//   console.error("Error connecting to MongoDB:", error)
// }
