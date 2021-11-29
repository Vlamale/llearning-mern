const {Schema, model} = require('mongoose')

const Card = new Schema({
    word: {type: String, require: true},
    translation: {type: String, require: true},
    picture: {type: String},
    sectionId: {type: Schema.Types.ObjectId, ref: 'Section', required: true}
})

module.exports = model('Card', Card)