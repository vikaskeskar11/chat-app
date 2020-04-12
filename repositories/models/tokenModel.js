/**
 * Token Model
 */
const mongoose = require('mongoose')
const tokenSchema = require('../schemas/tokenSchema')

module.exports = mongoose.model('token', tokenSchema, 'tokens')
