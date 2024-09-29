import { gql } from 'apollo-server';

const typeDefs = gql`
type Config {
  baseUrl: String
  logoSizes: [String]
  posterSizes: [String]
  profileSizes: [String]
  backdropSizes: [String]
}

type Movie {
  id: ID!
  title: String
  releaseDate: String
  score: Float
  posterPath: String
  info: MovieInfo
}

type MovieInfo {
  id: ID!
  title: String
  homepage: String
  overview: String
  releaseDate: String
  productionCompanies: [Company]!
  tagline: String
  posterPath: String
  backdropPath: String
}

type Company {
  id: ID!
  name: String
}

type Query {
  config: Config,
  movies(
    page: Int
  ): MovieConnection!
  movie(id: ID!): MovieInfo
}

type MovieConnection {
  page: Int!
  hasNextPage: Boolean!
  totalPages: Int!
  totalResults: Int!
  movies: [Movie]!
}
`;

export default typeDefs;
