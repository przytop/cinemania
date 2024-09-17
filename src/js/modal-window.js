'use strict';

import TmdbApi from './tmdb-api';
import LocalMovieManager from './local-movie-manager';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const backdrop = document.querySelector('.backdrop');

export default function openMovieInfoModal(id) {
  backdrop.classList.remove('is-closed');
  createMovieInfoMarkup(id);
  document.body.style.overflow = 'hidden';
}

function closeMovieInfoModal() {
  backdrop.classList.add('is-closed');
  backdrop.innerHTML = '';
  document.body.style.overflow = 'auto';
}

export async function createMovieInfoMarkup(id) {
  const tmdb = new TmdbApi();

  try {
    const movie = await tmdb.getMovieDetails(id);
    const genreNames = movie.genres.map(genre => genre.name).join(' ');

    backdrop.innerHTML = `
      <div class="modal-window">
        <button class="modal-btn-close" type="button">
          <svg width="30" height="30">   
            <line
              x1="0.0"
              y1="9.5"
              x2="10.5"
              y2="20.5"
              stroke="#f87719"
              stroke-width="2"
            />
            <line
              x1="0.0"
              y1="20.5"
              x2="10.5"
              y2="9.5"
              stroke="#f87719"
              stroke-width="2"
            />
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${movie.title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${movie.vote_average.toFixed(
                  1
                )}</span>
                <span class="modal-window-accent-votes">${
                  movie.vote_count
                }</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${movie.popularity.toFixed(
                1
              )}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${genreNames}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${movie.overview}</p>
          <button id="library-actions-btn" type="submit"></button>
        </div>
      </div>
    `;

    const closeBtn = document.querySelector('.modal-btn-close');
    closeBtn.addEventListener('click', closeMovieInfoModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMovieInfoModal();
      }
    });

    backdrop.addEventListener('click', function (event) {
      if (event.target.closest('.modal-window')) {
        return;
      }
      closeMovieInfoModal();
    });

    const addLibraryBtn = document.getElementById('library-actions-btn');
    updateLibraryButton(movie.id);

    addLibraryBtn.addEventListener('click', () => {
      toggleLibrary(movie);
      updateLibraryButton(movie.id);
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function toggleLibrary(movie) {
  const lmm = new LocalMovieManager('myLibrary');
  const isInLibrary = lmm.getMovies().some(m => m.id === movie.id);

  if (!movie.id) {
    console.error('Movie ID is undefined:', movie);
    return;
  }

  if (isInLibrary) {
    lmm.removeMovie(movie.id);
    iziToast.info({
      title: 'Info',
      message: 'Removed from my library',
      backgroundColor: 'red',
      messageSize: '13',
      closeOnEscape: true,
      closeOnClick: true,
    });
  } else {
    lmm.addMovie(movie);
    iziToast.success({
      title: 'Success ',
      message: 'Added to my library',
      backgroundColor: 'orange',
      messageSize: '13',
      closeOnEscape: true,
      closeOnClick: true,
    });
  }

  updateLibraryButton(movie.id);
}

function updateLibraryButton(movieId) {
  const lmm = new LocalMovieManager('myLibrary');
  const isInLibrary = lmm.getMovies().some(m => m.id === movieId);
  const libraryBtn = document.getElementById('library-actions-btn');

  if (isInLibrary) {
    libraryBtn.textContent = 'Remove from my library';
  } else {
    libraryBtn.textContent = 'Add to my library';
  }
}
