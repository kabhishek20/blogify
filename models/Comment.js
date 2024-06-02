const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment : {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;