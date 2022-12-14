const fs = require('fs')
const path = require('path')
const { decodeJWT } = require('../middlewares/jwt')
const { processPath } = require('../middlewares/paths')

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

const createNewFolder = async (req, res) => {
  const newFolder = req.body.newFolder
  try {
    const token = req.headers.authorization
    const user = decodeJWT(token).name
    let dirPath
    if (req.params.path) {
      dirPath = processPath(`${user}_${req.params.path}`)
    } else {
      dirPath = processPath(user)
    }
    fs.mkdir(path.join(dirPath.absolutePath, newFolder), (err) => {
      if (err) {
        res.json({
          success: false,
          msg: 'No se ha podido crear el directorio'
        })
      }
      res.json({ success: true, msg: 'Nuevo directorio creado' })
    })
  } catch (err) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

const deleteItem = async (req, res) => {
  try {
    const token = req.headers.authorization
    const user = decodeJWT(token).name
    const dirPath = processPath(`${user}_${req.params.path}`)
    fs.rmSync(dirPath.absolutePath, { recursive: true, force: true })
    res.json({ success: true, msg: 'archivo o directorio eliminado' })
  } catch (err) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

module.exports = { getDirectoryContent, createNewFolder, deleteItem }
