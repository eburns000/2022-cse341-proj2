const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(dbConfig.url);
    console.log('Connected to the database!');
  } catch (err) {
    console.log('Cannot connect to the database!', err);
    process.exit();    
  }
}

module.exports = connectDB;