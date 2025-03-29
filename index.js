import{T as M,o as U,L as x}from"./assets/main-Cz0Hiq6T.js";import{i as m}from"./assets/vendor-CN01XXcz.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new M,n=document.getElementById("loader-weekly"),s={"Science Fiction":"Sci-Fi"},a=document.querySelector(".backdrop");function c(){a.classList.remove("is-visible"),a.classList.add("is-closed")}a.addEventListener("click",r=>{r.target===a&&c()});try{const r=await t.getTrendingMovies("week");async function d(){const g=window.innerWidth;let p=2;g<=600&&(p=1),e.innerHTML="";for(const o of r.slice(0,3)){const i=document.createElement("div");i.classList.add("card");const E=o.id,$=`https://image.tmdb.org/t/p/w500${o.poster_path}`,I=o.title,S=o.release_date?new Date(o.release_date).getFullYear():"Unknown",u=Math.round(o.vote_average*10)/10,A=await t.getMovieGenres(),B=o.genre_ids.slice(0,p).map(T=>{const f=A.find(F=>F.id===T),b=f?f.name:"Unknown";return s[b]||b}).join(", "),C=5,v=Math.floor(u/2),y=u%2>=1?1:0,_=C-v-y,D=[...Array(v).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(y).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(_).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${$})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.dataset.id=E,i.innerHTML=`
          <div class="card-content">
            <h2>${I}</h2>
            <p>${B} | ${S} <span class="stars">${D}</span></p>
          </div>
        `,n.style.display="none",e.appendChild(i)}document.querySelectorAll(".card").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-id");if(!i){console.error("Movie ID is undefined");return}U(i)})})}d(),window.addEventListener("resize",d)}catch(r){console.error("Error fetching data:",r)}});const w=new M,l=new x("myLibrary");async function O(){const e=document.getElementById("loader-upcoming");try{const t=await w.getUpcomingMovies(),n=new Date,s=t.filter(a=>{const c=new Date(a.release_date);return c.getFullYear()===n.getFullYear()&&c.getMonth()===n.getMonth()});if(s.length===0)e.style.display="none",h("No upcoming movies this month.");else{const a=s[Math.floor(Math.random()*s.length)];e.style.display="none",z(a)}}catch(t){console.error("Failed to fetch upcoming movies:",t),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){m.info({title:"Info",message:e})}function z(e){const t=document.getElementById("movie-container"),n=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),a=e.genre_ids.map(g=>L[g]).join(", "),c=e.popularity.toFixed(1),r=`
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
            <p class="detail-item">Popularity:<span class="popularity-value">${c}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${a}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=r,document.getElementById("library-btn").addEventListener("click",()=>G(e)),k(e.id)}function G(e){const t=e.id;l.getMovies().some(s=>s.id===t)?(l.removeMovie(t),m.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})):(l.addMovie(e),m.success({title:"Success",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})),k(t)}function k(e){const t=l.getMovies().some(s=>s.id===e),n=document.getElementById("library-btn");t?n.textContent="Remove from my library":n.textContent="Add to my library"}const L={};w.getMovieGenres().then(e=>{e.forEach(t=>{L[t.id]=t.name}),O()});
//# sourceMappingURL=index.js.map
