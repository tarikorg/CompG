// Define the GraphQL Schema
const gql = String.raw;

const typeDefs = gql`
  type Synergy {
  top: [String]
  jungle: [String]
  mid: [String]
  adc: [String]
  support: [String]
}

type Champion {
  id: ID!
  icon: String!
  title: String!
  lane: String
  counter: [String]
  scale: [Int]
  synergy: Synergy
  name: String!
}

type Query {
  # Get a single champion by ID
  getChampion(id: ID!): Champion

  # Get all champions
  getAllChampions: [Champion!]!
}
`;

module.exports = typeDefs