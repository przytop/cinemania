import axios from 'axios';

export default class TmdbApi {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // VITE_API_KEY must be set correctly in environment variables
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY`, // For Testing
      },
    });
  }

  async _fetch(endpoint, params = {}) {
    try {
      const response = await this.axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  async getTrendingMovies(time_window) {
    if (!['day', 'week'].includes(time_window)) {
      throw new Error("Invalid time_window. Must be 'day' or 'week'");
    }
    return (await this._fetch(`/trending/movie/${time_window}`)).results;
  }

  async getTrendingMoviesTotal(time_window, page) {
    if (!['day', 'week'].includes(time_window)) {
      throw new Error("Invalid time_window. Must be 'day' or 'week'");
    }
    return await this._fetch(`/trending/movie/${time_window}`, { page });
  }

  async getUpcomingMovies() {
    return (await this._fetch(`/movie/upcoming`)).results;
  }

  async searchMovie(query, page = 1) {
    return (await this._fetch('/search/movie', { query, page })).results;
  }

  async searchMovieTotal(query, page = 1) {
    return await this._fetch('/search/movie', { query, page });
  }

  async getMovieDetails(movie_id) {
    return await this._fetch(`/movie/${movie_id}`);
  }

  async getMovieVideos(movie_id) {
    return (await this._fetch(`/movie/${movie_id}/videos`)).results;
  }

  async getMovieGenres() {
    return (await this._fetch('/genre/movie/list')).genres;
  }

  async getCountriesList() {
    return await this._fetch('/configuration/countries');
  }
}

// For testing
const tmdb = new TmdbApi();
const test = async () => {
  try {
    console.log(await tmdb.getTrendingMovies('day'));
    console.log(await tmdb.getTrendingMovies('week'));
    console.log(await tmdb.getUpcomingMovies());
    console.log(await tmdb.searchMovie('Dune'));
    console.log(await tmdb.getMovieDetails(438631));
    console.log(await tmdb.getMovieVideos(438631));
    console.log(await tmdb.getMovieGenres());
    console.log(await tmdb.getCountriesList());
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// test();
