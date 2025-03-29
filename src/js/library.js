import TmdbApi from './tmdb-api';
import LocalMovieManager from './local-movie-manager';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async function () {
  const movieListElement = document.querySelector('.my-library-movie-list');
  const loadMoreButton = document.querySelector('.my-library-button.load');
  const sorryMessage = document.querySelector('.my-library-sorry');
  const mainSection = document.querySelector('.my-library-main-section');
  const genreSelect = document.querySelector('#genre');
  const searchButton = document.querySelector('#my-library-button-search');
  const lmm = new LocalMovieManager('myLibrary');
  const tmdb = new TmdbApi();
  const loaderLibrary = document.getElementById('loader-library');

  let currentDisplayCount = 0;
  const batchSize = 12;
  const genreMap = new Map();

  async function fetchGenres() {
    try {
      const genres = await tmdb.getMovieGenres();
      genres.forEach(genre => {
        if (genre.id && genre.name) {
          genreMap.set(genre.id, genre.name);
        }
      });
      populateGenreSelect();
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }

  function populateGenreSelect() {
    if (!genreSelect.querySelector('option[value=""]')) {
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Genre';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      genreSelect.appendChild(defaultOption);
    }

    genreMap.forEach((name, id) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      genreSelect.appendChild(option);
    });
  }

  function getDisplayedGenres(movieGenres) {
    const screenWidth = window.innerWidth;
    const genresToShow = screenWidth <= 600 ? 1 : 2;
    return movieGenres
      .slice(0, genresToShow)
      .map(id => genreMap.get(id) || 'Unknown')
      .join(', ');
  }

  function createStarRating(rating) {
    const maxStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;

    return [
      ...Array(fullStars).fill(
        '<svg class="star full"><use xlink:href="#icon-star"></use></svg>'
      ),
      ...Array(halfStar).fill(
        '<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'
      ),
      ...Array(emptyStars).fill(
        '<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>'
      ),
    ].join('');
  }

  function createMovieListItem(movie) {
    const listItem = document.createElement('li');
    listItem.classList.add('my-library-movie-list-item');

    const genreNames = getDisplayedGenres(movie.genre_ids || []);
    const id = movie.id;
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : 'Unknown';
    const rating = Math.round(movie.vote_average * 10) / 10;
    const stars = createStarRating(rating);

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    listItem.style.backgroundImage = `url(${imageUrl})`;
    listItem.style.backgroundSize = 'cover';
    listItem.style.backgroundPosition = 'center';
    listItem.dataset.id = id;
    listItem.innerHTML = `
      <div class="my-library-gradient"></div>
      <div class="my-library-movie">
        <h2>${movie.title}</h2>
        <p>${genreNames} | ${releaseYear} <span class="stars">${stars}</span></p>
      </div>
    `;

    listItem.addEventListener('click', () => {
      openMovieInfoModal(movie.id);
    });

    return listItem;
  }

  async function fetchMovieDetailsAndAssignGenres(movie) {
    try {
      const movieDetails = await tmdb.getMovieDetails(movie.id);

      if (movieDetails && movieDetails.genres) {
        movie.genre_ids = movieDetails.genres.map(genre => genre.id);
      }
      return movieDetails;
    } catch (error) {
      console.error(`Failed to fetch details for movie ID ${movie.id}:`, error);
      return null;
    }
  }

  async function ensureGenresForMovies(movies) {
    for (const movie of movies) {
      if (!movie.genre_ids) {
        await fetchMovieDetailsAndAssignGenres(movie);
      }
    }
  }

  async function renderMovieList(genreId = '', reset = true) {
    const movies = lmm.getMovies();

    if (reset) {
      currentDisplayCount = 0;
      movieListElement.innerHTML = '';
    }

    await ensureGenresForMovies(movies);

    const filteredMovies = genreId
      ? movies.filter(
          movie =>
            movie.genre_ids && movie.genre_ids.includes(parseInt(genreId))
        )
      : movies;

    if (filteredMovies.length > 0) {
      mainSection.style.display = 'block';
      document.querySelector('.genre-form').style.display = 'block';

      const moviesToDisplay = filteredMovies.slice(
        currentDisplayCount,
        currentDisplayCount + batchSize
      );
      moviesToDisplay.forEach(movie => {
        const listItem = createMovieListItem(movie);
        loaderLibrary.style.display = 'none';
        movieListElement.appendChild(listItem);
      });

      currentDisplayCount += batchSize;

      if (currentDisplayCount >= filteredMovies.length) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }

      searchButton.style.display = 'none';
      searchButton.disabled = true;
    } else {
      loaderLibrary.style.display = 'none';
      sorryMessage.style.display = 'block';
      mainSection.style.display = 'none';
      document.querySelector('.genre-form').style.display = 'none';
      loadMoreButton.style.display = 'none';

      searchButton.style.display = 'block';
      searchButton.disabled = false;
    }

    document.querySelectorAll('.my-library-movie-list-item').forEach(item => {
      item.addEventListener('click', event => {
        const listItem = event.currentTarget;
        const id = listItem.dataset.id;
        if (id) {
          openMovieInfoModal(id);
        }
      });
    });
  }

  async function updateLibraryView(reset = true) {
    loaderLibrary.style.display = 'block';

    const movies = lmm.getMovies();

    if (reset & (movies.length === 0)) {
      loaderLibrary.style.display = 'none';
      currentDisplayCount = 0;
      movieListElement.innerHTML = '';
      sorryMessage.style.display = 'block';
      loadMoreButton.style.display = 'none';
      mainSection.style.display = 'none';
      document.querySelector('.genre-form').style.display = 'none';
      searchButton.style.display = 'block';
      searchButton.disabled = false;
      return;
    } else {
      loaderLibrary.style.display = 'none';
      sorryMessage.style.display = 'none';
      mainSection.style.display = 'block';
      document.querySelector('.genre-form').style.display = 'block';
      searchButton.style.display = 'none';
      searchButton.disabled = true;
    }

    await ensureGenresForMovies(movies);

    for (const movie of movies.slice(
      currentDisplayCount,
      currentDisplayCount + batchSize
    )) {
      const listItem = createMovieListItem(movie);
      movieListElement.appendChild(listItem);
    }

    currentDisplayCount += batchSize;

    if (currentDisplayCount >= movies.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  }

  loadMoreButton.addEventListener('click', () => {
    loadMoreButton.style.display = 'none';
    loaderLibrary.style.display = 'block';
    setTimeout(() => {
      loaderLibrary.style.display = 'none';
      updateLibraryView(false);
    }, 300);
  });

  genreSelect.addEventListener('change', function () {
    const selectedGenreId = genreSelect.value;
    renderMovieList(selectedGenreId);
  });

  await fetchGenres();
  updateLibraryView();
});
