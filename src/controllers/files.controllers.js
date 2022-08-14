const uploadFiles = async (req, res) => {
  console.log(req.files)
  res.json({
    msg: 'subir archivos'
  })
}

module.exports = { uploadFiles }
