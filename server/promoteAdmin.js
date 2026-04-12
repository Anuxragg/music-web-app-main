require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const TARGET_USERNAME = 'admin1';

async function promote() {
  try {
    console.log('--- VOCALZ Account Management ---');
    console.log(`Connecting to database...`);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected.');

    const user = await User.findOne({ username: TARGET_USERNAME });
    
    if (!user) {
      console.log(`❌ Error: User "${TARGET_USERNAME}" not found.`);
      process.exit(1);
    }

    console.log(`Current state of ${TARGET_USERNAME}: Role = ${user.role}`);
    
    user.role = 'admin';
    await user.save();

    console.log(`🚀 SUCCESS: ${TARGET_USERNAME} has been promoted to ADMIN.`);
    console.log('You can now upload tracks and manage the entire library.');

  } catch (err) {
    console.error('❌ Error during promotion:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

promote();
