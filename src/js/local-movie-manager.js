export default class LocalMovieManager {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.movies = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  _saveData() {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.movies));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  _refreshMovies() {
    this.movies = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  addMovie(movie) {
    const index = this.movies.findIndex(ele => ele.id === movie.id);
    if (index === -1) {
      this.movies.push(movie);
      this._saveData();
    } else {
      console.log('Movie already added:', movie);
    }
  }

  removeMovie(id) {
    const index = this.movies.findIndex(ele => ele.id === id);
    if (index !== -1) {
      this.movies.splice(index, 1);
      this._saveData();
    } else {
      console.log('Movie not found');
    }
  }

  getMovies() {
    this._refreshMovies();
    return this.movies;
  }
}
