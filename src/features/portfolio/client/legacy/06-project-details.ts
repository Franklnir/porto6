// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const ease=t=>1-Math.pow(1-t,3);
  const smooth=t=>t*t*(3-2*t);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width: 900px)');
  let raf=0;

  function resetProjectDetails(){
    const wrap=document.getElementById('projectDetailsScroll');
    const track=document.getElementById('projectDetailsTrack');
    if(wrap)wrap.style.removeProperty('height');
    if(track)track.style.removeProperty('transform');
    document.querySelectorAll('.portfolio-detail-card').forEach(card=>card.style.removeProperty('--card-focus'));
  }

  function updateProjectDetails(){
    const wrap=document.getElementById('projectDetailsScroll');
    const viewport=document.getElementById('projectDetailsViewport');
    const track=document.getElementById('projectDetailsTrack');
    if(!wrap||!viewport||!track)return;

    const projectCards=[...track.querySelectorAll('[data-project-detail]')];
    const allCards=[...track.querySelectorAll('.portfolio-detail-card')];
    const progressBar=document.getElementById('projectDetailsProgress');
    const current=document.getElementById('projectDetailsCurrent');

    if(!desktop.matches||reduced.matches){
      resetProjectDetails();
      const max=Math.max(1,viewport.scrollWidth-viewport.clientWidth);
      const ratio=clamp(viewport.scrollLeft/max);
      if(progressBar)progressBar.style.transform=`scaleX(${ratio})`;
      if(current&&projectCards.length){
        const center=viewport.scrollLeft+viewport.clientWidth/2;
        let active=0,best=Infinity;
        projectCards.forEach((card,index)=>{const d=Math.abs(card.offsetLeft+card.offsetWidth/2-center);if(d<best){best=d;active=index}});
        current.textContent=String(active+1).padStart(2,'0');
      }
      return;
    }

    const horizontal=Math.max(0,track.scrollWidth-viewport.clientWidth);
    const scrollDistance=Math.max(innerHeight*.9,horizontal*1.03);
    const desiredHeight=innerHeight+scrollDistance;
    if(Math.abs(wrap.offsetHeight-desiredHeight)>2)wrap.style.height=`${desiredHeight}px`;

    const total=Math.max(1,wrap.offsetHeight-innerHeight);
    const progress=clamp(-wrap.getBoundingClientRect().top/total);
    const x=horizontal*progress;
    track.style.transform=`translate3d(${-x}px,0,0)`;
    if(progressBar)progressBar.style.transform=`scaleX(${progress})`;

    const viewportCenter=viewport.clientWidth/2;
    let active=0,best=Infinity;
    projectCards.forEach((card,index)=>{
      const center=card.offsetLeft-x+card.offsetWidth/2;
      const distance=Math.abs(center-viewportCenter);
      if(distance<best){best=distance;active=index}
    });
    if(current)current.textContent=String(active+1).padStart(2,'0');

    allCards.forEach(card=>{
      const center=card.offsetLeft-x+card.offsetWidth/2;
      const range=(viewport.clientWidth+card.offsetWidth)*.58;
      const focus=1-clamp(Math.abs(center-viewportCenter)/range);
      card.style.setProperty('--card-focus',String(ease(focus)));
    });
  }

  const detailViewport=document.getElementById('projectDetailsViewport');
  detailViewport?.addEventListener('scroll',()=>{if(!desktop.matches)updateProjectDetails()},{passive:true});


  function updateProcessFlip(){
    const wrap=document.getElementById('processFlipScroll');
    const cards=[...document.querySelectorAll('[data-process-card]')];
    if(!wrap||!cards.length)return;
    if(reduced.matches){cards.forEach(card=>card.querySelector('.process-flip-inner').style.transform='rotateX(180deg)');return}
    if(desktop.matches){
      const total=Math.max(1,wrap.offsetHeight-innerHeight);
      const progress=clamp(-wrap.getBoundingClientRect().top/total);
      cards.forEach((card,index)=>{
        const start=.035+index*(.89/cards.length);
        const duration=.21;
        const t=smooth(clamp((progress-start)/duration));
        const inner=card.querySelector('.process-flip-inner');
        const lift=Math.sin(t*Math.PI)*-26;
        const tilt=Math.sin(t*Math.PI)*1.4;
        inner.style.transform=`rotateX(${-t*180}deg)`;
        card.style.transform=`translate3d(0,${lift}px,0) rotateZ(${(index%2?1:-1)*tilt}deg) scale(${1+Math.sin(t*Math.PI)*.015})`;
        card.style.zIndex=String(20+Math.round(Math.sin(t*Math.PI)*20)+index);
        card.style.setProperty('--flip-shadow',String(Math.sin(t*Math.PI)));
        card.style.setProperty('--flip-reveal',String(t));
      });
      const active=Math.min(cards.length-1,Math.max(0,Math.floor(progress*cards.length)));
      const current=document.getElementById('processFlipCurrent');
      if(current)current.textContent=String(active+1).padStart(2,'0');
      const bar=document.getElementById('processFlipProgress');
      if(bar)bar.style.transform=`scaleX(${progress})`;
    }else{
      cards.forEach(card=>{
        const r=card.getBoundingClientRect();
        const t=smooth(clamp((innerHeight*.86-r.top)/(innerHeight*.52)));
        card.querySelector('.process-flip-inner').style.transform=`rotateX(${-t*180}deg)`;
        card.style.transform=`translate3d(0,${Math.sin(t*Math.PI)*-12}px,0)`;
        card.style.setProperty('--flip-shadow',String(Math.sin(t*Math.PI)*.7));
        card.style.setProperty('--flip-reveal',String(t));
      });
    }
  }

  function update(){raf=0;updateProjectDetails();updateProcessFlip()}
  function request(){if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  desktop.addEventListener?.('change',request);
  reduced.addEventListener?.('change',request);
  document.addEventListener('astro:page-load',request);
  document.addEventListener('astro:after-swap',request);
  request();
})();

export {};
