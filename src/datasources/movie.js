import { RESTDataSource } from 'apollo-datasource-rest';

import dotenv from 'dotenv';
dotenv.config();

const API_VERSION = 3;
const API_KEY = process.env.MOVIEDB_API_KEY;

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://api.themoviedb.org/${API_VERSION}/`;
  }

  willSendRequest(request) {
    request.params.set('api_key', API_KEY);
  }

  async getConfig() {
    const response = await this.get('configuration');
    return this.configReducer(response);
  }

  async getMovies(page) {
    let response = await this.get(
      'company/3-pixar-animation-studios/movies',
      { page }
    );
    response.results = Array.isArray(response.results)
      ? response.results.map(movie => this.movieReducer(movie))
      : [];
    return response;
  }

  async getMovieById({ movieId }) {
    const response = await this.get(`movie/${movieId}`);
    return this.movieInfoReducer(response);
  }

  async getMoviesById({ movieIds }) {
    return Promise.all(
      movieIds.map(movieId => this.getMovieById({ movieId }))
    );
  }

  configReducer(config) {
    return {
      baseUrl: config.images.secure_base_url,
      logoSizes: config.images.logo_sizes,
      posterSizes: config.images.poster_sizes,
      profileSizes: config.images.profile_sizes,
      backdropSizes: config.images.backdrop_sizes
    }
  }

  movieReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      score: movie.vote_average,
      posterPath: movie.poster_path
    }
  }

  movieInfoReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      homepage: movie.homepage,
      overview: movie.overview,
      releaseDate: movie.release_date,
      productionCompanies: movie.production_companies,
      tagline: movie.tagline,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path
    }
  }
}

export default MovieAPI;
