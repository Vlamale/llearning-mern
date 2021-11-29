const Section = require("../models/Section");

class SectionService {
    async getSections(userId) {
        const sections = await Section.find({userId})
        return sections.reverse()
    }

    async createSection(sectionData) {
        const section = await Section.create(sectionData)
        return section
    }

    async deleteSection(sectionId) {
        const section = await Section.findOneAndRemove({_id: sectionId})
        const sections = await Section.find({userId: section.userId})
        return sections.reverse()
    }

    async getSectionById(sectionId) {
        const section = await Section.findOne({_id: sectionId})
        return section
    }

    async getNumberOfSections(userId) {
        const sections = await Section.find({userId})
        return sections.length
    }
}

module.exports = new SectionService()