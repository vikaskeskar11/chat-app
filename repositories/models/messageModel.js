const mongoose = require('mongoose')
const messageSchema = require('../schemas/messageSchema')

module.exports = mongoose.model('messages', messageSchema, 'messages')
