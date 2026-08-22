// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const d=document;
  const root=d.documentElement;
  const body=d.body;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;
  const ease='cubic-bezier(.16,1,.3,1)';
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));

  /* Enable enhanced reveal selectors only after the base script is installed. */
  root.classList.add('motion-enhanced');

  /* Loader counter with hard timeout; the CSS layer has a second failsafe. */
  const loader=d.getElementById('motionLoader');
  const loaderCount=d.getElementById('motionLoaderCount');
  if(!reduced&&loader&&loaderCount){
    const started=performance.now();
    const countFrame=now=>{
      const p=clamp((now-started)/980,0,1);
      loaderCount.textContent=String(Math.round(p*100)).padStart(2,'0');
      if(p<1)requestAnimationFrame(countFrame);
    };
    requestAnimationFrame(countFrame);
    setTimeout(()=>body.classList.add('motion-loaded'),1120);
    setTimeout(()=>loader.remove(),2300);
  }else{
    body.classList.add('motion-loaded');
    loader?.remove();
  }

  /* Preserve nested colour spans while splitting headings into masked words. */
  const splitWords=el=>{
    if(!el||el.dataset.motionSplit)return [];
    el.dataset.motionSplit='true';
    const walker=d.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode(node){
      return node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const frag=d.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(part=>{
        if(!part)return;
        if(/^\s+$/.test(part)){frag.appendChild(d.createTextNode(part));return;}
        const mask=d.createElement('span');
        const word=d.createElement('span');
        mask.className='motion-word-mask';
        word.className='motion-word';
        word.textContent=part;
        mask.appendChild(word);
        frag.appendChild(mask);
      });
      node.replaceWith(frag);
    });
    return [...el.querySelectorAll('.motion-word')];
  };

  const animateWords=(el,{delay=0,stagger=34,duration=900}={})=>{
    if(!el||reduced||el.dataset.motionAnimated)return;
    el.dataset.motionAnimated='true';
    splitWords(el).forEach((word,index)=>word.animate([
      {transform:'translateY(112%) rotate(2.5deg)',opacity:0,filter:'blur(7px)'},
      {transform:'translateY(0) rotate(0)',opacity:1,filter:'blur(0)'}
    ],{duration,delay:delay+index*stagger,easing:ease,fill:'both'}));
  };

  const animateElement=(el,keyframes,options={})=>{
    if(!el||reduced)return;
    el.animate(keyframes,{duration:900,easing:ease,fill:'both',...options});
  };

  /* Hero choreography: masked title, supporting copy, actions, and portrait wipe. */
  requestAnimationFrame(()=>{
    animateWords(d.getElementById('heroTitle'),{delay:220,stagger:46,duration:980});
    const heroItems=[...d.querySelectorAll('.hero [data-hero]')].filter(el=>el.id!=='heroTitle'&&el.tagName!=='H1');
    heroItems.forEach((el,index)=>animateElement(el,[
      {transform:'translateY(28px)',opacity:0,filter:'blur(7px)'},
      {transform:'translateY(0)',opacity:1,filter:'blur(0)'}
    ],{delay:430+index*90,duration:840}));
    const heroPhoto=d.getElementById('heroPhoto');
    if(heroPhoto){
      animateElement(heroPhoto,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],{delay:280,duration:1100});
      const image=heroPhoto.querySelector('img');
      animateElement(image,[{transform:'scale(1.09)'},{transform:'scale(1)'}],{delay:280,duration:1500});
    }
  });

  /* Section heading masks and visual wipes. */
  if('IntersectionObserver'in window){
    const headingObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      animateWords(entry.target,{delay:80,stagger:28,duration:870});
      headingObserver.unobserve(entry.target);
    }),{threshold:.34,rootMargin:'0px 0px -10% 0px'});
    d.querySelectorAll('main h2').forEach(h=>headingObserver.observe(h));

    const imageObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const box=entry.target;
      animateElement(box,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:1050});
      const visual=box.querySelector('img,.project-art');
      animateElement(visual,[{transform:'scale(1.075)'},{transform:'scale(1)'}],{duration:1350});
      const sheen=d.createElement('i');
      sheen.className='motion-image-sheen';
      box.appendChild(sheen);
      requestAnimationFrame(()=>sheen.classList.add('is-running'));
      setTimeout(()=>sheen.remove(),1250);
      imageObserver.unobserve(box);
    }),{threshold:.22,rootMargin:'0px 0px -8% 0px'});
    d.querySelectorAll('.about-photo,.project-visual').forEach(el=>imageObserver.observe(el));
  }

  /* Scroll direction header and subtle scroll-linked depth. */
  const header=d.getElementById('siteHeader');
  let lastScroll=scrollY;
  let ticking=false;
  const depthItems=[
    ...d.querySelectorAll('.project-art'),
    d.querySelector('.about-photo img'),
    d.querySelector('.photo-chip'),
    d.querySelector('.photo-card'),
    d.querySelector('.orbit')
  ].filter(Boolean);
  const renderScrollMotion=()=>{
    const y=scrollY;
    const delta=y-lastScroll;
    if(header&&!body.classList.contains('menu-open')&&!body.classList.contains('modal-open')){
      if(y>180&&delta>7)header.classList.add('nav-hidden');
      if(delta<-5||y<100)header.classList.remove('nav-hidden');
    }
    if(fine){
      depthItems.forEach((el,index)=>{
        const rect=el.getBoundingClientRect();
        if(rect.bottom<0||rect.top>innerHeight)return;
        const center=rect.top+rect.height/2-innerHeight/2;
        const speed=index<6?.026:.04;
        const amount=clamp(-center*speed,-20,20);
        el.style.translate=`0 ${amount.toFixed(2)}px`;
      });
    }
    lastScroll=y;
    ticking=false;
  };
  addEventListener('scroll',()=>{
    if(!reduced&&!ticking){ticking=true;requestAnimationFrame(renderScrollMotion)}
  },{passive:true});
  renderScrollMotion();

  /* Controlled 3D depth on cards. */
  if(fine&&!reduced){
    const tilt=(card,max)=>{
      card.addEventListener('pointermove',event=>{
        const r=card.getBoundingClientRect();
        const nx=(event.clientX-r.left)/r.width-.5;
        const ny=(event.clientY-r.top)/r.height-.5;
        card.style.setProperty('--tilt-x',`${(-ny*max).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y',`${(nx*max).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave',()=>{
        card.style.setProperty('--tilt-x','0deg');
        card.style.setProperty('--tilt-y','0deg');
      });
    };
    d.querySelectorAll('.project-card').forEach(card=>tilt(card,4));
    d.querySelectorAll('.service-card').forEach(card=>tilt(card,2.2));
  }

  /* Number count-up once visible. */
  if('IntersectionObserver'in window&&!reduced){
    const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target;
      const original=el.textContent.trim();
      const match=original.match(/^([0-9]+)(.*)$/);
      if(!match)return;
      const target=Number(match[1]);
      const suffix=match[2];
      const start=performance.now();
      const duration=900;
      const frame=now=>{
        const p=clamp((now-start)/duration,0,1);
        const eased=1-Math.pow(1-p,4);
        el.textContent=Math.round(target*eased)+suffix;
        if(p<1)requestAnimationFrame(frame);else el.textContent=original;
      };
      requestAnimationFrame(frame);
      countObserver.unobserve(el);
    }),{threshold:.65});
    d.querySelectorAll('.stat strong').forEach(el=>countObserver.observe(el));
  }

  /* Custom cursor with VIEW / DRAG states. */
  if(fine&&!reduced){
    const ring=d.getElementById('motionCursor');
    const dot=d.getElementById('motionCursorDot');
    const label=d.getElementById('motionCursorLabel');
    root.classList.add('motion-cursor-enabled');
    let mx=-100,my=-100,rx=-100,ry=-100;
    const cursorFrame=()=>{
      rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
      ring.style.transform=`translate3d(${rx-24}px,${ry-24}px,0)`;
      dot.style.transform=`translate3d(${mx-3}px,${my-3}px,0)`;
      requestAnimationFrame(cursorFrame);
    };
    requestAnimationFrame(cursorFrame);
    addEventListener('pointermove',event=>{
      mx=event.clientX;my=event.clientY;
      ring.classList.add('is-visible');dot.classList.add('is-visible');
    },{passive:true});
    d.addEventListener('pointerover',event=>{
      const target=event.target.closest('a,button,.project-card,.project-track,.portfolio-detail-card');
      ring.classList.toggle('is-active',!!target);
      const project=event.target.closest('.project-card,.portfolio-detail-card');
      const track=event.target.closest('.project-track');
      if(project){label.textContent='VIEW';ring.classList.add('has-label')}
      else if(track&&!event.target.closest('button')){label.textContent='DRAG';ring.classList.add('has-label')}
      else ring.classList.remove('has-label');
    });
    d.addEventListener('pointerout',event=>{
      if(!event.relatedTarget){ring.classList.remove('is-visible','is-active','has-label');dot.classList.remove('is-visible')}
    });
  }

  /* Project Unggulan: one project, six scroll-linked visual details. */
  const featuredSection=d.getElementById('featured-projects');
  if(featuredSection){
    const featuredFrames=[...featuredSection.querySelectorAll('[data-featured-frame]')];
    const featuredProgress=d.getElementById('featuredProgress');
    const featuredCurrent=d.getElementById('featuredCurrent');
    const featuredMobileGallery=featuredSection.querySelector('.featured-mobile-gallery');
    const featuredMobileTrack=featuredSection.querySelector('.featured-mobile-gallery-track');
    const featuredMobileProgress=featuredSection.querySelector('.featured-mobile-gallery-progress i');
    const featuredMobileCurrent=featuredSection.querySelector('[data-featured-mobile-current]');
    const featuredMobileScrub=matchMedia('(max-width:820px) and (min-height:560px)');
    let featuredTicking=false;
    let featuredStatic=false;
    let featuredMobileScrubActive=false;

    const setFeaturedStatic=()=>{
      if(featuredStatic)return;
      featuredStatic=true;
      featuredFrames.forEach((frame,index)=>{
        frame.style.transform=index===0?'none':'translateY(108%) rotate(3.2deg) scale(.955)';
        frame.style.clipPath=index===0?'inset(0)':'inset(100% 0 0 0)';
        frame.style.opacity=index===0?'1':'0';
      });
      if(featuredProgress)featuredProgress.style.transform='scaleX(0)';
      if(featuredCurrent)featuredCurrent.textContent='01';
    };

    const renderFeatured=()=>{
      featuredTicking=false;
      const mobileScrubEnabled=!reduced&&featuredMobileScrub.matches&&featuredMobileGallery&&featuredMobileTrack;
      featuredSection.classList.toggle('featured-mobile-scrub',!!mobileScrubEnabled);

      if(mobileScrubEnabled){
        featuredMobileScrubActive=true;
        setFeaturedStatic();
        const horizontal=Math.max(0,featuredMobileGallery.scrollWidth-featuredMobileGallery.clientWidth);
        const scrollDistance=Math.max(innerHeight*.9,horizontal*.72);
        const desiredHeight=innerHeight+scrollDistance;
        if(Math.abs(featuredSection.offsetHeight-desiredHeight)>2)featuredSection.style.height=`${desiredHeight}px`;
        const total=Math.max(1,featuredSection.offsetHeight-innerHeight);
        const progress=clamp(-featuredSection.getBoundingClientRect().top/total,0,1);
        const x=horizontal*progress;
        featuredMobileTrack.style.transform=`translate3d(${-x}px,0,0)`;
        if(featuredMobileProgress)featuredMobileProgress.style.transform=`scaleX(${Math.max(.08,progress).toFixed(4)})`;
        if(featuredMobileCurrent)featuredMobileCurrent.textContent=String(Math.min(6,Math.round(progress*5)+1)).padStart(2,'0');
        return;
      }

      if(featuredMobileScrubActive){
        featuredMobileScrubActive=false;
        featuredSection.style.removeProperty('height');
        featuredMobileTrack?.style.removeProperty('transform');
      }
      if(reduced||innerWidth<=820){setFeaturedStatic();return}
      featuredStatic=false;
      const rect=featuredSection.getBoundingClientRect();
      const travel=Math.max(1,featuredSection.offsetHeight-innerHeight);
      const progress=clamp(-rect.top/travel,0,1);
      const maxStep=Math.max(1,featuredFrames.length-1);
      const step=progress*maxStep;
      featuredSection.style.setProperty('--featured-progress',progress.toFixed(4));
      if(featuredProgress)featuredProgress.style.transform=`scaleX(${progress.toFixed(4)})`;
      if(featuredCurrent)featuredCurrent.textContent=String(Math.min(featuredFrames.length,Math.round(step)+1)).padStart(2,'0');

      featuredFrames.forEach((frame,index)=>{
        const distance=index-step;
        let y=0,scale=1,rotation=0,opacity=1,clip=0;
        if(distance>=1){y=108;scale=.955;rotation=3.2;opacity=0;clip=100}
        else if(distance>0){const enter=1-distance;y=distance*108;scale=.955+.045*enter;rotation=3.2*distance;opacity=.12+.88*enter;clip=distance*100}
        else if(distance>=-1){const leave=-distance;y=-11*leave;scale=1-.045*leave;rotation=-1.4*leave;opacity=1-.58*leave}
        else{y=-11;scale=.955;rotation=-1.4;opacity=.06}
        frame.style.transform=`translate3d(0,${y.toFixed(3)}%,0) rotate(${rotation.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
        frame.style.opacity=opacity.toFixed(3);
        frame.style.clipPath=`inset(${clip.toFixed(3)}% 0 0 0)`;
        const media=frame.querySelector('.featured-frame-media');
        if(media){
          const base=Number.parseFloat(getComputedStyle(frame).getPropertyValue('--featured-image-scale'))||1.075;
          const focus=Math.max(0,Math.min(1,1-Math.abs(distance)));
          media.style.transform=`scale(${(base-.045*focus).toFixed(4)}) translate3d(0,${(-distance*1.4).toFixed(2)}%,0)`;
        }
      });
    };
    const queueFeatured=()=>{if(featuredTicking)return;featuredTicking=true;requestAnimationFrame(renderFeatured)};
    addEventListener('scroll',queueFeatured,{passive:true});
    addEventListener('resize',queueFeatured,{passive:true});
    renderFeatured();

    if(featuredMobileGallery&&featuredMobileProgress){
      const updateMobileFeatured=()=>{
        const max=Math.max(1,featuredMobileGallery.scrollWidth-featuredMobileGallery.clientWidth);
        const progress=featuredMobileGallery.scrollLeft/max;
        featuredMobileProgress.style.transform=`scaleX(${Math.max(.08,progress).toFixed(4)})`;
        if(featuredMobileCurrent)featuredMobileCurrent.textContent=String(Math.min(6,Math.round(progress*5)+1)).padStart(2,'0');
      };
      featuredMobileGallery.addEventListener('scroll',updateMobileFeatured,{passive:true});
      updateMobileFeatured();
    }
  }

  /* Keep anchor navigation smooth while respecting reduced-motion. */
  d.addEventListener('click',event=>{
    const anchor=event.target.closest('a[href^="#"]');
    if(!anchor)return;
    const id=anchor.getAttribute('href');
    if(id==='#')return;
    const target=d.querySelector(id);
    if(!target)return;
    event.preventDefault();
    target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    history.replaceState(null,'',id);
  });
})();

export {};
