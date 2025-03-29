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
  let currentPage = 1;
  let totalPages = 1;
  let query = '';

  sorryMessage.style.display = 'none';

  const fetchMovies = async (page = 1, resultsPerPage = 18) => {
    try {
      const movies = query
        ? await tmdb.searchMovieTotal(query, page)
        : await tmdb.getTrendingMoviesTotal('week', page);
      totalPages = Math.ceil(movies.total_results / 20);
      loaderCatalog.style.display = 'none';
      return movies.results.slice(0, resultsPerPage);
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

  const getGenres = await fetchGenres();

  const filterByYear = (movies, year) =>
    year
      ? movies.filter(m => new Date(m.release_date).getFullYear() == year)
      : movies;

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

  const renderMovies = async (page = 1) => {
    loaderCatalog.style.display = 'block';
    const movies = filterByYear(await fetchMovies(page), yearSelect.value);
    catalogCardsContainer.innerHTML = '';
    sorryMessage.style.display = movies.length ? 'none' : 'block';

    movies.forEach(m => {
      const genres = m.genre_ids
        .slice(0, 2)
        .map(id => getGenres.find(g => g.id === id)?.name || 'Unknown')
        .map(name => genreAbbreviations[name] || name)
        .join(', ');
      const releaseDate = m.release_date
        ? new Date(m.release_date).getFullYear()
        : 'Unknown';
      const rating = Math.round(m.vote_average * 10) / 10;

      const card = document.createElement('li');
      card.classList.add('card');
      card.style.background = `url(https://image.tmdb.org/t/p/w500${m.poster_path}) center/cover`;
      card.dataset.id = m.id;
      card.innerHTML = `
        <div class="card-content">
          <h2>${m.title}</h2>
          <p>${genres} | ${releaseDate} <span class="stars">${starRating(
        rating
      )}</span></p>
        </div>
      `;
      card.addEventListener('click', () => openMovieInfoModal(m.id));
      catalogCardsContainer.appendChild(card);
    });

    renderPagination(page);
  };

  const renderPagination = currentPage => {
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
        catalogCardsContainer.innerHTML = '';
        loaderCatalog.style.display = 'block';
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
        catalogCardsContainer.innerHTML = '';
        loaderCatalog.style.display = 'block';
        renderMovies(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    const firstButton = createPageButton(1);
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    pagination.appendChild(firstButton);

    if (currentPage > 3) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

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
        catalogCardsContainer.innerHTML = '';
        loaderCatalog.style.display = 'block';
        renderMovies(currentPage);
      }
    });
    pagination.appendChild(nextButton);
  };

  const handleSearch = () => {
    catalogCardsContainer.innerHTML = '';
    loaderCatalog.style.display = 'block';
    query = input.value.trim();
    currentPage = 1;
    renderMovies(currentPage);
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (input.value.trim()) {
        handleSearch();
        input.value = '';
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
      input.value = '';
    } else {
      input.focus();
    }
  });

  yearSelect.addEventListener('change', handleSearch);

  renderMovies(currentPage);
});
