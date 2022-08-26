const fs = require('fs')
const processPath = require('../middlewares/paths')

const getDirectoryContent = async (req, res) => {
  try {
    const dirPath = processPath(req.params.path)
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

    res.json({ path: dirPath.relativePath, content, success: true })
  } catch (err) {
    res.json({
      success: false,
      msg: 'El archivo o directorio seleccionado no existe'
    })
  }
}

module.exports = { getDirectoryContent }
