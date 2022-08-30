const { getDirectoryContent, createNewFolder, deleteItem } = require('../controllers/directories.controller')

const router = require('express').Router()

router.get('/:path?', getDirectoryContent)

router.post('/:path?', createNewFolder)

router.delete('/:path?', deleteItem)

module.exports = router
