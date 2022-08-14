const { Router } = require('express')
const { login, newUser } = require('../controllers/auth.controller')

const router = Router()

router.post('/login', login)

router.post('/new-user', newUser)

module.exports = router
