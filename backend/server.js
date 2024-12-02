const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedefs.js');
const resolvers = require('./graphql/resolvers.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/leaguedatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create the Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server using `startStandaloneServer`
(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Apollo Server running at ${url}`);
})();
