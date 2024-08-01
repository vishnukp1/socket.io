import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('chat', chatSchema);
