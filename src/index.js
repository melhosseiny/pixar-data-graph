import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

import MovieAPI from './datasources/movie.js';

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

export default app;
