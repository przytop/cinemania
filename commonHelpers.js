import{T as q,o as T}from"./assets/main-2e368aae.js";import"./assets/vendor-aedd9b60.js";document.addEventListener("DOMContentLoaded",async function(){const c=document.querySelector(".catalog-movie-list"),i=new q,f={"Science Fiction":"Sci-Fi"},a=document.querySelector(".backdrop");function p(){a.classList.remove("is-visible"),a.classList.add("is-closed")}a.addEventListener("click",n=>{n.target===a&&p()});try{let d=function(){const h=window.innerWidth;let l=2;h<=600&&(l=1),c.innerHTML="",n.slice(0,9).forEach(async e=>{const t=document.createElement("div");t.classList.add("card");const v=e.id,y=`https://image.tmdb.org/t/p/w500${e.poster_path}`,S=e.title,L=e.release_date?new Date(e.release_date).getFullYear():"Unknown",u=Math.round(e.vote_average*10)/10,b=await i.getMovieGenres(),k=e.genre_ids.slice(0,l).map(o=>{const r=b.find(A=>A.id===o),s=r?r.name:"Unknown";return f[s]||s}).join(", "),w=5,g=Math.floor(u/2),m=u%2>=1?1:0,M=w-g-m,E=[...Array(g).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(m).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(M).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");t.style.backgroundImage=`url(${y})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.dataset.id=v,t.innerHTML=`
        <div class="card-content">
          <h2>${S}</h2>
          <p>${k} | ${L} <span class="stars">${E}</span></p>
        </div>
      `,document.querySelectorAll(".card").forEach(o=>{o.addEventListener("click",r=>{const s=r.target.getAttribute("data-id");s&&T(s)})}),c.appendChild(t)})};const n=await i.getTrendingMovies("day");d(),window.addEventListener("resize",d)}catch(n){console.error("Error fetching data:",n)}});document.addEventListener("DOMContentLoaded",function(){document.querySelector(".input-text"),document.querySelector(".catalog-sorry-message"),document.querySelectorAll(".catalog-movie-list-item")});
//# sourceMappingURL=commonHelpers.js.map
