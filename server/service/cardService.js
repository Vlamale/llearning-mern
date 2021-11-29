const Card = require("../models/Card");

class CardService {
    async getCards(sectionId) {
        const cards = await Card.find({sectionId})
        return cards
    }

    async createCard(cardData) {
        await Card.create(cardData)
        const cards = await Card.find({sectionId: cardData.sectionId})
        return cards
    }

    async deleteCard(cardId) {
        const card = await Card.findOneAndRemove({_id: cardId})
        const cards = await Card.find({sectionId: card.sectionId})
        return cards
    }
}

module.exports = new CardService()