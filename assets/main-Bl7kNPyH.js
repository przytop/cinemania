import{a as O,t as C,i as g,M as $}from"./vendor-CN01XXcz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const L=document.querySelector(".theme-switcher"),p=document.documentElement;function _(){const e=p.getAttribute("data-theme")==="dark"?"light":"dark";p.setAttribute("data-theme",e),localStorage.setItem("theme",e),L.classList.toggle("active")}L.addEventListener("click",_);class h{constructor(){this.axios=O.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,o={}){try{return(await this.axios.get(t,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${t}: ${s.message}`),s}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getTrendingMoviesTotal(t,o){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return await this._fetch(`/trending/movie/${t}`,{page:o})}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,o=1){return(await this._fetch("/search/movie",{query:t,page:o})).results}async searchMovieTotal(t,o=1){return await this._fetch("/search/movie",{query:t,page:o})}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new h;window.addEventListener("scroll",C(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class v{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(s=>s.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const o=this.movies.findIndex(s=>s.id===t);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new v("local-movies");const c=document.querySelector(".backdrop");function A(e){c.classList.remove("is-closed"),D(e),document.body.style.overflow="hidden"}function m(){c.classList.add("is-closed"),c.innerHTML="",document.body.style.overflow="auto"}async function D(e){const t=new h;try{const o=await t.getMovieDetails(e),s=o.genres.map(i=>i.name).join(" ");c.innerHTML=`
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
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${o.title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${o.vote_average.toFixed(1)}</span>
                <span class="modal-window-accent-votes">${o.vote_count}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${o.popularity.toFixed(1)}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${s}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${o.overview}</p>
          <button id="library-actions-btn" type="submit"></button>
        </div>
      </div>
    `,document.querySelector(".modal-btn-close").addEventListener("click",m),document.addEventListener("keydown",function(i){i.key==="Escape"&&m()}),c.addEventListener("click",function(i){i.target.closest(".modal-window")||m()});const a=document.getElementById("library-actions-btn");f(o.id),a.addEventListener("click",()=>{N(o),f(o.id)})}catch(o){console.error("Error fetching movie details:",o)}}function N(e){const t=new v("myLibrary"),o=t.getMovies().some(s=>s.id===e.id);if(!e.id){console.error("Movie ID is undefined:",e);return}o?(t.removeMovie(e.id),g.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})):(t.addMovie(e),g.success({title:"Success ",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})),f(e.id)}function f(e){const o=new v("myLibrary").getMovies().some(n=>n.id===e),s=document.getElementById("library-actions-btn");o?s.textContent="Remove from my library":s.textContent="Add to my library"}const q=document.getElementById("our-team-btn"),l=document.querySelector(".team"),k=document.querySelector(".team-close-btn"),M=document.querySelector("body");q.addEventListener("click",Y);function Y(e){e.preventDefault(),l.classList.remove("is-closed"),document.body.classList.add("modal-open"),j()}function E(e){e.preventDefault(),e.code==="Escape"&&y()}function I(e){e.target.closest(".team-window")||y()}function x(e){e.preventDefault(),y()}function j(){document.addEventListener("keydown",E),l.addEventListener("click",I),k.addEventListener("click",x),M.style.overflow="hidden"}function y(){document.removeEventListener("keydown",E),l.removeEventListener("click",I),k.removeEventListener("click",x),l.classList.add("is-closed"),document.body.classList.remove("modal-open"),M.style.overflow="auto"}const B=new h,Z=e=>{const t=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${z(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" data-movie-id=${e.id}>Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/original${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${s})`,t.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",J(e.id)),document.querySelector(".details-btn").addEventListener("click",()=>A(e.id))},z=e=>{const t=Math.round(e*10)/10,o=5,s=Math.floor(t/2),n=t%2>=1?1:0,a=o-s-n;return`<span>${[...Array(s).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(n).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(a).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}</span>`},J=async e=>{const t=document.querySelector(".watch-btn");try{const s=(await B.getMovieVideos(e)).find(n=>n.type==="Trailer");s?(t.setAttribute("data-video-id",s.key),t.click(),t.dataset.modalInitialized||new $(".watch-btn")):t.addEventListener("click",b)}catch(o){console.error("Failed to load movie videos:",o),t.addEventListener("click",b)}};let u=!1;const b=()=>{if(u)return;u=!0;const e=document.getElementById("hero-section"),t=document.createElement("div");t.className="modal-oopsie fade-in",t.id="modal-cont",e.appendChild(t);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn't find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",()=>{u=!1,t.classList.remove("fade-in"),t.classList.add("fade-out"),setTimeout(()=>{t.remove()},300)})},U=async()=>{try{const e=await B.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];Z(t)}else w()}catch(e){console.error("Failed to load trending movies:",e),w()}},w=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let's Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",U);const W=document.querySelectorAll(".header-nav-list"),F=document.querySelectorAll(".mobile-nav-list"),S=window.location.href;W.forEach(e=>{e.href===S?e.classList.add("active"):e.classList.remove("active")});F.forEach(e=>{e.href===S?e.classList.add("active"):e.classList.remove("active")});const T=document.getElementById("menu-btn"),d=document.getElementById("mobile-menu-modal"),r=document.getElementById("mobile-menu-backdrop");T.addEventListener("click",function(){d.classList.add("open"),r.style.display="block"});r.addEventListener("click",function(e){e.target===r&&(d.classList.remove("open"),r.style.display="none")});document.addEventListener("click",function(e){!d.contains(e.target)&&e.target!==T&&(d.classList.remove("open"),r.style.display="none")});export{v as L,h as T,A as o};
//# sourceMappingURL=main-Bl7kNPyH.js.map
