import TmdbApi from './tmdb-api.js';
import Library from './local-movie-manager.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const tmdb = new TmdbApi();
const library = new Library('myLibrary');


async function getUpcomingMovies() {
  const loaderUpcoming = document.getElementById('loader-upcoming');
  
  try {
    const movies = await tmdb.getUpcomingMovies();
    const today = new Date();
    const thisMonthMovies = movies.filter(movie => {
      const releaseDate = new Date(movie.release_date);
      return (
        releaseDate.getFullYear() === today.getFullYear() &&
        releaseDate.getMonth() === today.getMonth()
      );
    });

    if (thisMonthMovies.length === 0) {
      loaderUpcoming.style.display = 'none';
      displayMessage('No upcoming movies this month.');
    } else {
      const randomMovie =
        thisMonthMovies[Math.floor(Math.random() * thisMonthMovies.length)];
      loaderUpcoming.style.display = 'none';
      displayMovie(randomMovie);
    }
  } catch (error) {
    console.error('Failed to fetch upcoming movies:', error);
    displayMessage('Failed to fetch upcoming movies. Please try again later');
  }
}

function displayMessage(message) {
  iziToast.info({
    title: 'Info',
    message: message,
  });
}

function displayMovie(movie) {
  const movieContainer = document.getElementById('movie-container');
  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const releaseDate = new Date(movie.release_date).toLocaleDateString();
  const genres = movie.genre_ids.map(id => genreMap[id]).join(', ');
  const popularity = movie.popularity.toFixed(1);

  const html = `
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${imageUrl}" alt="${movie.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${movie.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${releaseDate}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${movie.vote_average} / ${movie.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${popularity}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${genres}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${movie.overview}</p>
        <button id="library-btn" data-id="${movie.id}">Add to my library</button>
      </div>
    </div>
  `;

  movieContainer.innerHTML = html;

  const libraryBtn = document.getElementById('library-btn');
  libraryBtn.addEventListener('click', () => toggleLibrary(movie));
  updateLibraryButton(movie.id);
}

function toggleLibrary(movie) {
  const movieId = movie.id;
  const isInLibrary = library.getMovies().some(m => m.id === movieId);

  if (isInLibrary) {
    library.removeMovie(movieId);
    iziToast.info({
      title: 'Info',
      message: 'Removed from my library',
      backgroundColor: 'red',
      messageSize: '13',
      closeOnEscape: 'true',
      closeOnClick: 'true',
    });
  } else {
    library.addMovie(movie);
    iziToast.success({
      title: 'Success',
      message: 'Added to my library',
      backgroundColor: 'orange',
      messageSize: '13',
      closeOnEscape: 'true',
      closeOnClick: 'true',
    });
  }

  updateLibraryButton(movieId);
}

function updateLibraryButton(movieId) {
  const isInLibrary = library.getMovies().some(m => m.id === movieId);
  const libraryBtn = document.getElementById('library-btn');

  if (isInLibrary) {
    libraryBtn.textContent = 'Remove from my library';
  } else {
    libraryBtn.textContent = 'Add to my library';
  }
}

const genreMap = {};
tmdb.getMovieGenres().then(genres => {
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  getUpcomingMovies();
});
