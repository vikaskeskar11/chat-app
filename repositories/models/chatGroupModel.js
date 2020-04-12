const mongoose = require('mongoose')
const chatGroupSchema = require('../schemas/chatGroupSchema')

module.exports = mongoose.model('chatGroup', chatGroupSchema, 'chatGroups')
