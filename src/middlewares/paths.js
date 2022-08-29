const path = require('path')
const storage = require('../config/storage')

const slash = process.platform === 'win32' ? '\\' : '/'

const processPath = (urlPath) => {
  const relativePath = urlPath ? urlPath.replaceAll('_', slash) : slash
  const absolutePath = path.join(storage, relativePath)

  return { relativePath, absolutePath }
}

module.exports = processPath
