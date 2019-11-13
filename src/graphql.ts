import { ApolloServer, gql } from "apollo-server-lambda";
import { getData } from "./helpers";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Stock {
    date: String!
    stock: String!
    price: Float
  }

  type Query {
    openingValues: [Stock]
  }
`;

const REST_API =
  "https://akenj3macj.execute-api.us-east-1.amazonaws.com/dev/stocks/opening";

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    openingValues: async _ => {
      return await getData(REST_API);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

export const graphqlHandler = server.createHandler();
