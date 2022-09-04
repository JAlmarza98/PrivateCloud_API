const { decodeJWT } = require('../middlewares/jwt')
const { processPath, moveFile } = require('../middlewares/paths')

const uploadFiles = async (req, res, next) => {
  const token = req.headers.authorization

  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: 'No se han subido archivos'
      })
    }

    const user = decodeJWT(token).name
    let dirPath
    if (req.params.path) {
      dirPath = processPath(`${user}_${req.params.path}`)
    } else {
      dirPath = processPath(user)
    }

    const files = req.files.files
    try {
      for (const file of files) {
        await moveFile(file, dirPath.absolutePath)
      }
    } catch (err) {
    // Sys error
      if (err.code) {
        return next(err)
      }

      return res.status(400).json({
        success: false,
        message: err.message,
        path: dirPath.relativePath
      })
    }

    res.json({
      msg: 'subir archivos',
      dirPath
    })
  } catch (error) {
    res.json({
      msg: 'subir archivos'
    })
  }
}

module.exports = { uploadFiles }
