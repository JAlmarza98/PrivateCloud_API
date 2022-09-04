const { Router } = require('express')
const { uploadFiles } = require('../controllers/files.controllers')

const router = Router()

router.get('/', function (req, res) {
  res.send('Hello World')
})

router.post('/upload/:path?', uploadFiles)

module.exports = router
