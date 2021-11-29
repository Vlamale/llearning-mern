const CardService = require('../service/cardService')

class CardController {

    async getCards(req, res, next) {
        const {sectionId} = req.params
        try {
            const cards = await CardService.getCards(sectionId)
            return res.json(cards)
        } catch(err) {
            next(err)
        }
    }

    async createCard(req, res, next) {
        const cardData = req.body
        try {
            const cards = await CardService.createCard(cardData)
            return res.json(cards)
        } catch(err) {
            next(err)
        }
    }

    async deleteCard(req, res, next) {
        const {cardId} = req.params
        try {
            const cards = await CardService.deleteCard(cardId)
            return res.json(cards)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new CardController()