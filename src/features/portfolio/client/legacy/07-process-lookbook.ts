// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const section=document.querySelector('[data-process-lookbook]');
  if(!section)return;
  const runway=document.getElementById('processLookbookRunway');
  const cards=[...section.querySelectorAll('[data-process-look-card]')];
  const progressBar=document.getElementById('processLookProgress');
  const current=document.getElementById('processLookCurrent');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width:901px) and (min-height:560px)');
  let raf=0;
  let compactObserver=null;

  const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
  const mix=(a,b,t)=>a+(b-a)*t;
  const smooth=t=>t*t*(3-2*t);
  const entryY=[150,210,170,230];
  const entryR=[-4.2,3.5,-2.8,4.1];
  const settleY=[12,-8,20,0];
  const driftY=[-48,-76,-58,-88];
  const driftX=[-10,7,-5,12];
  const imageDrift=[-26,-44,-31,-50];

  const renderDesktop=()=>{
    const total=Math.max(1,runway.offsetHeight-innerHeight);
    const p=clamp(-runway.getBoundingClientRect().top/total);
    section.style.setProperty('--process-look-progress',p.toFixed(4));
    progressBar?.style.setProperty('transform',`scaleX(${p})`);
    const active=Math.min(cards.length-1,Math.max(0,Math.floor(clamp(p*.98)*cards.length)));
    if(current)current.textContent=String(active+1).padStart(2,'0');

    cards.forEach((card,index)=>{
      const enterStart=-.055+index*.07;
      const enter=smooth(clamp((p-enterStart)/.24));
      const depart=smooth(clamp((p-.78)/.22));
      const breathing=Math.sin(clamp((p-enterStart)/.82)*Math.PI)*2.2;
      const y=mix(entryY[index],settleY[index],enter)+driftY[index]*depart+breathing;
      const x=driftX[index]*depart;
      const r=mix(entryR[index],0,enter)+(index%2?1:-1)*depart*.8;
      const scale=mix(.93,1,enter)-depart*.018;
      const opacity=mix(.18,1,enter);
      const mask=mix(100,0,enter);
      const z=mix(-56,0,enter)-depart*8;
      const imageY=imageDrift[index]*(enter*.35+depart*.65);
      card.style.setProperty('--look-x',`${x.toFixed(2)}px`);
      card.style.setProperty('--look-y',`${y.toFixed(2)}px`);
      card.style.setProperty('--look-r',`${r.toFixed(3)}deg`);
      card.style.setProperty('--look-s',scale.toFixed(4));
      card.style.setProperty('--look-o',opacity.toFixed(4));
      card.style.setProperty('--look-mask',`${mask.toFixed(2)}%`);
      card.style.setProperty('--look-z',`${z.toFixed(2)}px`);
      card.style.setProperty('--look-image-y',`${imageY.toFixed(2)}px`);
    });
  };

  const resetDesktopStyles=()=>{
    section.style.setProperty('--process-look-progress','1');
    progressBar?.style.setProperty('transform','scaleX(1)');
    cards.forEach(card=>{
      card.style.removeProperty('--look-x');
      card.style.removeProperty('--look-y');
      card.style.removeProperty('--look-r');
      card.style.removeProperty('--look-s');
      card.style.removeProperty('--look-o');
      card.style.removeProperty('--look-mask');
      card.style.removeProperty('--look-z');
      card.style.removeProperty('--look-image-y');
    });
  };

  const setupCompact=()=>{
    compactObserver?.disconnect();
    compactObserver=null;
    cards.forEach(card=>card.classList.remove('look-visible'));
    if(reduce.matches||desktop.matches)return;
    compactObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const card=entry.target;
        const index=cards.indexOf(card);
        setTimeout(()=>card.classList.add('look-visible'),Math.max(0,index)*90);
        compactObserver?.unobserve(card);
      });
    },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
    cards.forEach(card=>compactObserver.observe(card));
  };

  const render=()=>{
    raf=0;
    if(reduce.matches){resetDesktopStyles();cards.forEach(card=>card.classList.add('look-visible'));return}
    if(desktop.matches){compactObserver?.disconnect();compactObserver=null;cards.forEach(card=>card.classList.remove('look-visible'));renderDesktop();return}
    resetDesktopStyles();
  };
  const queue=()=>{if(!raf)raf=requestAnimationFrame(render)};

  setupCompact();
  render();
  addEventListener('scroll',()=>{if(desktop.matches&&!reduce.matches)queue()},{passive:true});
  addEventListener('resize',()=>{setupCompact();queue()},{passive:true});
  reduce.addEventListener?.('change',()=>{setupCompact();queue()});
  desktop.addEventListener?.('change',()=>{setupCompact();queue()});
  document.addEventListener('astro:page-load',()=>{setupCompact();queue()});
  document.addEventListener('astro:after-swap',()=>{setupCompact();queue()});
})();

export {};
