import TmdbApi from './tmdb-api';
import ModalVideo from 'modal-video';
import 'modal-video/css/modal-video.min.css';
import openMovieInfoModal from './modal-window';

const tmdb = new TmdbApi();

const displayMovieInfo = movie => {
  const hero = document.getElementById('hero-section');
  const heroTextCont = document.querySelector('.hero-text-cont');
  heroTextCont.innerHTML = `
    <h2 class="title">${movie.title}</h2>
    <div class="star-rating">
      ${getStarRatingHTML(movie.vote_average)}
    </div>
    <p class="desc">${movie.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" data-movie-id=${
        movie.id
      }>Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  hero.style.backgroundImage = `linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${imageUrl})`;
  hero.style.backgroundPosition = 'center';

  const watchBtn = document.querySelector('.watch-btn');
  watchBtn.addEventListener('click', watchTrailer(movie.id));

  const detailsBtn = document.querySelector('.details-btn');
  detailsBtn.addEventListener('click', () => openMovieInfoModal(movie.id));
};

const getStarRatingHTML = voteAverage => {
  const roundedRating = Math.round(voteAverage * 10) / 10;
  const maxStars = 5;
  const fullStars = Math.floor(roundedRating / 2);
  const halfStar = roundedRating % 2 >= 1 ? 1 : 0;
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

  return `<span>${stars}</span>`;
};

const watchTrailer = async movieId => {
  const watchBtn = document.querySelector('.watch-btn');

  try {
    const videos = await tmdb.getMovieVideos(movieId);
    const trailer = videos.find(video => video.type === 'Trailer');

    if (trailer) {
      watchBtn.setAttribute('data-video-id', trailer.key);
      watchBtn.click();

      if (!watchBtn.dataset.modalInitialized) {
        new ModalVideo('.watch-btn');
      }
    } else {
      watchBtn.addEventListener('click', modalOopsie);
    }
  } catch (error) {
    console.error('Failed to load movie videos:', error);
    watchBtn.addEventListener('click', modalOopsie);
  }
};

let modalOpened = false;

const modalOopsie = () => {
  if (modalOpened) return;
  modalOpened = true;

  const hero = document.getElementById('hero-section');
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal-oopsie fade-in';
  modalDiv.id = 'modal-cont';
  hero.appendChild(modalDiv);

  const modalCont = document.getElementById('modal-cont');
  modalCont.innerHTML = `
        <p>OOPS... <br> We are very sorry! <br> But we couldn't find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`;

  document.getElementById('modal-close').addEventListener('click', () => {
    modalOpened = false;

    modalDiv.classList.remove('fade-in');
    modalDiv.classList.add('fade-out');

    setTimeout(() => {
      modalDiv.remove();
    }, 300);
  });
};

const loadHeroContent = async () => {
  try {
    const movies = await tmdb.getTrendingMovies('day');
    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      displayMovieInfo(randomMovie);
    } else {
      displayDefaultHero();
    }
  } catch (error) {
    console.error('Failed to load trending movies:', error);
    displayDefaultHero();
  }
};

const displayDefaultHero = () => {
  const hero = document.getElementById('hero-section');
  const textCont = document.getElementById('text-cont');
  hero.classList.add('hero-default');
  textCont.classList.remove('hero-text-cont');
  textCont.classList.add('default-text-cont');
  const defaultTextCont = document.querySelector('.default-text-cont');
  defaultTextCont.innerHTML = `
    <h2 class="title-default">Let's Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `;
};

document.addEventListener('DOMContentLoaded', loadHeroContent);
