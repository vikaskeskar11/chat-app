const ChatGroupModel = require('../repositories/models/chatGroupModel')
const logger = require('../logger/logger')

class ChatGroupService {
  async add (data) {
    logger.info('ChatGroupService:add: Adding new group')
    const group = new ChatGroupModel(data)
    const result = await group.save()
    logger.info('ChatGroupService:add: Added new group')
    return result
  }

  async get () {
    logger.info('ChatGroupService:get: Get all group  ', { })
    const groups = await ChatGroupModel
      .find({})
      .lean()
    logger.info('ChatGroupService:get: Returning all groups ', { })
    return groups
  }

  async getByUserId (userId) {
    logger.info('ChatGroupService:getByUserId: Get group for  ', { userId })
    const result = await ChatGroupModel
      .findOne(
        {
          users: userId
        })
      .lean()
    logger.info('ChatGroupService:getByUserId: Returning group ', { userId })
    return result
  }
}

module.exports = new ChatGroupService()
