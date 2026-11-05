(()=>{"use strict";const menu=document.querySelector(".menu"),nav=document.querySelector("#nav");if(menu&&nav){menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));nav.classList.toggle("open",open)});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}))}const data={stock:{title:"HGC SmartStock",text:"A fuel-stock tracking concept for daily sales, physical stock, delivery records, discrepancy review and low-stock alerts. The aim is clearer routine reporting and fewer manual mistakes.",tags:["Workflow design","Daily reporting","Stock visibility","In development"]},fuel:{title:"FuelFlow",text:"A fuel-station shift workflow concept for recording readings, organizing collections and improving handovers. Integrations are planned until verified in a working build.",tags:["HTML","CSS","JavaScript","Firebase planned"]},lab:{title:"Digital Lab",text:"A space for small interface experiments, responsive layouts and practical exercises that build confidence with browser fundamentals and software development habits.",tags:["UI experiments","Responsive design","Continuous learning"]}};const dialog=document.querySelector("#details"),title=document.querySelector("#dtitle"),text=document.querySelector("#dtext"),tags=document.querySelector("#dtags");document.querySelectorAll("[data-project]").forEach(btn=>btn.addEventListener("click",()=>{const p=data[btn.dataset.project];if(!p||!dialog||!dialog.showModal)return;title.textContent=p.title;text.textContent=p.text;tags.replaceChildren(...p.tags.map(t=>{const s=document.createElement("span");s.textContent=t;return s}));dialog.showModal()}));document.querySelector(".close")?.addEventListener("click",()=>dialog.close());dialog?.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear()})();

/* Cinematic scroll reveals — dependency-free and accessible. */
(()=> {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(".hero .eyebrow,.hero h1,.hero-bottom,.ticker,.section > .label,.two,.heading,.project,.contact-intro,.contacts a");
  if (!targets.length) return;
  targets.forEach((el,index) => {
    el.classList.add("reveal");
    if (el.classList.contains("project") || el.matches(".contacts a")) el.dataset.revealDelay=String((index%3)+1);
  });
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries,obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },{threshold:.12,rootMargin:"0px 0px -35px 0px"});
  targets.forEach(el => observer.observe(el));
})();
