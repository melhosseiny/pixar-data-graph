const resolvers = {
  Query: {
    config: (_, __, { dataSources }) => dataSources.movieAPI.getConfig(),
    movies: async (_, { page = 1 }, { dataSources }) => {
      const response = await dataSources.movieAPI.getMovies(page);

      return {
        page: response.page,
        hasNextPage: response.page < response.total_pages,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        movies: response.results
      }
    },
    movie: (_, { id }, { dataSources }) => dataSources.movieAPI.getMovieById({ movieId: id })
  },
  Movie: {
    info: (movie, __, { dataSources }) => dataSources.movieAPI.getMovieById({ movieId: movie.id })
  }
}

export default resolvers;
