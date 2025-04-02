import{a as P,t as R,M as $,i as L}from"./vendor-CTT6gwRZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const C=document.querySelector(".theme-switcher"),S=document.documentElement;function V(){const t=S.getAttribute("data-theme")==="dark"?"light":"dark";S.setAttribute("data-theme",t),localStorage.setItem("theme",t),C.classList.toggle("active")}C.addEventListener("click",V);class h{constructor(){this.axios=P.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(e,o={}){try{return(await this.axios.get(e,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${e}: ${s.message}`),s}}async getTrendingMovies(e){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${e}`)).results}async getTrendingMoviesTotal(e,o){if(!["day","week"].includes(e))throw new Error("Invalid time_window. Must be 'day' or 'week'");return await this._fetch(`/trending/movie/${e}`,{page:o})}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(e,o=1){return(await this._fetch("/search/movie",{query:e,page:o})).results}async searchMovieTotal(e,o=1,s=""){return await this._fetch("/search/movie",{query:e,page:o,primary_release_year:s})}async getMovieDetails(e){return await this._fetch(`/movie/${e}`)}async getMovieVideos(e){return(await this._fetch(`/movie/${e}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new h;window.addEventListener("scroll",R(function(){const t=document.getElementById("scrollUpBtn");window.scrollY>50?t.style.display="block":t.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class v{constructor(e){this.localStorageKey=e,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(e){console.error("Error saving data:",e)}}_refreshMovies(){this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}addMovie(e){this.movies.findIndex(s=>s.id===e.id)===-1?(this.movies.push(e),this._saveData()):console.log("Movie already added:",e)}removeMovie(e){const o=this.movies.findIndex(s=>s.id===e);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this._refreshMovies(),this.movies}}new v("local-movies");const K=new h,Q=new v("myLibrary"),O=document.querySelector(".my-library-background"),m=document.querySelector(".my-library-movie-list"),q=document.querySelector(".my-library-sorry"),x=document.querySelector(".genre-form"),k=document.querySelector("#genre"),l=document.getElementById("my-library-button-load"),X=document.getElementById("my-library-button-search"),g=document.getElementById("loader-library");let i=0,M="";const B=9,A=new Map,ee=async()=>{try{(await K.getMovieGenres()).forEach(e=>{e.id&&e.name&&A.set(e.id,e.name)})}catch(t){console.error("Error fetching genres:",t)}},te=async()=>{await ee(),A.forEach((t,e)=>{const o=document.createElement("option");o.value=e,o.textContent=t,k.appendChild(o)})},oe=t=>{const o=Math.floor(t/2),s=t%2>=1?1:0,n=5-o-s;return[...Array(o).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(s).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(n).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")},se=t=>{const e=document.createElement("li");e.classList.add("my-library-movie-list-item");const o=t.genres.map(W=>W.name).slice(0,2).join(", ")||"Unknown",s=t.id,n=t.release_date?new Date(t.release_date).getFullYear():"Unknown",a=Math.round(t.vote_average*10)/10,r=oe(a),G=`https://image.tmdb.org/t/p/w500${t.poster_path}`;return e.style.backgroundImage=`url(${G})`,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.dataset.id=s,e.innerHTML=`
      <div class="my-library-gradient"></div>
      <div class="my-library-movie">
        <h2>${t.title}</h2>
        <p>${o} | ${n} <span class="stars">${r}</span></p>
      </div>
    `,e.addEventListener("click",()=>{N(t.id)}),e},p=(t=!1)=>{if(O){g.style.display="block";const e=Q.getMovies()||[],o=M?e.filter(n=>n.genres.some(a=>a.id===parseInt(M))):e;if(o.length===0){m.innerHTML="",g.style.display="none",q.style.display="block",e.length===0&&(x.style.display="none");return}const s=t?o.slice(0,i):o.slice(i,i+B);g.style.display="none",x.style.display="block",t&&(m.innerHTML=""),s.forEach(n=>{const a=se(n);m.appendChild(a)}),t||(i+=B),i>=o.length?l.style.display="none":l.style.display="block"}},u=async(t,e)=>{if(t)m.innerHTML="",q.style.display="none",l.style.display="none",i=0,p();else if(e){p(e);return}else p()};document.addEventListener("DOMContentLoaded",async()=>{O&&(k.addEventListener("change",()=>{M=k.value,u(!0,!1)}),l.addEventListener("click",()=>{l.style.display="none",u(!1,!1)}),X.addEventListener("click",()=>{window.location.href="./catalog.html"}),te(),u(!0,!1))});const d=document.querySelector(".backdrop"),D=new h;function N(t){d.classList.remove("is-closed"),ne(t),document.body.style.overflow="hidden"}function b(){d.classList.add("is-closed"),d.innerHTML="",document.body.style.overflow="auto",u(!1,!0)}async function ne(t){try{const e=await D.getMovieDetails(t),o=e.genres.map(r=>r.name).join(" ");d.innerHTML=`
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
    `,document.querySelector(".modal-btn-close").addEventListener("click",b),document.addEventListener("keydown",function(r){r.key==="Escape"&&b()}),d.addEventListener("click",function(r){r.target.closest(".modal-window")||b()}),document.querySelector(".watch-trailer-btn").addEventListener("click",re(e.id));const a=document.getElementById("library-actions-btn");E(e.id),a.addEventListener("click",()=>{ae(e),E(e.id)})}catch(e){console.error("Error fetching movie details:",e)}}function ae(t){const e=new v("myLibrary"),o=e.getMovies().some(s=>s.id===t.id);if(!t.id){console.error("Movie ID is undefined:",t);return}o?(e.removeMovie(t.id),L.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})):(e.addMovie(t),L.success({title:"Success ",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})),E(t.id)}function E(t){const o=new v("myLibrary").getMovies().some(n=>n.id===t),s=document.getElementById("library-actions-btn");o?s.textContent="Remove from my library":s.textContent="Add to my library"}const re=async t=>{const e=document.querySelector(".watch-trailer-btn");try{const s=(await D.getMovieVideos(t)).find(n=>n.type==="Trailer");s?(e.setAttribute("data-video-id",s.key),e.dataset.modalInitialized||new $(".watch-trailer-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",()=>{L.info({title:"Sorry",message:"No trailer available for this movie",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})})}catch(o){console.error("Failed to load movie videos:",o)}},ie=document.getElementById("our-team-btn"),y=document.querySelector(".team"),z=document.querySelector(".team-close-btn"),Y=document.querySelector("body");ie.addEventListener("click",ce);function ce(t){t.preventDefault(),y.classList.remove("is-closed"),document.body.classList.add("modal-open"),le()}function j(t){t.preventDefault(),t.code==="Escape"&&I()}function U(t){t.target.closest(".team-window")||I()}function Z(t){t.preventDefault(),I()}function le(){document.addEventListener("keydown",j),y.addEventListener("click",U),z.addEventListener("click",Z),Y.style.overflow="hidden"}function I(){document.removeEventListener("keydown",j),y.removeEventListener("click",U),z.removeEventListener("click",Z),y.classList.add("is-closed"),document.body.classList.remove("modal-open"),Y.style.overflow="auto"}const H=new h,de=t=>{const e=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${t.title}</h2>
    <div class="star-rating">
      ${me(t.vote_average)}
    </div>
    <p class="desc">${t.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn"}>Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/original${t.backdrop_path}`;e.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${s})`,e.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",ue(t.id)),document.querySelector(".details-btn").addEventListener("click",()=>N(t.id))},me=t=>{const e=Math.round(t*10)/10,o=5,s=Math.floor(e/2),n=e%2>=1?1:0,a=o-s-n;return`<span>${[...Array(s).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(n).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(a).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}</span>`},ue=async t=>{const e=document.querySelector(".watch-btn");try{const s=(await H.getMovieVideos(t)).find(n=>n.type==="Trailer");s?(e.setAttribute("data-video-id",s.key),e.dataset.modalInitialized||new $(".watch-btn",{youtube:{autoplay:1,rel:0,iv_load_policy:3}})):e.addEventListener("click",T)}catch(o){console.error("Failed to load movie videos:",o),e.addEventListener("click",T)}};let w=!1;const T=()=>{if(w)return;w=!0;const t=document.getElementById("hero-section"),e=document.createElement("div");e.className="modal-oopsie fade-in",e.id="modal-cont",t.appendChild(e);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn't find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",()=>{w=!1,e.classList.remove("fade-in"),e.classList.add("fade-out"),setTimeout(()=>{e.remove()},300)})},ye=async()=>{try{const t=await H.getTrendingMovies("day");if(t.length>0){const e=t[Math.floor(Math.random()*t.length)];de(e)}else _()}catch(t){console.error("Failed to load trending movies:",t),_()}},_=()=>{const t=document.getElementById("hero-section"),e=document.getElementById("text-cont");t.classList.add("hero-default"),e.classList.remove("hero-text-cont"),e.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let's Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",ye);const fe=document.querySelectorAll(".header-nav-list"),he=document.querySelectorAll(".mobile-nav-list"),J=window.location.href;fe.forEach(t=>{t.href===J?t.classList.add("active"):t.classList.remove("active")});he.forEach(t=>{t.href===J?t.classList.add("active"):t.classList.remove("active")});const F=document.getElementById("menu-btn"),f=document.getElementById("mobile-menu-modal"),c=document.getElementById("mobile-menu-backdrop");F.addEventListener("click",function(){f.classList.add("open"),c.style.display="block"});c.addEventListener("click",function(t){t.target===c&&(f.classList.remove("open"),c.style.display="none")});document.addEventListener("click",function(t){!f.contains(t.target)&&t.target!==F&&(f.classList.remove("open"),c.style.display="none")});export{v as L,h as T,N as o};
//# sourceMappingURL=main-DAoONcfQ.js.map
