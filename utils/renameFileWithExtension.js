const fs = require("fs").promises

const renameFileWithExtension = async (file) => {
  const { originalname, path } = file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = `${path}.${ext}`
  await fs.rename(path, newPath)
  return newPath
}

module.exports = renameFileWithExtension
