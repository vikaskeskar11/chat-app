/**
 * Token Schema
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = new Schema({
  userId: { type: String },
  token: { type: String },
  key: { type: String }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})
