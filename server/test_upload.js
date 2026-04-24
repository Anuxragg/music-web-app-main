const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const mongoose = require('mongoose');

require('dotenv').config({ path: './.env' });

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const User = require('./models/User');
        const { generateAccessToken } = require('./config/jwt');
        
        // Find admin user
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('No admin found');
            process.exit(1);
        }
        
        const token = generateAccessToken({ id: admin._id.toString() });
        
        const form = new FormData();
        form.append('avatar', fs.createReadStream('c:/Users/ANURAG/OneDrive/Documents/WORKS/music-web-app-main/public/m-app-logo.png'));
        
        console.log('Testing PATCH /artists/name/Justin Bieber...');
        const res = await axios.patch('http://localhost:5000/api/artists/name/Justin Bieber', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });
        console.log('SUCCESS', res.status, res.data);
    } catch(err) {
        console.log('ERROR', err.response?.status, err.response?.data?.message || err.message);
    }
    process.exit(0);
}
test();
