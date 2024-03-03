const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    // Promisify the cloudinary.uploader.upload function
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        localFilePath,
        {
          access_mode: "public",
          resource_type: "auto",
          format: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
    })

    fs.unlinkSync(localFilePath)
    return uploadResult.url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    fs.unlinkSync(localFilePath)
    return null
  }
}

module.exports = uploadOnCloudinary
