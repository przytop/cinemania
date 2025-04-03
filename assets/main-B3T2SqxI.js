import{a as P,t as R,M as q,i as L}from"./vendor-CTT6gwRZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const A=document.querySelector(".theme-switcher"),T=document.documentElement;function V(){const t=T.getAttribute("data-theme")==="dark"?"light":"dark";T.setAttribute("data-theme",t),localStorage.setItem("theme",t),A.classList.toggle("active")}A.addEventListener("click",V);class I{constructor(){this.axios=P.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(e,o={}){try{return(await this.axios.get(e,{params:o})).data}catch(n){throw console.error(`Failed to fetch ${e}: ${n.message}`),n}}async getTrendingMovies(e){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${e}`)).results}async getTrendingMoviesTotal(e,o){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return await this._fetch(`/trending/movie/${e}`,{page:o})}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(e,o=1){return(await this._fetch("/search/movie",{query:e,page:o})).results}async searchMovieTotal(e,o=1,n=""){return await this._fetch("/search/movie",{query:e,page:o,primary_release_year:n})}async getMovieDetails(e){return await this._fetch(`/movie/${e}`)}async getMovieVideos(e){return(await this._fetch(`/movie/${e}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}window.addEventListener("scroll",R(function(){const t=document.getElementById("scrollUpBtn");window.scrollY>50?t.style.display="block":t.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class S{constructor(e){this.localStorageKey=e,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(e){console.error("Error saving data:",e)}}_refreshMovies(){this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}addMovie(e){this.movies.findIndex(n=>n.id===e.id)===-1?(this.movies.push(e),this._saveData()):console.log("Movie already added:",e)}removeMovie(e){const o=this.movies.findIndex(n=>n.id===e);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this._refreshMovies(),this.movies}}const K=new I,Q=new S("myLibrary"),D=document.querySelector(".my-library-background"),m=document.querySelector(".my-library-movie-list"),k=document.querySelector(".my-library-sorry"),_=document.querySelector(".genre-form"),M=document.querySelector("#genre"),l=document.getElementById("my-library-button-load"),X=document.getElementById("my-library-button-search"),v=document.getElementById("loader-library");let i=0,u="";const $=9,x=new Map,ee=async()=>{try{(await K.getMovieGenres()).forEach(e=>{e.id&&e.name&&x.set(e.id,e.name)})}catch(t){console.error("Error fetching genres:",t)}},te=async()=>{await ee(),x.forEach((t,e)=>{const o=document.createElement("option");o.value=e,o.textContent=t,M.appendChild(o)})},oe=t=>{const o=Math.floor(t/2),n=t%2>=1?1:0,s=5-o-n;return[...Array(o).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(n).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(s).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")},se=t=>{const e=document.createElement("li");e.classList.add("my-library-movie-list-item");const o=t.genres?t.genres.map(g=>g.name).slice(0,2).join(", "):t.genre_ids?t.genre_ids.map(g=>x.get(g)).slice(0,2).join(", "):"Unknown",n=t.id,s=t.release_date?new Date(t.release_date).getFullYear():"Unknown",a=Math.round(t.vote_average*10)/10,r=oe(a),W=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"poster-placeholder.jpg";return e.style.backgroundImage=`url(${W})`,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.dataset.id=n,e.innerHTML=`
      <div class="my-library-gradient"></div>
      <div class="my-library-movie">
        <h2>${t.title}</h2>
        <p>${o} | ${s} <span class="stars">${r}</span></p>
      </div>
    `,e.addEventListener("click",()=>{j(t.id)}),e},p=(t=!1)=>{if(D){v.style.display="block";const e=Q.getMovies()||[],o=u?e.filter(s=>s.genres?s.genres.some(a=>a.id===parseInt(u)):s.genre_ids?s.genre_ids.includes(parseInt(u)):!1):e;if(o.length===0){m.innerHTML="",v.style.display="none",k.style.display="block",e.length===0&&(_.style.display="none");return}o.length>0&&(k.style.display="none");const n=t?o.slice(0,i):o.slice(i,i+$);v.style.display="none",_.style.display="block",t&&(m.innerHTML=""),n.forEach(s=>{const a=se(s);m.appendChild(a)}),t||(i+=$),i>=o.length?l.style.display="none":l.style.display="block"}},y=async(t,e)=>{if(t)m.innerHTML="",k.style.display="none",l.style.display="none",i=0,p();else if(e){p(e);return}else p()};document.addEventListener("DOMContentLoaded",async()=>{D&&(M.addEventListener("change",()=>{u=M.value,y(!0,!1)}),l.addEventListener("click",()=>{l.style.display="none",y(!1,!1)}),X.addEventListener("click",()=>{window.location.href="./catalog.html"}),await te(),y(!0,!1))});const d=document.querySelector(".backdrop"),N=new I;function j(t){d.classList.remove("is-closed"),ne(t),document.body.style.overflow="hidden"}function b(){d.classList.add("is-closed"),d.innerHTML="",document.body.style.overflow="auto",y(!1,!0)}async function ne(t){try{const e=await N.getMovieDetails(t),o=e.genres.map(r=>r.name).join(" ");d.innerHTML=`
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
        <img class="modal-film-poster" src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"poster-placeholder.jpg"}"  alt="${e.title} poster"/>
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
    `,document.querySelector(".modal-btn-close").addEventListener("click",b),document.addEventListener("keydown",function(r){r.key==="Escape"&&b()}),d.addEventListener("click",function(r){r.target.closest(".modal-window")||b()}),document.querySelector(".watch-trailer-btn").addEventListener("click",re(e.id));const a=document.getElementById("library-actions-btn");E(e.id),a.addEventListener("click",()=>{ae(e),E(e.id)})}catch(e){console.error("Error fetching movie details:",e)}}function ae(t){const e=new S("myLibrary"),o=e.getMovies().some(n=>n.id===t.id);if(!t.id){console.error("Movie ID is undefined:",t);return}o?(e.removeMovie(t.id),L.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})):(e.addMovie(t),L.success({title:"Success ",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})),E(t.id)}function E(t){const o=new S("myLibrary").getMovies().some(s=>s.id===t),n=document.getElementById("library-actions-btn");o?n.textContent="Remove from my library":n.textContent="Add to my library"}const re=async t=>{const e=document.querySelector(".watch-trailer-btn");try{const n=(await N.getMovieVideos(t)).find(s=>s.type==="Trailer");n?(e.setAttribute("data-video-id",n.key),e.dataset.modalInitialized||new q(".watch-trailer-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",()=>{L.info({title:"Sorry",message:"No trailer available for this movie",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})})}catch(o){console.error("Failed to load movie videos:",o)}},ie=document.getElementById("our-team-btn"),h=document.querySelector(".team"),z=document.querySelector(".team-close-btn"),Y=document.querySelector("body");ie.addEventListener("click",ce);function ce(t){t.preventDefault(),h.classList.remove("is-closed"),document.body.classList.add("modal-open"),le()}function U(t){t.preventDefault(),t.code==="Escape"&&B()}function Z(t){t.target.closest(".team-window")||B()}function H(t){t.preventDefault(),B()}function le(){document.addEventListener("keydown",U),h.addEventListener("click",Z),z.addEventListener("click",H),Y.style.overflow="hidden"}function B(){document.removeEventListener("keydown",U),h.removeEventListener("click",Z),z.removeEventListener("click",H),h.classList.add("is-closed"),document.body.classList.remove("modal-open"),Y.style.overflow="auto"}const J=new I,de=t=>{const e=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${t.title}</h2>
    <div class="star-rating">
      ${me(t.vote_average)}
    </div>
    <p class="desc">${t.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn"}>Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;const n=`https://image.tmdb.org/t/p/original${t.backdrop_path}`;e.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${n})`,e.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",ue(t.id)),document.querySelector(".details-btn").addEventListener("click",()=>j(t.id))},me=t=>{const e=Math.round(t*10)/10,o=5,n=Math.floor(e/2),s=e%2>=1?1:0,a=o-n-s;return`<span>${[...Array(n).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(s).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(a).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}</span>`},ue=async t=>{const e=document.querySelector(".watch-btn");try{const n=(await J.getMovieVideos(t)).find(s=>s.type==="Trailer");n?(e.setAttribute("data-video-id",n.key),e.dataset.modalInitialized||new q(".watch-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",C)}catch(o){console.error("Failed to load movie videos:",o),e.addEventListener("click",C)}};let w=!1;const C=()=>{if(w)return;w=!0;const t=document.getElementById("hero-section"),e=document.createElement("div");e.className="modal-oopsie fade-in",e.id="modal-cont",t.appendChild(e);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn't find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",()=>{w=!1,e.classList.remove("fade-in"),e.classList.add("fade-out"),setTimeout(()=>{e.remove()},300)})},ye=async()=>{try{const t=await J.getTrendingMovies("day");if(t.length>0){const e=t[Math.floor(Math.random()*t.length)];de(e)}else O()}catch(t){console.error("Failed to load trending movies:",t),O()}},O=()=>{const t=document.getElementById("hero-section"),e=document.getElementById("text-cont");t.classList.add("hero-default"),e.classList.remove("hero-text-cont"),e.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let's Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",ye);const he=document.querySelectorAll(".header-nav-list"),fe=document.querySelectorAll(".mobile-nav-list"),F=window.location.href;he.forEach(t=>{t.href===F?t.classList.add("active"):t.classList.remove("active")});fe.forEach(t=>{t.href===F?t.classList.add("active"):t.classList.remove("active")});const G=document.getElementById("menu-btn"),f=document.getElementById("mobile-menu-modal"),c=document.getElementById("mobile-menu-backdrop");G.addEventListener("click",function(){f.classList.add("open"),c.style.display="block"});c.addEventListener("click",function(t){t.target===c&&(f.classList.remove("open"),c.style.display="none")});document.addEventListener("click",function(t){!f.contains(t.target)&&t.target!==G&&(f.classList.remove("open"),c.style.display="none")});export{S as L,I as T,j as o};
//# sourceMappingURL=main-B3T2SqxI.js.map
