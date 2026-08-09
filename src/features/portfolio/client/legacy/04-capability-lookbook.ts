// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const section=document.querySelector('[data-services-lookbook]');
  if(!section)return;
  const cards=[...section.querySelectorAll('[data-look-card]')];
  const progressBar=section.querySelector('[data-services-progress]');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width:901px) and (min-height:560px)');
  let frame=0;

  const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
  const mix=(from,to,t)=>from+(to-from)*t;
  const smooth=t=>t*t*(3-2*t);
  const entryY=[170,235,150];
  const entryR=[-6.5,4.2,6.2];
  const exitY=[-42,22,-30];
  const exitR=[-1.8,.8,1.6];

  const reset=()=>{
    section.classList.remove('lookbook-motion-ready');
    section.style.setProperty('--services-progress','1');
    progressBar?.style.setProperty('transform','scaleX(1)');
    cards.forEach(card=>{
      card.style.setProperty('--look-y','0px');
      card.style.setProperty('--look-r','0deg');
      card.style.setProperty('--look-s','1');
      card.style.setProperty('--look-o','1');
      card.style.setProperty('--look-mask','0%');
      card.style.setProperty('--look-depth','0px');
    });
  };

  const render=()=>{
    frame=0;
    if(reduce.matches||!desktop.matches){reset();return}
    section.classList.add('lookbook-motion-ready');
    const top=section.offsetTop;
    const height=section.offsetHeight;
    const start=top-innerHeight*.62;
    const end=top+height-innerHeight*.72;
    const p=clamp((scrollY-start)/Math.max(1,end-start));
    section.style.setProperty('--services-progress',p.toFixed(4));
    progressBar?.style.setProperty('transform',`scaleX(${p})`);

    cards.forEach((card,index)=>{
      const offset=.055+index*.105;
      const enter=smooth(clamp((p-offset)/.38));
      const depart=smooth(clamp((p-.80)/.20));
      const y=mix(entryY[index],0,enter)+exitY[index]*depart;
      const rotate=mix(entryR[index],0,enter)+exitR[index]*depart;
      const scale=mix(.88,1,enter)-depart*.018;
      const opacity=mix(.14,1,enter);
      const mask=mix(100,0,enter);
      const depth=mix(-60,0,enter)-depart*8;
      card.style.setProperty('--look-y',`${y.toFixed(2)}px`);
      card.style.setProperty('--look-r',`${rotate.toFixed(3)}deg`);
      card.style.setProperty('--look-s',scale.toFixed(4));
      card.style.setProperty('--look-o',opacity.toFixed(4));
      card.style.setProperty('--look-mask',`${mask.toFixed(2)}%`);
      card.style.setProperty('--look-depth',`${depth.toFixed(2)}px`);
    });
  };

  const queue=()=>{if(!frame)frame=requestAnimationFrame(render)};
  addEventListener('scroll',()=>{if(desktop.matches&&!reduce.matches)queue()},{passive:true});
  addEventListener('resize',queue,{passive:true});
  reduce.addEventListener?.('change',queue);
  desktop.addEventListener?.('change',queue);
  document.addEventListener('astro:page-load',queue);
  document.addEventListener('astro:after-swap',queue);

  let compactObserver=null;
  const setupCompactMotion=()=>{
    if(reduce.matches||desktop.matches){
      section.classList.remove('lookbook-compact-motion');
      compactObserver?.disconnect();
      compactObserver=null;
      cards.forEach(card=>card.classList.remove('look-visible'));
      return;
    }
    section.classList.add('lookbook-compact-motion');
    if(compactObserver)return;
    compactObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const card=entry.target;
          const index=cards.indexOf(card);
          setTimeout(()=>card.classList.add('look-visible'),Math.max(0,index)*90);
          compactObserver?.unobserve(card);
        }
      });
    },{threshold:.18,rootMargin:'0px 0px -7% 0px'});
    cards.forEach(card=>compactObserver.observe(card));
  };
  setupCompactMotion();
  desktop.addEventListener?.('change',setupCompactMotion);
  reduce.addEventListener?.('change',setupCompactMotion);
  document.addEventListener('astro:page-load',setupCompactMotion);
  document.addEventListener('astro:after-swap',setupCompactMotion);
  requestAnimationFrame(render);
})();

export {};
