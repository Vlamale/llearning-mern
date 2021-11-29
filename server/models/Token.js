const {Schema, model} = require('mongoose')

const Token = Schema({
    userId: {ref: 'User', type: Schema.Types.ObjectId},
    refreshToken: {type: String}
})

module.exports = model('Token', Token)