const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the post schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String] },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
  category: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

PostSchema.pre('save', function(next) {
  const now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }

  next()
})

module.exports = mongoose.model('Post', PostSchema);
