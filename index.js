import{T as M,o as U,L as x}from"./assets/main-B3T2SqxI.js";import{i as m}from"./assets/vendor-CTT6gwRZ.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new M,a=document.getElementById("loader-weekly"),s={"Science Fiction":"Sci-Fi"},o=document.querySelector(".backdrop");function c(){o.classList.remove("is-visible"),o.classList.add("is-closed")}o.addEventListener("click",r=>{r.target===o&&c()});try{const r=await t.getTrendingMovies("week");async function d(){const g=window.innerWidth;let p=2;g<=600&&(p=1),e.innerHTML="";for(const n of r.slice(0,3)){const i=document.createElement("div");i.classList.add("card");const E=n.id,$=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"poster-placeholder.jpg",I=n.title,S=n.release_date?new Date(n.release_date).getFullYear():"Unknown",u=Math.round(n.vote_average*10)/10,_=await t.getMovieGenres(),A=n.genre_ids.slice(0,p).map(T=>{const f=_.find(F=>F.id===T),b=f?f.name:"Unknown";return s[b]||b}).join(", "),B=5,v=Math.floor(u/2),y=u%2>=1?1:0,C=B-v-y,D=[...Array(v).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(y).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(C).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${$})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.dataset.id=E,i.innerHTML=`
          <div class="card-content">
            <h2>${I}</h2>
            <p>${A} | ${S} <span class="stars">${D}</span></p>
          </div>
        `,a.style.display="none",e.appendChild(i)}document.querySelectorAll(".card").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-id");if(!i){console.error("Movie ID is undefined");return}U(i)})})}d(),window.addEventListener("resize",d)}catch(r){console.error("Error fetching data:",r)}});const w=new M,l=new x("myLibrary");async function O(){const e=document.getElementById("loader-upcoming");try{const t=await w.getUpcomingMovies(),a=new Date,s=t.filter(o=>{const c=new Date(o.release_date);return c.getFullYear()===a.getFullYear()&&c.getMonth()===a.getMonth()});if(s.length===0)e.style.display="none",h("No upcoming movies this month.");else{const o=s[Math.floor(Math.random()*s.length)];e.style.display="none",z(o)}}catch(t){console.error("Failed to fetch upcoming movies:",t),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){m.info({title:"Info",message:e})}function z(e){const t=document.getElementById("movie-container"),a=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),o=e.genre_ids.map(g=>L[g]).join(", "),c=e.popularity.toFixed(1),r=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${a}" alt="${e.title}">
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
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${o}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=r,document.getElementById("library-btn").addEventListener("click",()=>j(e)),k(e.id)}function j(e){const t=e.id;l.getMovies().some(s=>s.id===t)?(l.removeMovie(t),m.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})):(l.addMovie(e),m.success({title:"Success",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})),k(t)}function k(e){const t=l.getMovies().some(s=>s.id===e),a=document.getElementById("library-btn");t?a.textContent="Remove from my library":a.textContent="Add to my library"}const L={};w.getMovieGenres().then(e=>{e.forEach(t=>{L[t.id]=t.name}),O()});
//# sourceMappingURL=index.js.map
