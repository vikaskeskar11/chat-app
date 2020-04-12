const Schema = require('mongoose').Schema
const messageSchema = new Schema({
  message: { type: String },
  sentBy: { type: Schema.Types.ObjectId, ref: 'user' },
  groupId: { type: Schema.Types.ObjectId, ref: 'chatGroup', default: null }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

module.exports = messageSchema
