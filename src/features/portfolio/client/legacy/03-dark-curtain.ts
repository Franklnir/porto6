// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const curtain=document.getElementById('darkPageCurtain');
  const curtainLabel=document.getElementById('darkCurtainLabel');
  if(!curtain)return;

  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const darkSections=[
    {element:document.querySelector('.projects'),label:'Selected projects'},
    {element:document.querySelector('.process'),label:'Engineering process'},
    {element:document.querySelector('.contact'),label:'Contact & collaboration'}
  ].filter(item=>item.element);

  if(reduceMotion||!darkSections.length){
    curtain.remove();
    return;
  }

  let frame=0;
  let activeSection=null;
  const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));

  const resetSection=section=>{
    section.classList.remove('dark-cover-entering');
    section.style.removeProperty('--dark-cover-radius');
    section.style.removeProperty('--dark-cover-shadow');
  };

  const renderDarkCurtain=()=>{
    frame=0;

    if(document.body.classList.contains('modal-open')){
      curtain.classList.remove('is-active');
      darkSections.forEach(item=>resetSection(item.element));
      activeSection=null;
      return;
    }

    const viewport=Math.max(window.innerHeight,1);
    const revealStart=viewport*.98;
    const revealEnd=viewport*.04;
    let candidate=null;

    for(const item of darkSections){
      const rect=item.element.getBoundingClientRect();
      if(rect.top>revealEnd&&rect.top<revealStart&&rect.bottom>0){
        const progress=clamp((revealStart-rect.top)/(revealStart-revealEnd));
        if(!candidate||progress>candidate.progress){
          candidate={...item,rect,progress};
        }
      }
    }

    darkSections.forEach(item=>{
      if(!candidate||item.element!==candidate.element)resetSection(item.element);
    });

    if(!candidate){
      curtain.classList.remove('is-active');
      activeSection=null;
      return;
    }

    const eased=1-Math.pow(1-candidate.progress,3);
    const translate=(1-eased)*101;
    const scale=.985+eased*.015;
    const radius=(1-eased)*Math.min(54,viewport*.055);
    const shadow=.06+eased*.18;

    curtain.style.setProperty('--curtain-progress',eased.toFixed(4));
    curtain.style.setProperty('--curtain-glow-opacity',(.16+eased*.84).toFixed(3));
    curtain.style.setProperty('--curtain-meta-opacity',clamp((eased-.22)*2.2).toFixed(3));
    curtain.style.setProperty('--curtain-meta-y',`${((1-eased)*18).toFixed(2)}px`);
    curtain.style.transform=`translate3d(0,${translate.toFixed(3)}%,0) scale(${scale.toFixed(5)})`;
    curtain.style.borderRadius=`${radius.toFixed(2)}px ${radius.toFixed(2)}px 0 0`;
    curtain.classList.add('is-active');

    candidate.element.classList.add('dark-cover-entering');
    candidate.element.style.setProperty('--dark-cover-radius',`${radius.toFixed(2)}px`);
    candidate.element.style.setProperty('--dark-cover-shadow',shadow.toFixed(3));

    if(activeSection!==candidate.element){
      activeSection=candidate.element;
      curtainLabel.textContent=candidate.label;
    }
  };

  const queueDarkCurtain=()=>{
    if(frame)return;
    frame=requestAnimationFrame(renderDarkCurtain);
  };

  addEventListener('scroll',queueDarkCurtain,{passive:true});
  addEventListener('resize',queueDarkCurtain,{passive:true});
  addEventListener('orientationchange',queueDarkCurtain,{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden)queueDarkCurtain();
  });

  renderDarkCurtain();
})();

export {};
