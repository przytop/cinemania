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
    return this.movies;
  }
}

// For testing
const manager = new LocalMovieManager('local-movies');
const test = async () => {
  const log = () => console.log(manager.getMovies());
  try {
    log();
    manager.addMovie({ id: '438631', title: 'Dune' });
    log();
    manager.addMovie({ id: '693134', title: 'Dune: Part Two' });
    log();
    manager.removeMovie('438631');
    log();
    manager.removeMovie('693134');
    log();
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// test();
