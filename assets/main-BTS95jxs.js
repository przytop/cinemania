import{a as $,t as _,M as L,i as h}from"./vendor-CTT6gwRZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const k=document.querySelector(".theme-switcher"),p=document.documentElement;function A(){const t=p.getAttribute("data-theme")==="dark"?"light":"dark";p.setAttribute("data-theme",t),localStorage.setItem("theme",t),k.classList.toggle("active")}k.addEventListener("click",A);class v{constructor(){this.axios=$.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(e,o={}){try{return(await this.axios.get(e,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${e}: ${s.message}`),s}}async getTrendingMovies(e){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${e}`)).results}async getTrendingMoviesTotal(e,o){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return await this._fetch(`/trending/movie/${e}`,{page:o})}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(e,o=1){return(await this._fetch("/search/movie",{query:e,page:o})).results}async searchMovieTotal(e,o=1){return await this._fetch("/search/movie",{query:e,page:o})}async getMovieDetails(e){return await this._fetch(`/movie/${e}`)}async getMovieVideos(e){return(await this._fetch(`/movie/${e}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new v;window.addEventListener("scroll",_(function(){const t=document.getElementById("scrollUpBtn");window.scrollY>50?t.style.display="block":t.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class y{constructor(e){this.localStorageKey=e,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(e){console.error("Error saving data:",e)}}addMovie(e){this.movies.findIndex(s=>s.id===e.id)===-1?(this.movies.push(e),this._saveData()):console.log("Movie already added:",e)}removeMovie(e){const o=this.movies.findIndex(s=>s.id===e);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new y("local-movies");const c=document.querySelector(".backdrop"),M=new v;function N(t){c.classList.remove("is-closed"),q(t),document.body.style.overflow="hidden"}function m(){c.classList.add("is-closed"),c.innerHTML="",document.body.style.overflow="auto"}async function q(t){try{const e=await M.getMovieDetails(t),o=e.genres.map(i=>i.name).join(" ");c.innerHTML=`
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
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${e.title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${e.vote_average.toFixed(1)}</span>
                <span class="modal-window-accent-votes">${e.vote_count}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${e.popularity.toFixed(1)}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${o}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${e.overview}</p>
          <div class="modal-film-btns">
            <button class="watch-trailer-btn"}>Watch trailer</button> 
            <button id="library-actions-btn" type="submit"></button>
          </div>
        </div>
      </div>
    `,document.querySelector(".modal-btn-close").addEventListener("click",m),document.addEventListener("keydown",function(i){i.key==="Escape"&&m()}),c.addEventListener("click",function(i){i.target.closest(".modal-window")||m()}),document.querySelector(".watch-trailer-btn").addEventListener("click",z(e.id));const a=document.getElementById("library-actions-btn");f(e.id),a.addEventListener("click",()=>{D(e),f(e.id)})}catch(e){console.error("Error fetching movie details:",e)}}function D(t){const e=new y("myLibrary"),o=e.getMovies().some(s=>s.id===t.id);if(!t.id){console.error("Movie ID is undefined:",t);return}o?(e.removeMovie(t.id),h.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})):(e.addMovie(t),h.success({title:"Success ",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})),f(t.id)}function f(t){const o=new y("myLibrary").getMovies().some(n=>n.id===t),s=document.getElementById("library-actions-btn");o?s.textContent="Remove from my library":s.textContent="Add to my library"}const z=async t=>{const e=document.querySelector(".watch-trailer-btn");try{const s=(await M.getMovieVideos(t)).find(n=>n.type==="Trailer");s?(e.setAttribute("data-video-id",s.key),e.dataset.modalInitialized||new L(".watch-trailer-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",()=>{h.info({title:"Sorry",message:"No trailer available for this movie",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})})}catch(o){console.error("Failed to load movie videos:",o)}},Y=document.getElementById("our-team-btn"),l=document.querySelector(".team"),E=document.querySelector(".team-close-btn"),I=document.querySelector("body");Y.addEventListener("click",j);function j(t){t.preventDefault(),l.classList.remove("is-closed"),document.body.classList.add("modal-open"),Z()}function B(t){t.preventDefault(),t.code==="Escape"&&g()}function S(t){t.target.closest(".team-window")||g()}function x(t){t.preventDefault(),g()}function Z(){document.addEventListener("keydown",B),l.addEventListener("click",S),E.addEventListener("click",x),I.style.overflow="hidden"}function g(){document.removeEventListener("keydown",B),l.removeEventListener("click",S),E.removeEventListener("click",x),l.classList.add("is-closed"),document.body.classList.remove("modal-open"),I.style.overflow="auto"}const T=new v,J=t=>{const e=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${t.title}</h2>
    <div class="star-rating">
      ${U(t.vote_average)}
    </div>
    <p class="desc">${t.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn"}>Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/original${t.backdrop_path}`;e.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${s})`,e.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",W(t.id)),document.querySelector(".details-btn").addEventListener("click",()=>N(t.id))},U=t=>{const e=Math.round(t*10)/10,o=5,s=Math.floor(e/2),n=e%2>=1?1:0,a=o-s-n;return`<span>${[...Array(s).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(n).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(a).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}</span>`},W=async t=>{const e=document.querySelector(".watch-btn");try{const s=(await T.getMovieVideos(t)).find(n=>n.type==="Trailer");s?(e.setAttribute("data-video-id",s.key),e.dataset.modalInitialized||new L(".watch-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",b)}catch(o){console.error("Failed to load movie videos:",o),e.addEventListener("click",b)}};let u=!1;const b=()=>{if(u)return;u=!0;const t=document.getElementById("hero-section"),e=document.createElement("div");e.className="modal-oopsie fade-in",e.id="modal-cont",t.appendChild(e);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn't find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",()=>{u=!1,e.classList.remove("fade-in"),e.classList.add("fade-out"),setTimeout(()=>{e.remove()},300)})},F=async()=>{try{const t=await T.getTrendingMovies("day");if(t.length>0){const e=t[Math.floor(Math.random()*t.length)];J(e)}else w()}catch(t){console.error("Failed to load trending movies:",t),w()}},w=()=>{const t=document.getElementById("hero-section"),e=document.getElementById("text-cont");t.classList.add("hero-default"),e.classList.remove("hero-text-cont"),e.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let's Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",F);const G=document.querySelectorAll(".header-nav-list"),H=document.querySelectorAll(".mobile-nav-list"),O=window.location.href;G.forEach(t=>{t.href===O?t.classList.add("active"):t.classList.remove("active")});H.forEach(t=>{t.href===O?t.classList.add("active"):t.classList.remove("active")});const C=document.getElementById("menu-btn"),d=document.getElementById("mobile-menu-modal"),r=document.getElementById("mobile-menu-backdrop");C.addEventListener("click",function(){d.classList.add("open"),r.style.display="block"});r.addEventListener("click",function(t){t.target===r&&(d.classList.remove("open"),r.style.display="none")});document.addEventListener("click",function(t){!d.contains(t.target)&&t.target!==C&&(d.classList.remove("open"),r.style.display="none")});export{y as L,v as T,N as o};
//# sourceMappingURL=main-BTS95jxs.js.map
