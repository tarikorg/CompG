// Define Resolvers
const Champion = require('../models/Champion')

const resolvers = {
    Query: {
        // Resolver to get a single champion by ID
        getChampion: async (_, { id }) => {
            try {
                const champion = await Champion.findOne({ id }); // Find champion by ID
                if (!champion) {
                    throw new Error('Champion not found');
                }
                return champion;
            } catch (error) {
                throw new Error('Error fetching champion: ' + error.message);
            }
        },

        // Resolver to get all champions
        getAllChampions: async () => {
            try {
                const champions = await Champion.find(); // Find all champions
                return champions;
            } catch (error) {
                throw new Error('Error fetching champions: ' + error.message);
            }
        }
    }
}

module.exports = resolvers;
