const { ApolloServer, gql } = require('@apollo/server');
const mongoose = require('mongoose');

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

// Define Mongoose Schema and Model
const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});
const Task = mongoose.model('Task', TaskSchema);

// Define the GraphQL Schema
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(title: String!): Task
    toggleTaskCompletion(id: ID!): Task
  }
`;

// Define Resolvers
const resolvers = {
    Query: {
        tasks: async () => await Task.find(),
    },
    Mutation: {
        addTask: async (_, { title }) => {
            const task = new Task({ title, completed: false });
            await task.save();
            return task;
        },
        toggleTaskCompletion: async (_, { id }) => {
            const task = await Task.findById(id);
            task.completed = !task.completed;
            await task.save();
            return task;
        },
    },
};

// Create the Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
server.listen().then(({ url }) => {
    console.log(`Apollo Server running at ${url}`);
});
