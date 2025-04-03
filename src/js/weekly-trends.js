import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async function () {
  const movieCardsContainer = document.getElementById('weekly-cards');
  const tmdb = new TmdbApi();
  const loaderWeekly = document.getElementById('loader-weekly');

  const genreAbbreviations = {
    'Science Fiction': 'Sci-Fi',
  };

  const backdrop = document.querySelector('.backdrop');

  function closeModal() {
    backdrop.classList.remove('is-visible');
    backdrop.classList.add('is-closed');
  }

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });
 
  try {
    const movies = await tmdb.getTrendingMovies('week');

    async function displayGenres() {
      const screenWidth = window.innerWidth;
      let genresToShow = 2;
      if (screenWidth <= 600) {
        genresToShow = 1;
      }

      movieCardsContainer.innerHTML = '';

      for (const movie of movies.slice(0, 3)) {
        const card = document.createElement('div');
        card.classList.add('card');

        const id = movie.id;
        const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "../img/poster-placeholder.jpg";
        const title = movie.title;
        const releaseDate = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 'Unknown';
        const rating = Math.round(movie.vote_average * 10) / 10;

        const genresList = await tmdb.getMovieGenres();
        const genreNames = movie.genre_ids
          .slice(0, genresToShow)
          .map(id => {
            const genre = genresList.find(g => g.id === id);
            const genreName = genre ? genre.name : 'Unknown';
            return genreAbbreviations[genreName] || genreName;
          })
          .join(', ');

        const maxStars = 5;
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1 ? 1 : 0;
        const emptyStars = maxStars - fullStars - halfStar;

        const stars = [
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

        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';

        card.dataset.id = id;

        card.innerHTML = `
          <div class="card-content">
            <h2>${title}</h2>
            <p>${genreNames} | ${releaseDate} <span class="stars">${stars}</span></p>
          </div>
        `;

        loaderWeekly.style.display = 'none';
        movieCardsContainer.appendChild(card);
      }

      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');

          if (!id) {
            console.error('Movie ID is undefined');
            return;
          }

          openMovieInfoModal(id);
        });
      });
    }

    displayGenres();
    window.addEventListener('resize', displayGenres);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
