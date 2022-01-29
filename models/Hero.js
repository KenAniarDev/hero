const mongoose = require('mongoose')

const HeroSchema = mongoose.Schema({
  superHero: {
    type: String,
    required: [true, "Please name a hero"],
    unique: true
  },
  realName: {
    type: String,
    maxLength: [200, "Name max 200 characters"]
  }
}) 

module.exports = mongoose.models.Hero || mongoose.model('Hero', HeroSchema) 