const { Router } = require('express')
const { uploadFiles, downloadFiles } = require('../controllers/files.controllers')

const router = Router()

router.get('/download/:path?', downloadFiles)

router.post('/upload/:path?', uploadFiles)

module.exports = router
