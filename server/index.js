import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import dotenv from 'dotenv';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

dotenv.config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const PORT = process.env.PORT || 4000;
const SECRET = process.env.SECRET;
const SECRET2 = process.env.SECRET2;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: { models, SECRET, SECRET2 },
});

const app = express();

server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀 `,
    );
  });
});
