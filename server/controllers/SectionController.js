const SectionService = require('../service/sectionService')

class SectionController {

    async getSections(req, res, next) {
        const {userId} = req.params
        try {
            const sections = await SectionService.getSections(userId)
            return res.json(sections)
        } catch(err) {
            next(err)
        }
    }

    async createSection(req, res, next) {
        const sectionData = req.body
        try {
            const section = await SectionService.createSection(sectionData)
            return res.json(section)
        } catch(err) {
            next(err)
        }
    }

    async deleteSection(req, res, next) {
        const {sectionId} = req.params
        try {
            const sections = await SectionService.deleteSection(sectionId)
            return res.json(sections)
        } catch(err) {
            next(err)
        }
    }

    async getSectionById(req, res, next) {
        const {sectionId} = req.params
        try {
            const sections = await SectionService.getSectionById(sectionId)
            return res.json(sections)
        } catch(err) {
            next(err)
        }
    }

    async getNumberOfSections(req, res, next) {
        const {userId} = req.params
        try {
            const sectionsNumber = await SectionService.getNumberOfSections(userId)
            return res.json(sectionsNumber)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new SectionController()