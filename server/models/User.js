const {Schema, model} = require('mongoose')

const User = new Schema({
    nickName: {type: String, required: true, minlength: 4},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'PUPLE'},
    language: {type: String},
    activationLink: {type: String, default: ''},
    isActivated: {type: Boolean, default: false}
})

module.exports = model('User', User)