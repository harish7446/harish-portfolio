(()=>{"use strict";const menu=document.querySelector(".menu"),nav=document.querySelector("#nav");if(menu&&nav){menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));nav.classList.toggle("open",open)});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}))}const data={stock:{category:"01 / OPERATIONS",title:"HGC SmartStock",text:"A practical stock-visibility concept shaped around fuel-station reporting routines.",problem:"Daily sales, deliveries and physical stock need to be recorded consistently so low stock and discrepancies are easier to spot.",approach:"Structure separate entries for sales, physical stock and each delivery; calculate closing stock and flag low-stock conditions for review.",status:"Prototype and workflow development. WhatsApp automation and live ordering are not presented as completed features.",tags:["Google Sheets","Apps Script","Workflow design","Reporting"]},fuel:{category:"02 / WORKFLOW",title:"FuelFlow",text:"A fuel-station shift workflow concept focused on clearer records and handovers.",problem:"Shift readings and collection records can become difficult to review when information is spread across manual notes.",approach:"Design a simple interface around shift entries, nozzle readings and collection categories, with role-aware workflows planned.",status:"Concept and interface planning. Firebase integration is planned, not claimed as production-ready.",tags:["HTML","CSS","JavaScript","Firebase planned"]},lab:{category:"03 / PERSONAL",title:"Digital Lab",text:"A personal space for experiments that strengthen practical web-development skills.",problem:"Learning isolated concepts does not always build confidence in combining them into a usable interface.",approach:"Practice responsive layouts, interaction patterns and small browser-based experiments, then refine them through iteration.",status:"Ongoing learning and experimentation.",tags:["UI experiments","Responsive design","JavaScript","Continuous learning"]}};const dialog=document.querySelector("#details"),title=document.querySelector("#dtitle"),text=document.querySelector("#dtext"),tags=document.querySelector("#dtags");document.querySelectorAll("[data-project]").forEach(btn=>btn.addEventListener("click",()=>{const p=data[btn.dataset.project];if(!p||!dialog||!dialog.showModal)return;title.textContent=p.title;text.textContent=p.text;document.querySelector("#dcategory").textContent=p.category;document.querySelector("#dproblem").textContent=p.problem;document.querySelector("#dapproach").textContent=p.approach;document.querySelector("#dstatus").textContent=p.status;tags.replaceChildren(...p.tags.map(t=>{const s=document.createElement("span");s.textContent=t;return s}));dialog.showModal()}));document.querySelector(".close")?.addEventListener("click",()=>dialog.close());dialog?.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear()})();

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


// Mobile cinematic touch feedback: a brief lime glow follows the finger and taps create a ripple.
(()=>{
 const coarse=window.matchMedia("(hover:none) and (pointer:coarse)").matches;
 const reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
 if(!coarse||reduced)return;
 let glow=null,hideTimer=0;
 const ensureGlow=()=>{
  if(glow)return glow;
  glow=document.createElement("span");glow.className="touch-glow";glow.setAttribute("aria-hidden","true");
  document.body.appendChild(glow);return glow;
 };
 const moveGlow=(x,y)=>{
  const el=ensureGlow();el.style.left=x+"px";el.style.top=y+"px";
  el.classList.add("is-active");clearTimeout(hideTimer);
  hideTimer=setTimeout(()=>el&&el.classList.remove("is-active"),420);
 };
 document.addEventListener("touchstart",e=>{
  const t=e.changedTouches&&e.changedTouches[0];if(!t)return;
  moveGlow(t.clientX,t.clientY);
  const ripple=document.createElement("span");ripple.className="touch-ripple";
  ripple.style.left=t.clientX+"px";ripple.style.top=t.clientY+"px";
  ripple.setAttribute("aria-hidden","true");document.body.appendChild(ripple);
  ripple.addEventListener("animationend",()=>ripple.remove(),{once:true});
 },{passive:true});
 document.addEventListener("touchmove",e=>{
  const t=e.touches&&e.touches[0];if(t)moveGlow(t.clientX,t.clientY);
 },{passive:true});
 document.addEventListener("touchend",()=>{
  clearTimeout(hideTimer);hideTimer=setTimeout(()=>glow&&glow.classList.remove("is-active"),180);
 },{passive:true});
})();


/* H/OS interactive command console — informative, no external dependencies. */
(()=>{
 "use strict";
 const command=document.querySelector("#console-command");
 const output=document.querySelector("#console-output");
 const actions=document.querySelector(".console-actions");
 if(!command||!output||!actions)return;
 const responses={
  about:{command:"whoami",output:"Harish Kumar G — aspiring software developer. Learning through practical projects."},
  stack:{command:"stack",output:"NOW: HTML · CSS · JavaScript · Git & GitHub  |  LEARNING: React · Node.js · databases"},
  method:{command:"approach",output:"Understand the problem → build a clear first version → test → improve. Useful over complicated."},
  clear:{command:"clear",output:"Console cleared. Choose a command to explore H/OS."}
 };
 actions.addEventListener("click",event=>{
  const button=event.target.closest("button[data-command]");
  if(!button)return;
  const result=responses[button.dataset.command];
  if(!result)return;
  command.textContent=result.command;
  output.textContent=result.output;
 });
})();
