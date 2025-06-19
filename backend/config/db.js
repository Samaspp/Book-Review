const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = 'mongodb://localhost:27017/bookreview'; // hardcoded now; can be env later

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' MongoDB connected');
  } catch (err) {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
