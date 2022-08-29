const fs = require('fs')
const { decodeJWT } = require('../middlewares/jwt')
const processPath = require('../middlewares/paths')

const getDirectoryContent = async (req, res) => {
  try {
    const token = req.headers.authorization
    const user = decodeJWT(token).name
    let dirPath
    if (req.params.path) {
      dirPath = processPath(`${user}_${req.params.path}`)
    } else {
      dirPath = processPath(user)
    }
    const dir = await fs.promises.opendir(dirPath.absolutePath)
    const content = { files: [], directories: [] }

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        content.directories.push(dirent.name)
      } else {
        content.files.push(dirent.name)
      }
    }
    content.directories.sort()
    content.files.sort()

    const path = dirPath.relativePath.replace(user, 'Home')

    res.json({ path, content, success: true })
  } catch (err) {
    res.json({
      success: false,
      msg: 'El archivo o directorio seleccionado no existe'
    })
  }
}

module.exports = { getDirectoryContent }
