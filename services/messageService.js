const MessageModel = require('../repositories/models/messageModel')
const chatGroupService = require('./chatGroupService')
const logger = require('../logger/logger')

class MessageService {
  async add (data) {
    logger.info('MessageService:add: Adding message to DB')
    const message = new MessageModel(data)
    await message.save()
    logger.info('MessageService:add: Added message to DB')
  }

  async get (userId) {
    let condition = {}
    logger.info('MessageService:get: Get messages')
    const result = await chatGroupService.getByUserId(userId)
    if (result._id) {
      condition = { groupId: result._id }
    }
    const messages = await MessageModel.find(condition)
      .limit(100)
      .sort({ created: -1 })
      .populate({
        path: 'sentBy',
        select: 'username'
      })
      .lean()
    logger.info('MessageService:get: Returning messages ')
    return messages.reverse()
  }
}

module.exports = new MessageService()
