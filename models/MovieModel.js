const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const MovieSchema = new Schema({
    name: String, 
    year: Number,
    runtime:Number,
    categories: [String],
    'release-date': String, 
    director: String, 
    writers: [String],
    actors: [String],
    storyline: String,
    description: String,
}, {collection: "movies"})

module.exports = mongoose.model("movies", MovieSchema, "movies");