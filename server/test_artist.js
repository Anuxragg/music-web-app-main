const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Artist = require('./models/Artist');
    try {
        await Artist.findOneAndUpdate(
            { displayName: 'Test' },
            { $set: { avatar: 'test' } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        console.log('Saved 1');
        await Artist.findOneAndUpdate(
            { displayName: 'Test2' },
            { $set: { avatar: 'test2' } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        console.log('Saved 2');
    } catch(e) {
        console.error('ERROR', e.message);
    }
    process.exit(0);
});
