const UserModel = require('../repositories/models/userModel')
const logger = require('../logger/logger')
const generalUtils = require('../utils/generalUtils')
const tokenService = require('./tokenService')

class UserService {
  async add (data) {
    const isExists = await UserModel.isUsernameExist(data.username)
    if (isExists) {
      logger.error('UserService:add: User already exists')
      throw new Error('User Exists')
    }
    const user = new UserModel(data)
    let result = await user.save()
    result = generalUtils.omitProperties(result, ['password'])
    logger.info('UserService:add: User added ', { username: result.username })
    return result
  }

  /**
   * @function
   * @name verifyCredentials
   * @param {object} data - user credentials.
   * @param {string} data.username - username of user.
   * @param {string} data.password - password of user.
   * @returns {Object}
   * @description verify credentials of user.
   */
  async verifyCredentials (data) {
    const user = await UserModel.findOne({ username: new RegExp('^' + data.username + '$', 'i') })
    if (user) {
      // user found
      const isMatch = await user.comparePassword(data.password, user.password)

      if (isMatch) {
        // valid username and password
        return user
      } else {
        // valid user but invalid password
        throw Error('user.invalidPassword')
      }
    } else {
      // user not found
      throw Error('user.notFound')
    }
  }

  /**
   * @function
   * @name login
   * @param {object} user - user credentials.
   * @param {string} user.username - username of user.
   * @param {string} user.password - password of user.
   * @returns {Object}
   * @description Login user and return token.
   */
  async login (user) {
    let data = await this.verifyCredentials(user)
    data = {
      _id: data._id,
      username: data.username,
      email: data.email
    }
    const token = await tokenService.generateToken(data)
    logger.info('UserService:get: User logged in ', { data })
    return { data, token: token.token }
  }

  async get () {
    const users = await UserModel.find({})
      .lean()
    logger.info('UserService:get: Returning user list')
    return users
  }
}

module.exports = new UserService()
