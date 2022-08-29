const { getDiskInfo } = require('../controllers/disk.controller')

const router = require('express').Router()

router.get('/disk-info', getDiskInfo)

module.exports = router
