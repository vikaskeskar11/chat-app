const Schema = require('mongoose').Schema

const chatGroupSchema = new Schema({
  name: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'users' }]
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

module.exports = chatGroupSchema
