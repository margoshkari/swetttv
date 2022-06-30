const {Schema, model} = require('mongoose')

const GenresScheme = new Schema({
    GenreName: {type: String}
})
module.exports = model('Genres', GenresScheme)