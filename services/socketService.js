const io = require('socket.io')
const logger = require('../logger/logger')
const tokenService = require('../services/tokenService')
const messageService = require('../services/messageService')
const chatGroupService = require('../services/chatGroupService')

let _io
let _socket

class SocketService {
  configure (server) {
    _io = io.listen(server)
    _io.on('connection', (socket) => {
      socket.on('new user', async (token) => {
        _socket = socket
        try {
          const decoded = await tokenService.verifyToken(token)
          if (decoded) {
            if (_io.sockets.connected[socket.id]['user'] && Array.isArray(_io.sockets.connected[socket.id]['user'])) {
              _io.sockets.connected[socket.id]['user'].push(decoded.userId)
            } else {
              _io.sockets.connected[socket.id]['user'] = []
              _io.sockets.connected[socket.id]['user'].push(decoded.userId)
            }
            const group = await chatGroupService.getByUserId(decoded.userId)
            if (group) {
              socket.join(group.name)
              logger.info('SocketService:configure: Joined room ', { name: group.name })
            }
          } else {
            throw new Error('Invalid token')
          }
          _socket.on('chat message', this.sendMessage)
          logger.info('SocketService:configure: new user ', { decoded })
        } catch (error) {
          logger.error('SocketService:configure: Invalid token ', { token })
          _io.sockets.connected[socket.id].emit('invalid token', 'Please login again')
        }
      })
    })
  }

  async sendMessage (event) {
    try {
      const decoded = await tokenService.verifyToken(event.token)
      if (decoded) {
        const userId = decoded.userId
        const group = await chatGroupService.getByUserId(userId)
        if (group && group._id) {
          await messageService.add({ sentBy: userId, groupId: group._id, message: event.message })
          _io.sockets.in(group.name).emit('chat message', { message: event.message, username: decoded.username, created: new Date() })
        } else {
          _io.sockets.connected[_socket.id].emit('not in group', 'You are not member of any group. Please ask admin to add you in group')
        }
      } else {
        throw new Error('Invalid token')
      }
    } catch (error) {
      _io.sockets.connected[_socket.id].emit('invalid token', 'Please login again')
    }
    logger.info('SocketService:sendMessage: ', { event })
  }
}

module.exports = new SocketService()
