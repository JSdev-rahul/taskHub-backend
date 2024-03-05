const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const deleteOldFilesOnCloudinary = async (pub_id) => {
  console.log("pub_id", pub_id)
  try {
    if (!pub_id) return
    const result = await new Promise((reject, resolve) => {
      cloudinary.uploader.destroy(pub_id, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
    console.log("cludniaryResult", result)
  } catch (error) {
    console.log("error", error)
  }
}

module.exports = deleteOldFilesOnCloudinary
