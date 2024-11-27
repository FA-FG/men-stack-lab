// require moongoose
// allow us to create schema for consistnsy
const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: String,
  isDangerous: Boolean
})

// Compile the schema into a model:
const Animal = mongoose.model('Animal', animalSchema)

// Export the model to server.js
// the database collection will take animal and change it to plural
module.exports = Animal
