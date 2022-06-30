const {Schema, model} = require('mongoose')

const CountryScheme = new Schema({
    CountryName: {type: String}
})
module.exports = model('Countries', CountryScheme)