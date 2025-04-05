# Cinemania

**Cinemania** is a modern, responsive movie website built using **Vite** and
powered by data from the
**[TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)**.
The site allows users to browse a collection of movies, search for specific
titles, view trailers, and manage their own personal movie library with ease.

## Features

- **Popular & Upcoming Movies**: The homepage displays the most popular movies
  and upcoming releases fetched from
  **[TMDB](https://developer.themoviedb.org/reference/intro/getting-started)**.
- **Movie Catalog**: A catalog page allows users to search for movies by title
  and filter them by release year. Weekly trending movies (up to 100) are
  displayed first.
- **Pagination**: The catalog includes pagination to navigate through multiple
  pages of search results or trending films.
- **Movie Modal**: Clicking on a movie opens a modal with more detailed
  information, including genre, overview, popularity, and trailer. You can also
  add/remove the movie from your personal library directly from the modal.
- **Personal Library**: Users can manage their own movie library — adding or
  removing movies in real time. The library dynamically reflects changes and is
  saved using `localStorage`.
- **Themes (Dark/Light Mode)**  
  A toggle switch allows users to change between light and dark themes providing
  a more personalized experience.
- **Loader**: A loading spinner is displayed during asynchronous operations such
  as fetching movies or searching.
- **Back to Top Button**: A smoooth **Back to Top** button improves navigation.
  It uses `lodash.throttle` for better performance.

## Technologies Used

- **HTML**: Markup for structuring the content
- **CSS**: Styling and layout design
- **JavaScript**: Dynamic content and interactivity
- **[Vite](https://vite.dev/)**: Build tool for fast development and optimized
  production builds
- **[Axios](https://www.npmjs.com/package/axios)**: Handles API requests to TMDB
- **[izitoast](https://www.npmjs.com/package/izitoast)**: Toast notifications
  for library actions and errors
- **[lodash.throttle](https://www.npmjs.com/package/lodash.throttle)**:
  Optimized scroll event handling
- **[modal-video](https://www.npmjs.com/package/modal-video)**: Lightbox modal
  for playing movie trailers

## Screenshots

## Live Demo

[View Cinemania on GitHub Pages](https://przytop.github.io/cinemania/)

Enjoy the show! 🍿
