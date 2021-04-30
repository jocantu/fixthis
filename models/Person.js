const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  picture: {
    type: String,
    default: '/uploads/placeholder.png', // example
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['missing', 'found', 'deceased', 'kidnapped'],
    default: 'missing',
  },
  hairColor: {
    type: String,
  },
  lastSeenDate: {
    type: Date,
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  height: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  eyeColor: {
    type: String,
  },
  placeOfBirth: {
    type: String,
  },
  weight: {
    type: String,
  },
  race: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true })

module.exports = mongoose.model('Person', PersonSchema)

