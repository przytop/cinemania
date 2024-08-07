import{o as v,T as h}from"./assets/main-47df2e82.js";import"./assets/vendor-aedd9b60.js";const p=document.querySelector(".my-library-movie-list"),g=document.querySelector(".my-library-sorry"),d=document.querySelector(".my-library-main-section .my-library-button"),b=document.querySelector(".my-library-main-section"),l=document.querySelector("#genre"),c=document.querySelector("#my-library-button-search");let a=0;const f=9,y=new Map;async function S(){try{(await new h().getMovieGenres()).forEach(t=>{t.id&&t.name&&y.set(t.id,t.name)}),L()}catch(e){console.error("Error fetching genres:",e)}}function L(){if(!l.querySelector('option[value=""]')){const e=document.createElement("option");e.value="",e.textContent="Genre",e.disabled=!0,e.selected=!0,l.appendChild(e)}y.forEach((e,n)=>{const t=document.createElement("option");t.value=e.toLowerCase(),t.textContent=e,l.appendChild(t)})}function M(e){const n=document.createElement("li");n.classList.add("my-library-movie-list-item");const t=(e.genre_ids||[]).map(i=>y.get(i)||"Unknown").join(", "),o=e.id,r=new Date(e.release_date).getFullYear();n.dataset.id=o;const s=`https://image.tmdb.org/t/p/w500${e.poster_path}`;return n.style.backgroundImage=`url(${s})`,n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.innerHTML=`
    <div class="my-library-gradient"></div>
    <div class="my-library-movie">
      <span class="my-library-movie-title">${e.title}</span>
      <span class="my-library-movie-genres">${t} | ${r}</span>
    </div>
  `,n}function m(e="",n=!0){const t=JSON.parse(localStorage.getItem("myLibrary"))||[];console.log("Total Movies:",t.length),n&&(a=0);const o=e?t.filter(r=>(r.genre_ids||[]).some(i=>y.get(i).toLowerCase()===e.toLowerCase())):t;n&&(p.innerHTML=""),console.log("Filtered Movies:",o.length),o.length>0?(b.style.display="block",g.style.display="none",document.querySelector(".genre-form").style.display="block",o.slice(a,a+f).forEach(s=>{const i=M(s);p.appendChild(i)}),a+=f,a>=o.length?d.style.display="none":d.style.display="block",c.style.display="none",c.disabled=!0):(g.style.display="block",b.style.display="none",document.querySelector(".genre-form").style.display="none",d.style.display="none",c.style.display="block",c.disabled=!1),document.querySelectorAll(".my-library-movie-list-item").forEach(r=>{r.addEventListener("click",s=>{const u=s.currentTarget.dataset.id;u&&v(u)})})}d.addEventListener("click",function(){m(l.value,!1)});l.addEventListener("change",function(){const e=l.value;m(e)});async function k(){await S(),m()}k();
//# sourceMappingURL=commonHelpers3.js.map
