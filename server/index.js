import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const PORT = 4000;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema, context: { models } });

const app = express();

server.applyMiddleware({ app });

models.sequelize.sync({ }).then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath} 🚀 `)
  });
});
