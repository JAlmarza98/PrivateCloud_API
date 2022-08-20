const { Router } = require('express')
const { login, newUser, validateUser } = require('../controllers/auth.controller')

const router = Router()

router.post('/login', login)

router.post('/new-user', newUser)

router.post('/confirm-user/:userID', validateUser)

module.exports = router
