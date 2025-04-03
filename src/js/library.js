import TmdbApi from './tmdb-api';
import LocalMovieManager from './local-movie-manager';
import openMovieInfoModal from './modal-window';

const tmdb = new TmdbApi();
const lmm = new LocalMovieManager('myLibrary');
const myLibrarySection = document.querySelector('.my-library-background');
const movieListElement = document.querySelector('.my-library-movie-list');
const sorryMessage = document.querySelector('.my-library-sorry');
const genreForm = document.querySelector('.genre-form');
const genreSelect = document.querySelector('#genre');
const loadMoreButton = document.getElementById('my-library-button-load');
const searchButton = document.getElementById('my-library-button-search');
const loaderLibrary = document.getElementById('loader-library');

let currentDisplayCount = 0;
let genreSelected = '';
const batchSize = 9;
const genreMap = new Map();

const fetchGenres = async () => {
  try {
    const genres = await tmdb.getMovieGenres();
    genres.forEach(genre => {
      if (genre.id && genre.name) {
        genreMap.set(genre.id, genre.name);
      }
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

const populateGenreSelect = async () => {
  await fetchGenres();
  genreMap.forEach((name, id) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    genreSelect.appendChild(option);
  });
};

const createStarRating = rating => {
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
};

const createMovieListItem = movie => {
  const listItem = document.createElement('li');
  listItem.classList.add('my-library-movie-list-item');
  const genreNames = movie.genres
    ? movie.genres
        .map(genre => genre.name)
        .slice(0, 2)
        .join(', ')
    : movie.genre_ids
    ? movie.genre_ids
        .map(id => genreMap.get(id))
        .slice(0, 2)
        .join(', ')
    : 'Unknown';
  const id = movie.id;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown';
  const rating = Math.round(movie.vote_average * 10) / 10;
  const stars = createStarRating(rating);

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "../img/poster-placeholder.jpg" ;
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
};

const renderMovieList = (update = false) => {
  if (myLibrarySection) {
    loaderLibrary.style.display = 'block';
    const movies = lmm.getMovies() || [];

    const filteredMovies = genreSelected
      ? movies.filter(movie =>
          movie.genres
            ? movie.genres.some(genre => genre.id === parseInt(genreSelected))
            : movie.genre_ids
            ? movie.genre_ids.includes(parseInt(genreSelected))
            : false
        )
      : movies;

    if (filteredMovies.length === 0) {
      movieListElement.innerHTML = '';
      loaderLibrary.style.display = 'none';
      sorryMessage.style.display = 'block';
      if (movies.length === 0) {
        genreForm.style.display = 'none';
      }
      return;
    }

    if (filteredMovies.length > 0) {
      sorryMessage.style.display = 'none';
    }

    const moviesToDisplay = update
      ? filteredMovies.slice(0, currentDisplayCount)
      : filteredMovies.slice(
          currentDisplayCount,
          currentDisplayCount + batchSize
        );

    loaderLibrary.style.display = 'none';
    genreForm.style.display = 'block';

    if (update) {
      movieListElement.innerHTML = '';
    }

    moviesToDisplay.forEach(movie => {
      const listItem = createMovieListItem(movie);
      movieListElement.appendChild(listItem);
    });

    if (!update) {
      currentDisplayCount += batchSize;
    }

    if (currentDisplayCount >= filteredMovies.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  }
};

export const updateLibrary = async (reset, update) => {
  if (reset) {
    movieListElement.innerHTML = '';
    sorryMessage.style.display = 'none';
    loadMoreButton.style.display = 'none';
    currentDisplayCount = 0;
    renderMovieList();
  } else if (update) {
    renderMovieList(update);
    return;
  } else {
    renderMovieList();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  if (myLibrarySection) {
    genreSelect.addEventListener('change', () => {
      genreSelected = genreSelect.value;
      updateLibrary(true, false);
    });

    loadMoreButton.addEventListener('click', () => {
      loadMoreButton.style.display = 'none';
      updateLibrary(false, false);
    });

    searchButton.addEventListener('click', () => {
      window.location.href = './catalog.html';
    });

    await populateGenreSelect();
    updateLibrary(true, false);
  }
});
