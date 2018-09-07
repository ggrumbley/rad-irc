import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

const PORT = 4000;

const app = express();

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath} 🚀 `)
)
