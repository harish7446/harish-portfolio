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

/* Custom cursor with a smooth trailing ring. Disabled for touch and reduced motion. */
(()=> {
 "use strict";
 const finePointer=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!finePointer||reduced)return;
 const root=document.documentElement;root.classList.add("has-custom-cursor");
 const dot=document.createElement("span"),ring=document.createElement("span");
 dot.className="cursor-dot";ring.className="cursor-ring";
 dot.setAttribute("aria-hidden","true");ring.setAttribute("aria-hidden","true");document.body.append(dot,ring);
 let x=-100,y=-100,rx=-100,ry=-100,frame=0;
 const render=()=>{rx+=(x-rx)*.17;ry+=(y-ry)*.17;dot.style.transform="translate3d("+(x-3)+"px,"+(y-3)+"px,0)";ring.style.transform="translate3d("+rx+"px,"+ry+"px,0)";if(Math.abs(x-rx)>.1||Math.abs(y-ry)>.1)frame=requestAnimationFrame(render);else frame=0};
 document.addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!frame)frame=requestAnimationFrame(render)},{passive:true});
 document.addEventListener("pointerover",e=>{if(e.target.closest("a,button,[role='button'],.project"))root.classList.add("cursor-hover")});
 document.addEventListener("pointerout",e=>{if(e.target.closest("a,button,[role='button'],.project"))root.classList.remove("cursor-hover")});
 document.addEventListener("pointerdown",()=>root.classList.add("cursor-down"));
 document.addEventListener("pointerup",()=>root.classList.remove("cursor-down"));
 document.addEventListener("pointerleave",()=>root.classList.remove("cursor-hover","cursor-down"));
})();
