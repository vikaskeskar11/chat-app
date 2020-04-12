const userService = require('./userService')
const chatGroupService = require('./chatGroupService')
const logger = require('../logger/logger')

class InitService {
  async init () {
    const users = require('../helper-data/users.json')
    for (const user of users) {
      try {
        await userService.add(user)
      } catch (error) {
        logger.error('InitService:init: Error ', { error })
        continue
      }
    }

    const groups = require('../helper-data/groups.json')
    const existingGroups = await chatGroupService.get()
    if (!existingGroups.length) {
      const users = await userService.get()
      const userIds = users.map(user => user._id)
      for (const group of groups) {
        try {
          group.users = userIds
          await chatGroupService.add(group)
        } catch (error) {
          logger.error('InitService:init: Error ', { error })
          continue
        }
      }
    }
  }
}

module.exports = new InitService()
