const { decodeJWT } = require('../middlewares/jwt')
const mime = require('mime-types')
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

    const files = [req.files.file]
    try {
      for (const file of files) {
        await moveFile(file, dirPath.absolutePath)
      }
    } catch (err) {
      if (err.code) {
        return next(err)
      }

      return res.status(400).json({
        success: false,
        msg: err.message
      })
    }

    res.json({
      success: true,
      msg: 'archivos subidos'
    })
  } catch (error) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

const downloadFiles = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    const user = decodeJWT(token).name
    const dirPath = processPath(`${user}_${req.params.path}`)
    const file = dirPath.absolutePath
    const mimetype = mime.lookup(file)

    res.setHeader('Content-Disposition', `attachment; filename=${file}`)
    res.setHeader('Content-Type', mimetype)
    res.download(file)
  } catch (err) {
    next(err)
  }
}
module.exports = { uploadFiles, downloadFiles }
