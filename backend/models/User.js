const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: String,
  createdAt: { type: Date, default: Date.now },
  avatarSeed: { type: String, default: () => Math.random().toString(36).substring(2, 12) 
}

});

module.exports = mongoose.model('User', userSchema);
