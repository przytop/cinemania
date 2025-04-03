import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async () => {
  const tmdb = new TmdbApi();
  const catalogCardsContainer = document.querySelector('.catalog-movie-list');
  const sorryMessage = document.querySelector('.catalog-sorry-message');
  const input = document.querySelector('.input-text');
  const searchButton = document.querySelector('.catalog-button');
  const yearSelect = document.querySelector('.year-select');
  const xButton = document.querySelector('.x-button');
  const pagination = document.querySelector('.pagination-container');
  const loaderCatalog = document.getElementById('loader-catalog');
  const genreAbbreviations = { 'Science Fiction': 'Sci-Fi' };

  let query = '';
  let currentPage = 1;
  let totalPages;

  sorryMessage.style.display = 'none';

  const fetchMovies = async (page, releaseYear) => {
    try {
      let movies = [];

      if (query) {
        yearSelect.disabled = false;
        const response = await tmdb.searchMovieTotal(query, page, releaseYear);
        movies = response.results;
        totalPages = response.total_pages;
      } else {
        yearSelect.disabled = true;
        const response = await tmdb.getTrendingMoviesTotal('week', page);
        movies = response.results;
        totalPages = 5;
      }

      loaderCatalog.style.display = 'none';
      return movies;
    } catch (e) {
      loaderCatalog.style.display = 'none';
      console.error('Error fetching movies:', e);
      return [];
    }
  };

  const fetchGenres = async () => {
    try {
      return await tmdb.getMovieGenres();
    } catch (e) {
      console.error('Error fetching genres:', e);
      return [];
    }
  };

  const starRating = rating => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    return (
      '<svg class="star full"><use xlink:href="#icon-star"></use></svg>'.repeat(
        fullStars
      ) +
      (halfStar
        ? '<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'
        : '') +
      '<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>'.repeat(
        5 - Math.ceil(rating / 2)
      )
    );
  };

  const renderMovies = async page => {
    catalogCardsContainer.innerHTML = '';
    loaderCatalog.style.display = 'block';

    const movies = await fetchMovies(page, yearSelect.value);
    const getGenres = await fetchGenres();

    sorryMessage.style.display = movies.length ? 'none' : 'block';

    movies.forEach(movie => {
      const genres = movie.genre_ids
        .slice(0, 2)
        .map(id => getGenres.find(genre => genre.id === id)?.name || 'Unknown')
        .map(name => genreAbbreviations[name] || name)
        .join(', ');
      const releaseDate = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'Unknown';
      const rating = Math.round(movie.vote_average * 10) / 10;

      const card = document.createElement('li');
      card.classList.add('card');
      card.style.background = movie.poster_path ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) center/cover` : 'url(/img/poster-placeholder.jpg) center/cover';;
      card.dataset.id = movie.id;
      card.innerHTML = `
        <div class="card-content">
          <h2>${movie.title}</h2>
          <p>${genres} | ${releaseDate} <span class="stars">${starRating(
        rating
      )}</span></p>
        </div>
      `;
      card.addEventListener('click', () => openMovieInfoModal(movie.id));

      catalogCardsContainer.appendChild(card);
    });

    renderPagination(page, totalPages);
  };

  const renderPagination = (currentPage, totalPages) => {
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    const createPageButton = page => {
      const button = document.createElement('button');
      button.textContent = page;
      button.classList.add('page-number-button');
      if (page === currentPage) {
        button.classList.add('active');
        button.disabled = true;
      }
      button.addEventListener('click', () => {
        currentPage = page;
        renderMovies(currentPage);
      });
      return button;
    };

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('arrow-button');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderMovies(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    const firstButton = createPageButton(1);
    pagination.appendChild(firstButton);

    if (currentPage > 3) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

    let visiblePages = 3;
    if (window.innerWidth >= 768) visiblePages = 5;
    if (window.innerWidth >= 1024) visiblePages = 7;

    const startPage = Math.max(1, currentPage -  Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, currentPage +  Math.floor(visiblePages / 2));

    for (let page = startPage; page <= endPage; page++) {
      if (page !== 1) {
        // Skip page 1 because it's already added
        pagination.appendChild(createPageButton(page));
      }
    }

    if (endPage < totalPages) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
      pagination.appendChild(createPageButton(totalPages));
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('arrow-button');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderMovies(currentPage);
      }
    });
    pagination.appendChild(nextButton);
  };

  const handleSearch = () => {
    query = input.value.trim();
    currentPage = 1;
    renderMovies(currentPage);
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (input.value.trim()) {
        handleSearch();
      }
    }
  });
  input.addEventListener(
    'input',
    () => (xButton.style.visibility = input.value ? 'visible' : 'hidden')
  );

  xButton.addEventListener('click', () => {
    input.value = '';
    xButton.style.visibility = 'hidden';
  });

  searchButton.addEventListener('click', () => {
    if (input.value.trim()) {
      handleSearch();
    } else {
      input.focus();
    }
  });

  const currentYear = new Date().getFullYear();
  const startYear = 1900;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  yearSelect.addEventListener('change', () => {
    currentPage = 1;
    renderMovies(currentPage);
  });

  renderMovies(currentPage);
});
