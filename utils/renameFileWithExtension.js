const uploadOnCloudinary = require("./cloudinaryUpload")

const fs = require("fs").promises

const renameFileWithExtension = async (file, pubId) => {
  const { originalname, path } = file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = `${path}.${ext}`
  await fs.rename(path, newPath)
  return await uploadOnCloudinary(newPath, pubId)
  // return newPath
}

module.exports = renameFileWithExtension
