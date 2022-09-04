const fs = require('fs')
const path = require('path')
const storage = require('../config/storage')

const slash = process.platform === 'win32' ? '\\' : '/'

const processPath = (urlPath) => {
  const relativePath = urlPath ? urlPath.replaceAll('_', slash) : slash
  const absolutePath = path.join(storage, relativePath)

  return { relativePath, absolutePath }
}

const moveFile = (file, storagePath) => {
  const filePath = path.join(storagePath, file.name)

  return new Promise((resolve, reject) => {
    fs.promises.access(filePath)
      .then(() => reject(new Error(`File ${file.name} already exists`)))
      .catch(() =>
        file.mv(filePath, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      )
  })
}

module.exports = { processPath, moveFile, slash }
