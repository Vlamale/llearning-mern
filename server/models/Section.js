const {Schema, model} = require('mongoose')

const Section = new Schema({
    sectionName: {type: String, require: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = model('Section', Section)