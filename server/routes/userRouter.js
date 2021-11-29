const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')

router.get('/activate/:link', UserController.activate)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/send-mail/:userId', UserController.sendMail)

module.exports = router