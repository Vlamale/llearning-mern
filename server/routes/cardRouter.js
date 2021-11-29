const Router = require('express')
const router = new Router()
const CardController = require('../controllers/CardController')

router.get('/:sectionId', CardController.getCards)
router.post('/create', CardController.createCard)
router.get('/delete/:cardId', CardController.deleteCard)

module.exports = router