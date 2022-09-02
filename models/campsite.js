const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Campsite collection schema
const campsiteSchema = new Schema({
    name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// define Model for Campsite collection
// like a class (ES6 classes are syntactic sugar over constructor functions)
// "desugared" class: used to instantiate a document
const Campsite = mongoose.model('Campsite', campsiteSchema)

module.exports = Campsite