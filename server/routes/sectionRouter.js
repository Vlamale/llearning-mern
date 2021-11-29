const Router = require('express')
const router = new Router()
const SectionController = require('../controllers/SectionController')

router.get('/:userId', SectionController.getSections)
router.post('/create', SectionController.createSection)
router.get('/delete/:sectionId', SectionController.deleteSection)
router.get('/get-section/:sectionId', SectionController.getSectionById)
router.get('/number-of-sections/:userId', SectionController.getNumberOfSections)

module.exports = router