const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const cardRouter = require('./cardRouter')
const sectionRouter = require('./sectionRouter')

router.use('/user', userRouter)
router.use('/card', cardRouter)
router.use('/section', sectionRouter)

module.exports = router