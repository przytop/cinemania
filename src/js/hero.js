import TmdbApi from "./tmdb-api";

const tmdb = new TmdbApi();
const test = async () => {
  try {
    console.log(await tmdb.getTrendingMovies('day'));
    console.log(await tmdb.getTrendingMovies('week'));
    console.log(await tmdb.getUpcomingMovies());
    console.log(await tmdb.searchMovie('Dune'));
    console.log(await tmdb.getMovieDetails(438631, 'title'));
    console.log(await tmdb.getMovieVideos(438631));
    console.log(await tmdb.getMovieGenres());
    console.log(await tmdb.getCountriesList());
  } catch (error) {
    console.error('Test failed:', error);
  }
};

test();

const displayMovieInfo = (movie) => {
  const hero = document.getElementById("hero-section");
  const heroTextCont = document.querySelector('.hero-text-cont');
  heroTextCont.innerHTML = `
    <h2 class="title">${movie.title}</h2>
    <div class="star-rating">
      ${getStarRatingHTML(movie.vote_average)}
    </div>
    <p class="desc">${movie.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" onclick="watchTrailer(${movie.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${movie.id})">More details</button>
    </div>
  `;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  
  hero.style.backgroundImage = `linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 65%), url(${imageUrl})`, innerWidth;
  hero.style.backgroundPosition = "center"

};

const getStarRatingHTML = (voteAverage) => {
  const stars = Math.round(voteAverage / 2);
  let starHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starHTML += '<img src="./img/star.svg" alt="star">';
    } else {
      starHTML += '<img src="./img/star-outline.svg" alt="star-outline">';
    }
  }
  return starHTML;
};

const watchTrailer = async (movieId) => {
  const videos = await tmdb.getMovieVideos(movieId);
  const trailer = videos.results.find(video => video.type === 'Trailer');
  if (trailer) {
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
  } else {
    alert('Trailer not available');
  }
};

const showDetails = (movieId) => {
  window.location.href = `/details.html?movieId=${movieId}`;
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
  const hero = document.getElementById("hero-section");
  const textCont = document.getElementById("text-cont");
  hero.classList.add("hero-default");
  textCont.classList.remove("hero-text-cont");
  textCont.classList.add("default-text-cont");
  const defaultTextCont = document.querySelector('.default-text-cont');
  defaultTextCont.innerHTML = `
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `;
};

document.addEventListener('DOMContentLoaded', loadHeroContent);