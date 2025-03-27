import{L as T,T as _,o as k}from"./assets/main-4YEKBp7_.js";import"./assets/vendor-CN01XXcz.js";document.addEventListener("DOMContentLoaded",async function(){const d=document.querySelector(".my-library-movie-list"),l=document.querySelector(".my-library-button.load"),y=document.querySelector(".my-library-sorry"),u=document.querySelector(".my-library-main-section"),a=document.querySelector("#genre"),i=document.querySelector("#my-library-button-search"),h=new T("myLibrary"),v=new _;let o=0;const m=12,g=new Map;async function w(){try{(await v.getMovieGenres()).forEach(t=>{t.id&&t.name&&g.set(t.id,t.name)}),L()}catch(e){console.error("Error fetching genres:",e)}}function L(){if(!a.querySelector('option[value=""]')){const e=document.createElement("option");e.value="",e.textContent="Genre",e.disabled=!0,e.selected=!0,a.appendChild(e)}g.forEach((e,t)=>{const n=document.createElement("option");n.value=t,n.textContent=e,a.appendChild(n)})}function E(e){const n=window.innerWidth<=600?1:2;return e.slice(0,n).map(s=>g.get(s)||"Unknown").join(", ")}function q(e){const n=Math.floor(e/2),s=e%2>=1?1:0,r=5-n-s;return[...Array(n).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(s).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(r).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}function b(e){const t=document.createElement("li");t.classList.add("my-library-movie-list-item");const n=E(e.genre_ids||[]),s=e.id,r=e.release_date?new Date(e.release_date).getFullYear():"Unknown",c=Math.round(e.vote_average*10)/10,p=q(c),f=`https://image.tmdb.org/t/p/w500${e.poster_path}`;return t.style.backgroundImage=`url(${f})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.dataset.id=s,t.innerHTML=`
      <div class="my-library-gradient"></div>
      <div class="my-library-movie">
        <h2>${e.title}</h2>
        <p>${n} | ${r} <span class="stars">${p}</span></p>
      </div>
    `,t.addEventListener("click",()=>{k(e.id)}),t}async function D(e){try{const t=await v.getMovieDetails(e.id);return t&&t.genres&&(e.genre_ids=t.genres.map(n=>n.id)),t}catch(t){return console.error(`Failed to fetch details for movie ID ${e.id}:`,t),null}}async function S(e){for(const t of e)t.genre_ids||await D(t)}async function I(e="",t=!0){const n=h.getMovies();t&&(o=0,d.innerHTML=""),await S(n);const s=e?n.filter(r=>r.genre_ids&&r.genre_ids.includes(parseInt(e))):n;s.length>0?(u.style.display="block",y.style.display="none",document.querySelector(".genre-form").style.display="block",s.slice(o,o+m).forEach(c=>{const p=b(c);d.appendChild(p)}),o+=m,o>=s.length?l.style.display="none":l.style.display="block",i.style.display="none",i.disabled=!0):(y.style.display="block",u.style.display="none",document.querySelector(".genre-form").style.display="none",l.style.display="none",i.style.display="block",i.disabled=!1),document.querySelectorAll(".my-library-movie-list-item").forEach(r=>{r.addEventListener("click",c=>{const f=c.currentTarget.dataset.id;f&&k(f)})})}async function M(e=!0){const t=h.getMovies();if(e&&(o=0,d.innerHTML=""),t.length===0){y.style.display="block",l.style.display="none",u.style.display="none",document.querySelector(".genre-form").style.display="none",i.style.display="block",i.disabled=!1;return}else y.style.display="none",u.style.display="block",document.querySelector(".genre-form").style.display="block",i.style.display="none",i.disabled=!0;await S(t);for(const n of t.slice(o,o+m)){const s=b(n);d.appendChild(s)}o+=m,o>=t.length?l.style.display="none":l.style.display="block"}l.addEventListener("click",()=>{M(!1)}),a.addEventListener("change",function(){const e=a.value;I(e)}),await w(),M()});
//# sourceMappingURL=commonHelpers.js.map
