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

  const onScroll=()=>{
    const max=d.documentElement.scrollHeight-innerHeight;
    const ratio=max>0?scrollY/max:0;
    progress.style.transform=`scaleX(${ratio})`;
    header.classList.toggle('scrolled',scrollY>18);
  };
  onScroll(); addEventListener('scroll',onScroll,{passive:true});

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

  const projects={
    school:{kicker:'FULL-STACK · EDUCATION · RFID',title:'Platform Operasi Akademik Terintegrasi',summary:'Platform modular yang menyatukan banyak proses akademik dan perangkat RFID ke dalam satu alur.',problem:'Presensi, tugas, quiz, data siswa, laporan, dan perangkat RFID mudah membentuk silo. Operator berpindah konteks, data sulit dilacak, dan error tidak memiliki jejak konsisten.',approach:'Laravel 13 digunakan sebagai API domain, Next.js sebagai frontend, PostgreSQL sebagai sumber data relasional, Redis untuk cache dan runtime, serta MQTT untuk event perangkat RFID.',arch:['RFID / Web Client','MQTT / HTTPS','Laravel 13 API','Queue & Redis','PostgreSQL','Next.js Dashboard','Observability'],decisions:['Arsitektur modular menjaga domain akademik tetap terpisah tetapi konsisten.','Typed API client mengurangi drift kontrak frontend-backend.','X-Request-ID, Problem Details, idempotency, dan tenant scope memudahkan keamanan serta debugging.'],limits:'Platform masih berkembang. Klaim skala produksi belum ditampilkan sebelum ada runtime benchmark yang dapat diverifikasi.',next:'Menyelesaikan E2E runtime, load test, security regression, observability dashboard, dan OpenAPI penuh.'},
    cog:{kicker:'VOICE AI · MCP · EMBEDDED',title:'COG AI — Asisten Suara Modular',summary:'Eksperimen asisten suara berbasis perangkat yang terhubung ke model AI dan tool eksternal.',problem:'Voice assistant tertutup sulit dihubungkan dengan workflow atau tool buatan sendiri.',approach:'ESP32 menangani perangkat dan input dasar, sedangkan FastAPI menjadi jembatan ke model AI serta MCP server.',arch:['Microphone / Input','ESP32 Device','Network Gateway','FastAPI Service','AI Model','MCP Tools','Audio / Action Output'],decisions:['FastAPI efektif untuk layanan AI asynchronous.','MCP memisahkan model dari tool agar kapabilitas dapat diperluas.','Perangkat dan layanan AI dipisah supaya keterbatasan embedded tidak menjadi bottleneck utama.'],limits:'Masih berupa prototype. Latensi, privasi audio, fallback offline, dan keamanan tool perlu pengujian.',next:'Menambahkan autentikasi perangkat, permission per tool, streaming audio stabil, dan observability.'},
    energy:{kicker:'IOT · ENERGY · AUTOMATION',title:'Monitoring & Otomasi Energi',summary:'Sistem untuk memberi visibilitas konsumsi listrik dan mengendalikan beban berdasarkan aturan.',problem:'Pengguna sering baru mengetahui konsumsi setelah tagihan diterima dan tidak memiliki kontrol otomatis berbasis kondisi.',approach:'Sensor energi mengirim telemetry melalui ESP32, disimpan untuk histori, lalu aturan jadwal atau fuzzy logic dapat memicu relay.',arch:['PZEM / Sensor','ESP32','MQTT / Firebase','Monitoring API','Database','Rule / Fuzzy Logic','Relay / Load'],decisions:['Komunikasi real-time menghindari polling agresif.','Kontrol relay dipisahkan dari dashboard.','Fuzzy logic digunakan saat keputusan tidak cukup direpresentasikan oleh kondisi biner.'],limits:'Instalasi tegangan tinggi memerlukan proteksi dan review keselamatan oleh pihak berkualifikasi.',next:'Menguji akurasi sensor, fail-safe relay, local broker, audit event, dan mode offline.'},
    library:{kicker:'PUBLIC SERVICE · INTERNSHIP',title:'Digitalisasi Layanan Perpustakaan',summary:'Digitalisasi registrasi pengunjung dan peminjaman untuk mengurangi ketergantungan pada pencatatan manual.',problem:'Alur pengunjung, peminjaman, dan rekap masih manual atau terpisah sehingga penelusuran menjadi lambat.',approach:'Menyusun alur terintegrasi untuk registrasi, peminjaman, data anggota, dan administrasi perpustakaan.',arch:['Pengunjung / Petugas','Form Registrasi','Aplikasi Layanan','Database Anggota','Integrasi SLiMS','Rekap / Laporan'],decisions:['Alur mengikuti proses petugas agar digitalisasi tidak menambah beban.','Validasi ditempatkan dekat input untuk mengurangi koreksi.','Integrasi diprioritaskan dibanding membuat sumber data kedua.'],limits:'Detail integrasi harus menyesuaikan otorisasi dan kebijakan data instansi.',next:'Melengkapi audit trail, usability testing, backup, dan dokumentasi operasional.'},
    cctv:{kicker:'COMPUTER VISION · REAL-TIME',title:'Smart CCTV Tracker',summary:'Eksplorasi pipeline kamera, tracking, dan notifikasi untuk membuat pemantauan lebih aktif.',problem:'CCTV tradisional lebih banyak berfungsi sebagai rekaman pasif.',approach:'Sumber video mengirim stream ke server pemrosesan. Computer vision melakukan deteksi atau tracking, lalu event tertentu menghasilkan notifikasi.',arch:['ESP32-CAM','Streaming Server','Vision Pipeline','Object Tracking','Event Rules','Notification','Operator Review'],decisions:['Pemrosesan dipindahkan ke server karena perangkat kamera terbatas.','Tracking mengikuti objek, bukan menyimpulkan niat atau identitas.','Notifikasi tetap memerlukan verifikasi manusia.'],limits:'Akurasi dipengaruhi pencahayaan, sudut, occlusion, jaringan, dan dataset.',next:'Menguji false positive, privacy masking, threshold, dan dashboard review manusia.'},
    weather:{kicker:'IOT · WEATHER API · ANALYTICS',title:'Monitoring & Prediksi Cuaca IoT',summary:'Platform yang menggabungkan sensor lokal dan data cuaca eksternal untuk monitoring serta analitik.',problem:'Data lingkungan tersebar antara sensor lokal dan layanan cuaca online.',approach:'Sensor mengirim data melalui ESP32 ke API, lalu platform menggabungkan telemetry dengan weather API dan histori.',arch:['Environmental Sensors','ESP32','Monitoring API','Weather API','PostgreSQL','Analytics','Dashboard'],decisions:['Sensor lokal mempertahankan konteks lokasi.','Database relasional cukup untuk fase awal time-series.','Model prediksi baru dipilih setelah kualitas data dan target jelas.'],limits:'Akurasi ML belum diklaim karena memerlukan dataset, baseline, dan evaluasi.',next:'Menentukan target prediksi, data quality checks, baseline statistik, dan visualisasi uncertainty.'}
  };

  const projectView=d.getElementById('projectView');
  const casePage=d.getElementById('casePage');
  const caseContent=d.getElementById('caseContent');
  const curtain=d.getElementById('projectCurtain');
  const siteMain=d.querySelector('body > main');
  const projectOrder=['school','cog','energy','library','cctv','weather'];
  const projectMeta={
    school:{role:'System Architect & Full-Stack Engineer',timeline:'2026 — Ongoing',status:'Developed / Evolving',art:'art-school'},
    cog:{role:'AI & Embedded Engineer',timeline:'2026 — Prototype',status:'Prototype / Integrated',art:'art-cog'},
    energy:{role:'IoT Systems Engineer',timeline:'2025 — Prototype',status:'Designed / Prototype',art:'art-energy'},
    library:{role:'System Analyst & Developer',timeline:'Internship Project',status:'Internship / Developed',art:'art-library'},
    cctv:{role:'Computer Vision Engineer',timeline:'2025 — Exploration',status:'Explored / Prototype',art:'art-cctv'},
    weather:{role:'IoT & Data Engineer',timeline:'2025 — Developed',status:'Developed / Explored',art:'art-weather'}
  };
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

  const renderCase=(key)=>{
    const p=projects[key];
    const meta=projectMeta[key];
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
      <section class="case-visual-shell" aria-label="Visual proyek">
        <div class="case-visual"><div class="project-art ${meta.art}"></div><div class="case-visual-overlay"></div><span class="case-visual-label">${meta.status}</span></div>
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
        <section class="case-architecture case-reveal">
          <div class="case-section-head"><p class="case-section-label">System architecture</p><div><h3>Dari input hingga hasil yang dapat ditindaklanjuti.</h3><p>Arsitektur ditampilkan sebagai alur komponen utama agar hubungan perangkat, layanan, data, dan pengguna mudah dipahami.</p></div></div>
          <ol class="case-flow">${p.arch.map((item,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><strong>${item}</strong></li>`).join('')}</ol>
        </section>
        <section class="case-decisions case-reveal">
          <div><p class="case-section-label">Engineering decisions</p><h3 class="case-lead">Keputusan yang menjaga sistem tetap terstruktur.</h3></div>
          <ol class="case-decision-list">${p.decisions.map(item=>`<li>${item}</li>`).join('')}</ol>
        </section>
        <section class="case-status case-reveal">
          <article><p class="case-section-label">Current limitations</p><h3>Batasan saat ini</h3><p>${p.limits}</p></article>
          <article><p class="case-section-label">Next iteration</p><h3>Langkah berikutnya</h3><p>${p.next}</p><div class="case-actions"><a class="btn btn-dark" href="[PROJECT_URL]">Repository / Demo <span class="arrow">↗</span></a><button class="btn" type="button" data-close-project>Kembali</button></div></article>
        </section>
      </div>
      <button class="case-next" type="button" data-next-project="${nextKey}"><span class="case-next-inner"><span><span class="case-next-label">Next Project</span><span class="case-next-title">${next.title}</span></span><span class="case-next-arrow">↗</span></span></button>`;
    caseContent.querySelectorAll('[data-close-project]').forEach(btn=>btn.addEventListener('click',closeProject));
    caseContent.querySelector('[data-next-project]')?.addEventListener('click',event=>openProject(event.currentTarget.dataset.nextProject,event.currentTarget,true));
    initCaseReveal();
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
