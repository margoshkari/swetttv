const {Schema, model} = require('mongoose')

const MovieScheme = new Schema({
    MovieName: {type: String},
    Info: {type: String},
    ImageName: {type: String},
    MovieLink: {type: String},
    GenreName: {type: String},
    CountryName: {type: String},
    Year: {type: Number}
})
module.exports = model('Movies', MovieScheme)