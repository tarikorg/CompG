const axios = require('axios');
const mongoose = require('mongoose');
const Champion = require('./models/Champion'); // Adjust path as necessary

const mongoURI = 'mongodb://localhost:27017/leaguedatabase';

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected...');
        seedDatabase();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const seedDatabase = async () => {
    try {
        const response = await axios.get('http://localhost:3000/champions');

        // Work directly with the object of champions
        const champions = response.data;

        // Validate champions data before seeding
        Object.keys(champions).forEach(key => {
            const champion = champions[key];

            if (!champion.id || !champion.name || !champion.icon || !champion.title) {
                console.error('Missing required fields in champion:', champion);
            }
        });

        // Clear the old data and insert new champions
        await Champion.deleteMany({});
        console.log('Old data cleared.');

        // Insert champions while keeping the structure intact
        const insertPromises = Object.keys(champions).map(key => {
            const champion = champions[key];
            return Champion.create(champion);
        });

        // Wait for all inserts to complete
        await Promise.all(insertPromises);
        console.log('Database seeded successfully.');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding database:', error.message || error);
        mongoose.disconnect();
    }
};
