const { getDirectoryContent } = require('../controllers/directories.controller')

const router = require('express').Router()

router.get('/:path?', getDirectoryContent)

module.exports = router
