import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.mjs';
import resolvers from './resolvers.mjs';

import MovieAPI from './datasources/movie.mjs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI()
  }),
  introspection: true,
  playground: true
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
