const {Schema, model} = require('mongoose')

const YearScheme = new Schema({
    Year: {type: Number}
})
module.exports = model('Years', YearScheme)