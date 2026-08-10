// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(() => {
  'use strict';
  const card = document.getElementById('heroPhoto');
  const source = document.getElementById('profileHeroSlot');
  const target = document.getElementById('profileAboutSlot');
  const techInner = document.querySelector('.tech-inner');
  const about = document.getElementById('about');
  if (!card || !source || !target || !about) return;

  const desktop = matchMedia('(min-width:1280px) and (min-height:700px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const lerp = (a,b,t) => a + (b-a)*t;
  const ease = t => t*t*(3-2*t);

  let metrics = null;
  let frame = 0;
  let mounted = card.parentElement === target ? 'target' : 'source';
  let safeTarget = mounted === 'target';
  let handoffAnimation = null;

  const syncTargetSize = () => {
    const sourceRect = source.getBoundingClientRect();
    if (sourceRect.width < 20 || sourceRect.height < 20) return null;
    target.style.width = `${sourceRect.width}px`;
    target.style.height = `${sourceRect.height}px`;
    target.style.minHeight = `${sourceRect.height}px`;
    return sourceRect;
  };

  const clearInline = () => {
    handoffAnimation?.cancel();
    handoffAnimation = null;
    card.classList.remove('profile-card--travelling','profile-card--mobile-flip','profile-card--safe-handoff');
    ['left','top','width','height','position','inset','margin','z-index','transition','pointer-events','transform','transform-origin','opacity','filter','clip-path'].forEach(prop=>card.style.removeProperty(prop));
  };

  const mount = (slot,name) => {
    if (card.parentElement !== slot) slot.appendChild(card);
    clearInline();
    mounted = name;
    document.body.classList.toggle('profile-card-away', name !== 'source');
  };

  const safeHandoff = (slot,name,direction) => {
    if (card.parentElement === slot && mounted === name) return;
    clearInline();
    slot.appendChild(card);
    mounted = name;
    document.body.classList.toggle('profile-card-away', name !== 'source');
    card.classList.add('profile-card--safe-handoff');

    if (reduced.matches) return;
    const fromY = direction === 'down' ? 28 : -18;
    const animation = card.animate([
      {opacity:0,transform:`translateY(${fromY}px) scale(.985)`,clipPath:'inset(10% 0 10% 0 round 2px)',filter:'blur(5px)'},
      {opacity:1,transform:'translateY(0) scale(1)',clipPath:'inset(0 0 0 0 round 0)',filter:'blur(0)'}
    ],{
      duration:680,
      easing:'cubic-bezier(.16,1,.3,1)',
      fill:'both'
    });
    handoffAnimation = animation;
    void animation.finished.then(
      () => {
        if (handoffAnimation !== animation) return;
        handoffAnimation = null;
        card.classList.remove('profile-card--safe-handoff');
        ['opacity','transform','clip-path','filter'].forEach(prop=>card.style.removeProperty(prop));
      },
      error => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Profile handoff animation failed',error);
      }
    );
  };

  const measure = () => {
    if (!desktop.matches) return;
    if (card.parentElement !== source && card.parentElement !== target) source.appendChild(card);
    clearInline();
    const sourceRect = syncTargetSize();
    if (!sourceRect) return;
    const targetRect = target.getBoundingClientRect();
    const pageY = scrollY;
    const sourceDocTop = sourceRect.top + pageY;
    const targetDocTop = targetRect.top + pageY;
    const start = Math.max(0,sourceDocTop - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header')) || 76) - 42);
    const targetHeight = targetRect.height;
    const preferredEndTop = clamp(innerHeight*.27,130,235);
    const endTop = Math.max(92,Math.min(preferredEndTop,innerHeight-targetHeight-30));
    const end = Math.max(start+320,targetDocTop-endTop);

    if (techInner) {
      const reserve = Math.ceil(sourceRect.width + 18);
      techInner.style.setProperty('--profile-reserve-width',`${reserve}px`);
    }

    metrics={
      start,end,
      startTop:sourceDocTop-start,
      endTop,
      sourceLeft:sourceRect.left,
      targetLeft:targetRect.left,
      sourceWidth:sourceRect.width,
      targetWidth:targetRect.width,
      sourceHeight:sourceRect.height,
      targetHeight:targetRect.height,
    };
  };

  const renderDesktop = () => {
    if (!metrics) measure();
    if (!metrics) return;
    const y = scrollY;
    if (y <= metrics.start+.5) {
      mount(source,'source');
      return;
    }
    if (y >= metrics.end-.5) {
      mount(target,'target');
      return;
    }
    const raw=clamp((y-metrics.start)/(metrics.end-metrics.start),0,1);
    const t=ease(raw);
    if (card.parentElement !== document.body) document.body.appendChild(card);
    mounted='travel';
    document.body.classList.toggle('profile-card-away',raw>.08);
    card.classList.add('profile-card--travelling');
    card.style.left=`${lerp(metrics.sourceLeft,metrics.targetLeft,t).toFixed(2)}px`;
    card.style.top=`${lerp(metrics.startTop,metrics.endTop,t).toFixed(2)}px`;
    card.style.width=`${lerp(metrics.sourceWidth,metrics.targetWidth,t).toFixed(2)}px`;
    card.style.height=`${lerp(metrics.sourceHeight,metrics.targetHeight,t).toFixed(2)}px`;
  };

  const renderSafe = () => {
    metrics=null;
    syncTargetSize();
    techInner?.style.removeProperty('--profile-reserve-width');

    const rect=about.getBoundingClientRect();
    // Transfer only after About itself reaches the viewport. The portrait is
    // therefore never a floating layer over the technology strip.
    const shouldTarget=rect.top <= innerHeight*.94;
    if (shouldTarget !== safeTarget) {
      safeTarget=shouldTarget;
      safeHandoff(shouldTarget?target:source,shouldTarget?'target':'source',shouldTarget?'down':'up');
    } else if (card.parentElement !== (shouldTarget?target:source)) {
      mount(shouldTarget?target:source,shouldTarget?'target':'source');
    }
  };

  const render=()=>{
    frame=0;
    if (reduced.matches) {
      syncTargetSize();
      techInner?.style.removeProperty('--profile-reserve-width');
      const shouldTarget = !desktop.matches && about.getBoundingClientRect().top <= innerHeight*.94;
      mount(shouldTarget?target:source,shouldTarget?'target':'source');
      return;
    }
    if (desktop.matches) renderDesktop();
    else renderSafe();
  };

  const queue=()=>{if(!frame) frame=requestAnimationFrame(render)};
  const remeasure=()=>{
    metrics=null;
    handoffAnimation?.cancel();
    handoffAnimation=null;
    if (desktop.matches) {
      safeTarget=false;
      if (card.parentElement !== source && card.parentElement !== target) source.appendChild(card);
    }
    queue();
  };

  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',remeasure,{passive:true});
  desktop.addEventListener?.('change',remeasure);
  reduced.addEventListener?.('change',remeasure);
  document.fonts?.ready.then(remeasure).catch(()=>{});
  document.addEventListener('astro:page-load',remeasure);
  document.addEventListener('astro:after-swap',remeasure);
  requestAnimationFrame(remeasure);
})();

export {};
