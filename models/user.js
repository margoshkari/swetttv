const {Schema, model} = require('mongoose')

const UserScheme = new Schema({
    Login: {type: String},
    Email: {type: String},
    Password: {type: String}
})
module.exports = model('Users', UserScheme)