// @ts-nocheck
/* Preserved from the approved single-file portfolio.
   Isolated so the visual behavior remains unchanged while future modules can be typed incrementally. */
(()=>{
  'use strict';
  const d=document;
  const body=d.body;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=d.getElementById('siteHeader');
  const progress=d.getElementById('scrollProgress');

  addEventListener('load',()=>requestAnimationFrame(()=>body.classList.add('page-ready')),{once:true});
  if(d.readyState==='complete') body.classList.add('page-ready');

  let coreScrollFrame=0;
  const onScroll=()=>{
    coreScrollFrame=0;
    const max=d.documentElement.scrollHeight-innerHeight;
    const ratio=max>0?scrollY/max:0;
    progress.style.transform=`scaleX(${ratio})`;
    header.classList.toggle('scrolled',scrollY>18);
  };
  const queueCoreScroll=()=>{if(!coreScrollFrame)coreScrollFrame=requestAnimationFrame(onScroll)};
  onScroll(); addEventListener('scroll',queueCoreScroll,{passive:true});

  const menuBtn=d.getElementById('menuBtn');
  const mobileMenu=d.getElementById('mobileMenu');
  const setMenu=open=>{
    menuBtn.setAttribute('aria-expanded',String(open));
    mobileMenu.classList.toggle('open',open);
    mobileMenu.setAttribute('aria-hidden',String(!open));
    body.classList.toggle('menu-open',open);
  };
  menuBtn.addEventListener('click',()=>setMenu(menuBtn.getAttribute('aria-expanded')!=='true'));
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

  if('IntersectionObserver'in window){
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
    }),{threshold:.13,rootMargin:'0px 0px -8% 0px'});
    d.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el));

    const navLinks=[...d.querySelectorAll('#desktopNav a')];
    const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
    }),{rootMargin:'-36% 0px -55% 0px',threshold:0});
    d.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
  }else d.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'));

  if(!reduced){
    d.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.16}px)`;
      });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  const track=d.getElementById('projectTrack');
  let dragging=false,startX=0,startScroll=0;
  if(track){
    const trackProgress=d.getElementById('projectProgress');
    const updateTrackProgress=()=>{
      const max=track.scrollWidth-track.clientWidth;
      const ratio=max>0?track.scrollLeft/max:0;
      if(trackProgress) trackProgress.style.transform=`scaleX(${Math.max(.08,ratio)})`;
    };
    d.getElementById('prevProject')?.addEventListener('click',()=>track.scrollBy({left:-Math.min(540,track.clientWidth*.86),behavior:'smooth'}));
    d.getElementById('nextProject')?.addEventListener('click',()=>track.scrollBy({left:Math.min(540,track.clientWidth*.86),behavior:'smooth'}));
    track.addEventListener('scroll',updateTrackProgress,{passive:true});
    updateTrackProgress();
    track.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('dragging');track.setPointerCapture(e.pointerId)});
    track.addEventListener('pointermove',e=>{if(!dragging)return;track.scrollLeft=startScroll-(e.clientX-startX)*1.2});
    const stopDrag=e=>{if(!dragging)return;dragging=false;track.classList.remove('dragging');try{track.releasePointerCapture(e.pointerId)}catch{}};
    track.addEventListener('pointerup',stopDrag);track.addEventListener('pointercancel',stopDrag);
  }

  d.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const open=!item.classList.contains('open');
    d.querySelectorAll('.faq-item.open').forEach(other=>{if(other!==item){other.classList.remove('open');other.querySelector('.faq-question').setAttribute('aria-expanded','false')}});
    item.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));
  }));

  const projectCatalogNode=d.getElementById('projectCatalog');
  let projectEntries=[];
  try{projectEntries=JSON.parse(projectCatalogNode?.textContent||'[]')}
  catch(error){console.error('Project catalog could not be parsed.',error)}

  const projects=Object.fromEntries(projectEntries.map(project=>[
    project.key,
    {
      kicker:project.presentation.kicker,
      title:project.title,
      repos:project.repositories||[project.repository&&{label:'Repository',url:project.repository,scope:'Source project'}].filter(Boolean),
      technologies:project.technologies,
      summary:project.overview,
      problem:project.caseStudy.problem,
      approach:project.caseStudy.approach,
      functions:project.caseStudy.functions,
      workflow:project.caseStudy.workflow,
      arch:project.caseStudy.architecture,
      decisions:project.caseStudy.decisions,
      limits:project.caseStudy.limitations,
      next:project.caseStudy.nextIteration
    }
  ]));

  const projectView=d.getElementById('projectView');
  const casePage=d.getElementById('casePage');
  const caseContent=d.getElementById('caseContent');
  const curtain=d.getElementById('projectCurtain');
  const siteMain=d.querySelector('body > main');
  const projectOrder=projectEntries.map(project=>project.key);
  const projectMeta=Object.fromEntries(projectEntries.map(project=>[
    project.key,
    {
      role:project.presentation.role,
      timeline:project.presentation.timeline,
      status:project.presentation.projectStatus,
      art:project.presentation.caseArtClass
    }
  ]));
  const projectGallery=Object.fromEntries(projectEntries.map(project=>[
    project.key,
    project.gallery.labels
  ]));
  const projectMedia=Object.fromEntries(projectEntries.map(project=>[
    project.key,
    {
      manifest:project.gallery.manifest,
      title:project.gallery.title||project.title,
      featured:project.featured,
      featuredImages:project.gallery.featuredImages||[]
    }
  ]));
  let lastFocus=null;
  let activeProject=null;
  let projectBusy=false;
  let caseObserver=null;

  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const playCurtain=async(onCovered,title,index)=>{
    const count=String(index+1).padStart(2,'0')+' / '+String(projectOrder.length).padStart(2,'0');
    d.getElementById('projectCurtainTitle').textContent=title;
    d.getElementById('projectCurtainCount').textContent=count;
    projectView.classList.add('is-transitioning');
    if(reduced||!curtain.animate){onCovered();projectView.classList.remove('is-transitioning');return;}
    curtain.style.transform='translateY(100%)';
    await curtain.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:620,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}).finished;
    onCovered();
    await wait(45);
    await curtain.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:720,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'}).finished;
    curtain.style.transform='translateY(100%)';
    projectView.classList.remove('is-transitioning');
  };

  const initCaseReveal=()=>{
    caseObserver?.disconnect();
    const elements=[...caseContent.querySelectorAll('.case-reveal')];
    if(reduced||!('IntersectionObserver'in window)){elements.forEach(el=>el.classList.add('is-visible'));return;}
    caseObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');caseObserver.unobserve(entry.target)}
    }),{root:casePage,threshold:.14,rootMargin:'0px 0px -8% 0px'});
    elements.forEach(el=>caseObserver.observe(el));
  };

  const initCaseGallery=()=>{
    const gallery=caseContent.querySelector('[data-case-gallery]');
    if(!gallery)return;
    const track=gallery.querySelector('.case-gallery-track');
    const slides=[...gallery.querySelectorAll('.case-gallery-slide')];
    const current=gallery.querySelector('[data-case-gallery-current]');
    const buttons=[...gallery.querySelectorAll('[data-case-gallery-go]')];
    let active=0;
    const applySlideLayout=slide=>{
      const image=slide.querySelector('.case-gallery-image');
      if(!image){
        gallery.dataset.mediaOrientation='landscape';
        gallery.style.removeProperty('--case-gallery-aspect');
        gallery.style.removeProperty('--case-gallery-max-width');
        gallery.style.removeProperty('--case-gallery-mobile-max-width');
        return;
      }
      const update=()=>{
        const width=Number(image.getAttribute('width'))||image.naturalWidth;
        const height=Number(image.getAttribute('height'))||image.naturalHeight;
        if(!width||!height)return;
        const ratio=width/height;
        const orientation=ratio>1.15?'landscape':ratio<.9?'portrait':'square';
        gallery.dataset.mediaOrientation=orientation;
        gallery.style.setProperty('--case-gallery-aspect',`${width} / ${height}`);
        gallery.style.setProperty('--case-gallery-max-width',`${Math.min(1440,Math.round(720*ratio))}px`);
        gallery.style.setProperty('--case-gallery-mobile-max-width',`${Math.round(570*ratio)}px`);
      };
      if(image.complete||image.hasAttribute('width'))update();
      else image.addEventListener('load',update,{once:true});
    };
    const render=index=>{
      active=(index+slides.length)%slides.length;
      applySlideLayout(slides[active]);
      track.style.transform=`translateX(-${active*100}%)`;
      current.textContent=String(active+1).padStart(2,'0');
      buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
    };
    gallery.querySelector('[data-case-gallery-prev]').addEventListener('click',()=>render(active-1));
    gallery.querySelector('[data-case-gallery-next]').addEventListener('click',()=>render(active+1));
    buttons.forEach((button,index)=>button.addEventListener('click',()=>render(index)));
    gallery.addEventListener('keydown',event=>{
      if(event.key==='ArrowLeft'){event.preventDefault();render(active-1)}
      if(event.key==='ArrowRight'){event.preventDefault();render(active+1)}
    });
    let pointerStart=null;
    gallery.addEventListener('pointerdown',event=>{pointerStart=event.clientX});
    gallery.addEventListener('pointerup',event=>{
      if(pointerStart===null)return;
      const distance=event.clientX-pointerStart;
      pointerStart=null;
      if(Math.abs(distance)>42)render(active+(distance<0?1:-1));
    });
    gallery.addEventListener('pointercancel',()=>{pointerStart=null});
    render(0);
  };

  const renderProjectPhotoGallery=(key,title,items)=>{
    if(activeProject!==key||!items.length)return;
    const gallery=caseContent.querySelector('[data-case-gallery]');
    if(!gallery)return;
    const total=String(items.length).padStart(2,'0');
    gallery.setAttribute('aria-label',`Galeri ${items.length} foto ${title}`);
    gallery.querySelector('.case-gallery-track').innerHTML=items.map((item,index)=>`<figure class="case-gallery-slide case-gallery-slide--photo"><img class="case-gallery-image" src="${item.src}" alt="${item.alt}" width="${item.width||''}" height="${item.height||''}" loading="${index===0?'eager':'lazy'}" decoding="async"/><figcaption><span>${String(index+1).padStart(2,'0')} / ${total}</span><strong>${title}</strong></figcaption></figure>`).join('');
    gallery.querySelector('.case-gallery-progress').innerHTML=`<span data-case-gallery-current>01</span><i></i><span>${total}</span>`;
    gallery.querySelector('.case-gallery-dots').innerHTML=items.map((item,index)=>`<button data-case-gallery-go type="button" aria-label="Lihat foto ${index+1}" aria-pressed="${index===0}"></button>`).join('');
    initCaseGallery();
  };

  const loadProjectMedia=key=>{
    const mediaConfig=projectMedia[key];
    if(!mediaConfig?.manifest)return Promise.resolve();
    return fetch(mediaConfig.manifest)
      .then(response=>response.ok?response.json():null)
      .then(manifest=>{
        const items=manifest?.items||[];
        if(!items.length)return;
        if(mediaConfig.featured){
          const selectedItems=mediaConfig.featuredImages
            .map(name=>items.find(item=>item.src.endsWith(`/${name}`)))
            .filter(Boolean);
          const featuredSources=selectedItems.length?selectedItems:items;
          const featured=d.querySelector('.featured-showcase--xiaozhi');
          featured?.querySelectorAll('.featured-frame-media,.featured-mobile-gallery-media').forEach((media,index)=>{
            const item=featuredSources[index%featuredSources.length];
            media.style.setProperty('--featured-image',`url("${item.src}")`);
          });
        }
        renderProjectPhotoGallery(key,mediaConfig.title,items);
      })
      .catch(()=>{});
  };
  const featuredMediaKey=projectOrder.find(key=>projectMedia[key]?.featured);
  if(featuredMediaKey)loadProjectMedia(featuredMediaKey);

  const renderCase=(key)=>{
    const p=projects[key];
    const meta=projectMeta[key];
    const gallery=projectGallery[key];
    const index=projectOrder.indexOf(key);
    const nextKey=projectOrder[(index+1)%projectOrder.length];
    const next=projects[nextKey];
    activeProject=key;
    d.getElementById('caseIndex').textContent=`Project ${String(index+1).padStart(2,'0')} / ${String(projectOrder.length).padStart(2,'0')}`;
    caseContent.innerHTML=`
      <header class="case-hero">
        <div class="container">
          <p class="case-kicker">${p.kicker}</p>
          <div class="case-title-grid">
            <h2 class="case-title" id="caseTitle">${p.title}</h2>
            <dl class="case-meta">
              <div><dt>My Role</dt><dd>${meta.role}</dd></div>
              <div><dt>Timeline</dt><dd>${meta.timeline}</dd></div>
              <div><dt>Project Status</dt><dd>${meta.status}</dd></div>
            </dl>
          </div>
        </div>
      </header>
      <section class="case-visual-shell" aria-label="Galeri visual proyek">
        <div class="case-visual case-gallery" data-case-gallery tabindex="0" aria-roledescription="carousel" aria-label="Empat visual ${p.title}">
          <div class="case-gallery-track">${gallery.map((label,i)=>`<figure class="case-gallery-slide case-gallery-slide--${i+1}"><div class="project-art ${meta.art}"></div><figcaption><span>${String(i+1).padStart(2,'0')} / 04</span><strong>${label}</strong></figcaption></figure>`).join('')}</div>
          <div class="case-visual-overlay"></div>
          <div class="case-gallery-controls"><button class="case-gallery-arrow" data-case-gallery-prev type="button" aria-label="Visual sebelumnya">&larr;</button><div class="case-gallery-progress"><span data-case-gallery-current>01</span><i></i><span>04</span></div><button class="case-gallery-arrow" data-case-gallery-next type="button" aria-label="Visual berikutnya">&rarr;</button></div>
          <div class="case-gallery-dots" aria-label="Pilih visual">${gallery.map((label,i)=>`<button data-case-gallery-go type="button" aria-label="Lihat ${label}" aria-pressed="${i===0}"></button>`).join('')}</div>
        </div>
      </section>
      <div class="case-article">
        <section class="case-opening case-reveal">
          <p class="case-section-label">Project overview</p>
          <div><p class="case-lead">Sistem dirancang bukan sekadar menjadi antarmuka, tetapi untuk menyelesaikan alur operasional secara end-to-end.</p><p class="case-copy">${p.summary} ${p.problem}</p></div>
        </section>
        <section class="case-content-grid case-reveal">
          <article class="case-content-block"><span>01 / Challenge</span><h3>Masalah yang perlu diselesaikan</h3><p>${p.problem}</p></article>
          <article class="case-content-block"><span>02 / Approach</span><h3>Pendekatan sistem</h3><p>${p.approach}</p></article>
        </section>
        <section class="case-functions case-reveal">
          <div class="case-section-head"><p class="case-section-label">Fungsi utama</p><div><h3>Apa yang dilakukan sistem.</h3><p>Fungsi berikut berasal dari fitur dan alur yang benar-benar tersedia pada source proyek.</p></div></div>
          <div class="case-function-list">${p.functions.map((item,i)=>`<article class="case-function-item"><span>${String(i+1).padStart(2,'0')}</span><h4>${item.title}</h4><p>${item.description}</p></article>`).join('')}</div>
        </section>
        <section class="case-workflow case-reveal">
          <div class="case-section-head"><p class="case-section-label">Cara kerja</p><div><h3>Alur saat sistem digunakan.</h3><p>Langkah ini menunjukkan perjalanan input, validasi, pemrosesan, penyimpanan, hingga hasil yang diterima pengguna atau perangkat.</p></div></div>
          <ol class="case-workflow-list">${p.workflow.map((item,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><div><strong>${item.title}</strong><p>${item.description}</p></div></li>`).join('')}</ol>
        </section>
        <section class="case-architecture case-reveal">
          <div class="case-section-head"><p class="case-section-label">System architecture</p><div><h3>Dari input hingga hasil yang dapat ditindaklanjuti.</h3><p>Arsitektur ditampilkan sebagai alur komponen utama agar hubungan perangkat, layanan, data, dan pengguna mudah dipahami.</p></div></div>
          <ol class="case-flow">${p.arch.map((item,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><strong>${item}</strong></li>`).join('')}</ol>
        </section>
        <section class="case-decisions case-reveal">
          <div><p class="case-section-label">Engineering decisions</p><h3 class="case-lead">Keputusan yang menjaga sistem tetap terstruktur.</h3></div>
          <ol class="case-decision-list">${p.decisions.map(item=>`<li>${item}</li>`).join('')}</ol>
        </section>
        <section class="case-stack case-reveal">
          <div class="case-section-head"><p class="case-section-label">Technology stack</p><div><h3>Teknologi yang benar-benar digunakan.</h3><p>Stack dirangkum dari manifest dependency, konfigurasi runtime, dan source pada repository proyek.</p></div></div>
          <ul class="case-tech-list">${p.technologies.map(item=>`<li>${item}</li>`).join('')}</ul>
        </section>
        <section class="case-repositories case-reveal">
          <div class="case-section-head"><p class="case-section-label">Source repositories</p><div><h3>Repository dan tanggung jawabnya.</h3><p>Setiap tautan mengarah ke source yang sesuai dengan bagian sistem yang dijelaskan.</p></div></div>
          <div class="case-repository-list">${p.repos.map(repo=>`<a class="case-repository-link" href="${repo.url}" target="_blank" rel="noreferrer"><span><strong>${repo.label}</strong><small>${repo.scope}</small></span><span class="case-repository-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
        </section>
        <section class="case-status case-reveal">
          <article><p class="case-section-label">Current limitations</p><h3>Batasan saat ini</h3><p>${p.limits}</p></article>
          <article><p class="case-section-label">Next iteration</p><h3>Langkah berikutnya</h3><p>${p.next}</p><div class="case-actions"><button class="btn btn-dark" type="button" data-close-project>Kembali</button></div></article>
        </section>
      </div>
      <button class="case-next" type="button" data-next-project="${nextKey}"><span class="case-next-inner"><span><span class="case-next-label">Next Project</span><span class="case-next-title">${next.title}</span></span><span class="case-next-arrow">↗</span></span></button>`;
    caseContent.querySelectorAll('[data-close-project]').forEach(btn=>btn.addEventListener('click',closeProject));
    caseContent.querySelector('[data-next-project]')?.addEventListener('click',event=>openProject(event.currentTarget.dataset.nextProject,event.currentTarget,true));
    initCaseGallery();
    initCaseReveal();
    loadProjectMedia(key);
  };

  async function openProject(key,trigger,isSwitch=false){
    if(projectBusy||!projects[key])return;
    projectBusy=true;
    if(!isSwitch)lastFocus=trigger;
    const index=projectOrder.indexOf(key);
    projectView.classList.add('is-mounted');
    projectView.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    header?.setAttribute('inert','');
    siteMain?.setAttribute('inert','');
    await playCurtain(()=>{
      projectView.classList.remove('is-ready');
      renderCase(key);
      casePage.scrollTop=0;
      projectView.classList.add('is-open');
    },isSwitch?'Loading next project':'Opening project',index);
    requestAnimationFrame(()=>requestAnimationFrame(()=>projectView.classList.add('is-ready')));
    setTimeout(()=>casePage.focus({preventScroll:true}),160);
    projectBusy=false;
  }

  async function closeProject(){
    if(projectBusy||!projectView.classList.contains('is-open'))return;
    projectBusy=true;
    const index=Math.max(0,projectOrder.indexOf(activeProject));
    await playCurtain(()=>{
      projectView.classList.remove('is-ready','is-open');
      body.classList.remove('modal-open');
      header?.removeAttribute('inert');
      siteMain?.removeAttribute('inert');
    },'Back to portfolio',index);
    projectView.classList.remove('is-mounted');
    projectView.setAttribute('aria-hidden','true');
    caseContent.innerHTML='';
    caseObserver?.disconnect();
    lastFocus?.focus({preventScroll:true});
    projectBusy=false;
  }

  d.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>openProject(btn.dataset.project,btn)));
  projectView.querySelectorAll('[data-close-project]').forEach(btn=>btn.addEventListener('click',closeProject));
  d.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(projectView.classList.contains('is-open'))closeProject();
      else if(mobileMenu.classList.contains('open'))setMenu(false);
    }
    if(e.key==='Tab'&&projectView.classList.contains('is-open')){
      const focusable=[...projectView.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>el.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&d.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&d.activeElement===last){e.preventDefault();first.focus()}
    }
  });

  const myToolsPanel=d.getElementById('myToolsPanel');
  const myToolsWrap=d.getElementById('my-tools');
  if(myToolsWrap&&!reduced){
    if('IntersectionObserver'in window){
      const toolsMotionObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>myToolsWrap.classList.toggle('tools-motion-visible',entry.isIntersecting));
      },{threshold:.01,rootMargin:'18% 0px'});
      toolsMotionObserver.observe(myToolsWrap);
    }else myToolsWrap.classList.add('tools-motion-visible');
  }
  if(myToolsPanel&&!reduced){
    let toolsRaf=0;
    myToolsPanel.addEventListener('pointermove',e=>{
      if(toolsRaf)return;
      toolsRaf=requestAnimationFrame(()=>{
        const r=myToolsPanel.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width)*100;
        const y=((e.clientY-r.top)/r.height)*100;
        myToolsPanel.style.setProperty('--tools-x',`${x}%`);
        myToolsPanel.style.setProperty('--tools-y',`${y}%`);
        toolsRaf=0;
      });
    });
    myToolsPanel.addEventListener('pointerleave',()=>{
      myToolsPanel.style.setProperty('--tools-x','50%');
      myToolsPanel.style.setProperty('--tools-y','50%');
    });
  }

})();

export {};
