/* ============================================================
   HMG Concepts — shared interactions (no external libraries,
   no AI APIs, no tracking). Pure vanilla JS.
   ============================================================ */
(function(){
  "use strict";

  /* ---------- THEME ENGINE (light/dark, persisted) ---------- */
  const root=document.documentElement;
  const THEME_KEY='hmg_theme';
  function applyTheme(t){
    root.setAttribute('data-theme',t);
    document.querySelectorAll('[data-theme-icon]').forEach(el=>{el.textContent=t==='light'?'🌙':'☀️';});
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content',t==='light'?'#f4f6fe':'#070b22');
  }
  // Initial: saved > system preference > dark
  const saved=localStorage.getItem(THEME_KEY);
  const prefersLight=window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight?'light':'dark'));
  document.querySelectorAll('[data-theme-btn]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const next=root.getAttribute('data-theme')==='light'?'dark':'light';
      applyTheme(next);localStorage.setItem(THEME_KEY,next);
    });
  });

  /* ---------- MOBILE NAV ---------- */
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links){
    toggle.addEventListener('click',()=>{
      links.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');document.body.classList.remove('nav-open');
    }));
  }

  /* ---------- ANNOUNCEMENT BAR ---------- */
  const bar=document.querySelector('.topbar');
  if(bar){
    if(localStorage.getItem('hmg_announce')==='closed') bar.classList.add('hide');
    const x=bar.querySelector('.close');
    if(x) x.addEventListener('click',()=>{bar.classList.add('hide');localStorage.setItem('hmg_announce','closed');});
  }

  /* ---------- COOKIE / STORAGE NOTICE ---------- */
  const notice=document.querySelector('.notice');
  if(notice){
    if(localStorage.getItem('hmg_notice')==='ok') notice.classList.add('hide');
    const ok=notice.querySelector('button');
    if(ok) ok.addEventListener('click',()=>{notice.classList.add('hide');localStorage.setItem('hmg_notice','ok');});
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters=document.querySelectorAll('[data-count]');
  if(counters.length){
    const cObs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(!e.isIntersecting) return;
        const el=e.target;const target=parseFloat(el.dataset.count);
        const suffix=el.dataset.suffix||'';const prefix=el.dataset.prefix||'';
        let cur=0;const steps=45;const inc=target/steps;
        const t=setInterval(()=>{
          cur+=inc;
          if(cur>=target){cur=target;clearInterval(t);}
          el.textContent=prefix+(Number.isInteger(target)?Math.floor(cur):cur.toFixed(0))+suffix;
        },22);
        cObs.unobserve(el);
      });
    },{threshold:.5});
    counters.forEach(c=>cObs.observe(c));
  }

  /* ---------- READING PROGRESS BAR ---------- */
  const prog=document.querySelector('.progress-bar');
  if(prog){
    const upd=()=>{
      const h=document.documentElement;
      const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight);
      prog.style.width=(scrolled*100).toFixed(1)+'%';
    };
    window.addEventListener('scroll',upd,{passive:true});upd();
  }

  /* ---------- SCROLL-TO-TOP ---------- */
  const top=document.querySelector('.scroll-top');
  if(top){
    window.addEventListener('scroll',()=>{top.classList.toggle('show',window.scrollY>520);},{passive:true});
    top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  /* ---------- TESTIMONIALS CAROUSEL ---------- */
  document.querySelectorAll('.tcar').forEach(car=>{
    const track=car.querySelector('.tcar-track');
    const prev=car.querySelector('[data-tcar="prev"]');
    const next=car.querySelector('[data-tcar="next"]');
    if(!track) return;
    const step=()=>Math.min(track.clientWidth*.85,400);
    if(prev) prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
    if(next) next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
    // gentle auto-advance, pauses on hover
    let timer=setInterval(auto,5500);
    function auto(){
      if(track.scrollLeft+track.clientWidth>=track.scrollWidth-5){track.scrollTo({left:0,behavior:'smooth'});}
      else{track.scrollBy({left:step(),behavior:'smooth'});}
    }
    car.addEventListener('mouseenter',()=>clearInterval(timer));
    car.addEventListener('mouseleave',()=>{timer=setInterval(auto,5500);});
  });

  /* ---------- CONTACT FORM -> WhatsApp (no backend, no cost) ---------- */
  const form=document.querySelector('#enquiryForm');
  if(form){
    form.addEventListener('submit',(ev)=>{
      ev.preventDefault();
      const f=new FormData(form);
      const name=(f.get('name')||'').toString().trim();
      const role=(f.get('role')||'').toString();
      const subject=(f.get('subject')||'').toString();
      const email=(f.get('email')||'').toString().trim();
      const phone=(f.get('phone')||'').toString().trim();
      const msg=(f.get('message')||'').toString().trim();
      const msgBox=form.querySelector('.form-msg');
      if(!name||msg.length<10){
        alert('Please add your name and a message of at least 10 characters.');return;
      }
      const text=
        `Hello HMG Concepts!%0A%0A`+
        `Name: ${encodeURIComponent(name)}%0A`+
        `Role: ${encodeURIComponent(role)}%0A`+
        `Subject: ${encodeURIComponent(subject)}%0A`+
        `Email: ${encodeURIComponent(email)}%0A`+
        `Phone: ${encodeURIComponent(phone)}%0A%0A`+
        `${encodeURIComponent(msg)}`;
      window.open(`https://wa.me/2348100866322?text=${text}`,'_blank');
      if(msgBox){msgBox.classList.add('show','ok');msgBox.textContent='✓ Opening WhatsApp with your message ready to send…';}
      form.reset();
    });
  }

  /* ---------- NEWSLETTER (mailto, no backend) ---------- */
  const news=document.querySelector('#newsForm');
  if(news){
    news.addEventListener('submit',(ev)=>{
      ev.preventDefault();
      const email=(new FormData(news).get('email')||'').toString().trim();
      if(!email){return;}
      const subject=encodeURIComponent('Subscribe me to HMG Concepts updates');
      const body=encodeURIComponent('Please add this email to the HMG Concepts community list: '+email);
      window.location.href=`mailto:hismarvellousgrace@gmail.com?subject=${subject}&body=${body}`;
      const m=news.querySelector('.form-msg');
      if(m){m.classList.add('show','ok');m.textContent='✓ Thank you! Your email app is opening to confirm.';}
      news.reset();
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  /* ---------- ACTIVE NAV (auto-highlight by filename) ---------- */
  const path=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path || (path==='' && href==='index.html')) a.classList.add('active');
  });
})();
