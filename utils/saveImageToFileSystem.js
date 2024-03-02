const axios = require("axios")
const fs = require("fs")
const path = require("path")

const saveImageToFileSystem = async (imageUrl, email) => {
  const uploadFolderPath = "uploads"
  const fileName = `${email}_avatar.jpg`
  const filePath = path.join(uploadFolderPath, fileName)

  // Ensure the directory exists
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true })
  }

  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" })

    // Write the image data to the file system
    fs.writeFileSync(filePath, Buffer.from(response.data, "binary"))
    console.log("Image saved to file system:", filePath)
    return filePath
  } catch (err) {
    console.error("Error saving image to file system:", err)
    throw err
  }
}

module.exports = saveImageToFileSystem
