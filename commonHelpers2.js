import{T as h,o as F,L as x}from"./assets/main-JW8NL_KF.js";import{i as g}from"./assets/vendor-CN01XXcz.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new h,n={"Science Fiction":"Sci-Fi"},s=document.querySelector(".backdrop");function r(){s.classList.remove("is-visible"),s.classList.add("is-closed")}s.addEventListener("click",o=>{o.target===s&&r()});try{const o=await t.getTrendingMovies("week");async function c(){const m=window.innerWidth;let l=2;m<=600&&(l=1),e.innerHTML="";for(const a of o.slice(0,3)){const i=document.createElement("div");i.classList.add("card");const k=a.id,$=`https://image.tmdb.org/t/p/w500${a.poster_path}`,E=a.title,S=a.release_date?new Date(a.release_date).getFullYear():"Unknown",p=Math.round(a.vote_average*10)/10,I=await t.getMovieGenres(),A=a.genre_ids.slice(0,l).map(B=>{const y=I.find(T=>T.id===B),f=y?y.name:"Unknown";return n[f]||f}).join(", "),C=5,u=Math.floor(p/2),v=p%2>=1?1:0,_=C-u-v,D=[...Array(u).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(v).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(_).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${$})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.dataset.id=k,i.innerHTML=`
          <div class="card-content">
            <h2>${E}</h2>
            <p>${A} | ${S} <span class="stars">${D}</span></p>
          </div>
        `,e.appendChild(i)}document.querySelectorAll(".card").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-id");if(!i){console.error("Movie ID is undefined");return}F(i)})})}c(),window.addEventListener("resize",c)}catch(o){console.error("Error fetching data:",o)}});const M=new h,d=new x("myLibrary");async function U(){try{const e=await M.getUpcomingMovies(),t=new Date,n=e.filter(s=>{const r=new Date(s.release_date);return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()});if(n.length===0)b("No upcoming movies this month.");else{const s=n[Math.floor(Math.random()*n.length)];O(s)}}catch(e){console.error("Failed to fetch upcoming movies:",e),b("Failed to fetch upcoming movies. Please try again later")}}function b(e){g.info({title:"Info",message:e})}function O(e){const t=document.getElementById("movie-container"),n=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),r=e.genre_ids.map(l=>L[l]).join(", "),o=e.popularity.toFixed(1),c=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${n}" alt="${e.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${e.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${s}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${e.vote_average} / ${e.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${o}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${r}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=c,document.getElementById("library-btn").addEventListener("click",()=>z(e)),w(e.id)}function z(e){const t=e.id;d.getMovies().some(s=>s.id===t)?(d.removeMovie(t),g.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})):(d.addMovie(e),g.success({title:"Success",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})),w(t)}function w(e){const t=d.getMovies().some(s=>s.id===e),n=document.getElementById("library-btn");t?n.textContent="Remove from my library":n.textContent="Add to my library"}const L={};M.getMovieGenres().then(e=>{e.forEach(t=>{L[t.id]=t.name}),U()});
//# sourceMappingURL=commonHelpers2.js.map
