/* ============================================================
   app.js — All logic. Reads from window.PORTFOLIO_CONFIG.
   ============================================================ */
'use strict';

const C = window.PORTFOLIO_CONFIG;

/* ── HELPERS ─────────────────────────────────────────────────── */
const $  = id  => document.getElementById(id);
const $$ = sel => [...document.querySelectorAll(sel)];
const esc = s  => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const el  = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html) e.innerHTML = html; return e; };

/* ── SEO & META (update from config) ────────────────────────── */
function initSEO() {
  const s = C.seo;
  document.title = s.title;
  const setMeta = (sel, val) => { const m = document.querySelector(sel); if(m) m.setAttribute(m.hasAttribute('content')?'content':'href', val); };
  setMeta('meta[name="description"]',       s.description);
  setMeta('meta[name="keywords"]',          s.keywords);
  setMeta('meta[property="og:title"]',      s.title);
  setMeta('meta[property="og:description"]',s.description);
  setMeta('meta[property="og:url"]',        s.url);
  setMeta('meta[property="og:image"]',      s.ogImage);
  setMeta('meta[name="twitter:title"]',     s.title);
  setMeta('meta[name="twitter:description"]',s.description);
  setMeta('meta[name="twitter:image"]',     s.ogImage);
  const canonical = document.querySelector('link[rel="canonical"]') || (() => { const l=document.createElement('link'); l.rel='canonical'; document.head.appendChild(l); return l; })();
  canonical.href = s.url;
}

/* ── NAV LOGO / FOOTER ───────────────────────────────────────── */
function initBranding() {
  $('nav-logo').innerHTML = `${C.initials}<span>_</span>`;
  $('footer-logo').textContent = C.initials + '_';
  $('footer-copy').textContent = `© ${new Date().getFullYear()} ${C.name.toUpperCase()} :: ALL SYSTEMS OPERATIONAL`;
}

/* ── HOME SECTION ────────────────────────────────────────────── */
function initHome() {
  $('hero-sub').textContent  = C.tagline;
  $('hero-desc').textContent = C.bio;
  $('cv-btn').href = C.cvPath;

  // Social row
  const sr = $('social-row');
  const icons = { github:'⌥', linkedin:'◈', discord:'◉', twitter:'◆', email:'◉' };
  Object.entries(C.social).forEach(([key, url]) => {
    const a = el('a', 'social-link');
    a.href = url; a.target='_blank'; a.rel='noopener noreferrer';
    a.setAttribute('aria-label', key);
    a.innerHTML = `<span aria-hidden="true">${icons[key]||'◉'}</span>${key.charAt(0).toUpperCase()+key.slice(1)}`;
    sr.appendChild(a);
  });
  if(C.email) {
    const a = el('a','social-link');
    a.href=`mailto:${C.email}`; a.setAttribute('aria-label','Email');
    a.innerHTML=`<span aria-hidden="true">✉</span>Email`;
    sr.appendChild(a);
  }

  // Terminal preview
  const tb = $('hero-terminal');
  const previewLines = [
    { type:'cmd', prompt:`navin@grid:~$`, cmd:' whoami' },
    { type:'out', text:`${C.tagline}` },
    { type:'cmd', prompt:`navin@grid:~$`, cmd:' status --check' },
    { type:'out', text:`[ ${C.available?'ONLINE':'OFFLINE'} ] ${C.available?'Available for opportunities':'Currently unavailable'}`, success:C.available },
    { type:'cursor' },
  ];
  previewLines.forEach(l => {
    if(l.type==='cmd') {
      const d=el('div','tp-line'); d.innerHTML=`<span class="tp-prompt">${esc(l.prompt)}</span><span class="tp-cmd">${esc(l.cmd)}</span>`; tb.appendChild(d);
    } else if(l.type==='out') {
      const d=el('div', l.success?'tp-out success':'tp-out'); d.textContent=l.text; tb.appendChild(d);
    } else if(l.type==='cursor') {
      const d=el('div','tp-line'); d.innerHTML=`<span class="tp-prompt">navin@grid:~$</span><span class="t-cursor"></span>`; tb.appendChild(d);
    }
  });
}

/* ── SERVICES ────────────────────────────────────────────────── */
function initServices() {
  const g = $('services-grid');
  C.services.forEach(s => {
    const card = el('article','service-card');
    card.innerHTML = `
      <div class="svc-num">${esc(s.num)}</div>
      <div class="svc-icon" aria-hidden="true">${s.icon}</div>
      <h3 class="svc-title">${esc(s.title)}</h3>
      <p class="svc-desc">${esc(s.desc)}</p>`;
    addSpotlight(card);
    g.appendChild(card);
  });
}

/* ── PROJECTS ────────────────────────────────────────────────── */
function initProjects() {
  const g = $('projects-grid');
  C.projects.forEach(p => {
    const statusClass = p.status === 'COMPLETED' ? 'completed' : 'progress';
    const termLines = p.terminal.map(l=>`<div>${esc(l)}</div>`).join('');
    const stackTags = p.stack.map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('');
    const liveLink = p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" class="proj-link secondary">↗ LIVE DEMO</a>` : '';
    const card = el('article','project-card');
    card.innerHTML = `
      <div class="proj-header">
        <div class="proj-dot" aria-hidden="true"></div>
        <span class="proj-id">PROJECT :: ${esc(p.id)}</span>
        <span class="proj-title">${esc(p.title)}</span>
      </div>
      <div class="proj-body">
        <div class="proj-screen" aria-hidden="true"><div class="proj-screen-inner">${termLines}</div></div>
        <p class="proj-desc">${esc(p.desc)}</p>
        <div class="proj-stack">${stackTags}</div>
        <div class="proj-links">
          <a href="${esc(p.repo)}" target="_blank" rel="noopener" class="proj-link">→ VIEW REPO</a>
          ${liveLink}
          <span class="proj-status ${statusClass}">${esc(p.status)}</span>
        </div>
      </div>`;
    addSpotlight(card);
    g.appendChild(card);
  });
}

/* ── QUALIFICATIONS ──────────────────────────────────────────── */
function initQuals() {
  const et = $('edu-timeline');
  C.education.forEach(e => {
    const item = el('div','qual-item');
    item.innerHTML = `
      <div class="qual-year">${esc(e.year)}</div>
      <div class="qual-content">
        <div class="qual-node" aria-hidden="true"></div>
        <div class="qual-degree">${esc(e.degree)}</div>
        <div class="qual-school">${esc(e.school)}</div>
        <div class="qual-desc">${esc(e.desc)}</div>
      </div>`;
    et.appendChild(item);
  });

  const cl = $('cert-list');
  C.certifications.forEach(c => {
    const item = el('div','cert-item');
    item.innerHTML = `
      <div class="cert-year">${esc(c.year)}</div>
      <div class="cert-name">${esc(c.name)}</div>
      <div class="cert-org">${esc(c.org)}</div>`;
    cl.appendChild(item);
  });
}

/* ── SKILLS ──────────────────────────────────────────────────── */
function initSkills() {
  const sb = $('skill-bars');
  C.skills.forEach(s => {
    const wrap = el('div','skill-bar-wrap');
    wrap.innerHTML = `
      <div class="skill-name"><span>${esc(s.name)}</span><span>${s.pct}%</span></div>
      <div class="skill-track"><div class="skill-fill" data-w="${s.pct}" style="width:0%"></div></div>`;
    sb.appendChild(wrap);
  });

  const tc = $('tool-chips');
  C.tools.forEach(cat => {
    const g = el('div','tool-cat');
    g.innerHTML = `<div class="tool-cat-name">// ${esc(cat.cat)}</div>`;
    const chips = el('div','tool-chips');
    cat.items.forEach(item => {
      const chip = el('span','tool-chip'); chip.textContent = item;
      chips.appendChild(chip);
    });
    g.appendChild(chips);
    tc.appendChild(g);
  });

  // Animate bars on scroll into view
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) {
      $$('.skill-fill').forEach(bar => bar.style.width = bar.dataset.w + '%');
      observer.disconnect();
    }
  }, { threshold:0.25 });
  observer.observe($('skills'));
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function initContact() {
  $('contact-tagline').innerHTML =
    `Ready to secure your systems.<br>Open to: ${C.openTo.join(' · ')}`;

  const details = $('contact-details');
  const rows = [
    ['EMAIL', `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`],
    ['LOCATION', esc(C.location)],
    ['GITHUB', `<a href="${esc(C.social.github||'')}" target="_blank" rel="noopener">${esc((C.social.github||'').replace('https://',''))}</a>`],
    ...(C.social.linkedin ? [['LINKEDIN', `<a href="${esc(C.social.linkedin)}" target="_blank" rel="noopener">${esc(C.social.linkedin.replace('https://www.',''))}</a>`]] : []),
  ];
  rows.forEach(([label, val]) => {
    const item = el('div','contact-detail-item');
    item.innerHTML = `<div class="cd-label">// ${label}</div><div class="cd-val">${val}</div>`;
    details.appendChild(item);
  });

  const cs = $('contact-social');
  Object.entries(C.social).forEach(([key, url]) => {
    const a = el('a','cs-link');
    a.href=url; a.target='_blank'; a.rel='noopener noreferrer';
    a.textContent=key.toUpperCase(); cs.appendChild(a);
  });

  // Contact form with Formspree
  const form = $('contact-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nameEl = $('cf-name'), emailEl = $('cf-email'), msgEl = $('cf-msg');
    let valid = true;
    [nameEl, emailEl, msgEl].forEach(el2 => { el2.classList.remove('invalid'); });
    if(!nameEl.value.trim())  { nameEl.classList.add('invalid'); valid=false; }
    if(!emailEl.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { emailEl.classList.add('invalid'); valid=false; }
    if(!msgEl.value.trim())   { msgEl.classList.add('invalid'); valid=false; }
    if(!valid) return;

    const btn = $('submit-btn');
    const statusEl = $('form-status');
    btn.disabled = true;
    $('submit-text').classList.add('hidden');
    $('submit-loader').classList.remove('hidden');
    statusEl.className = 'form-status hidden';

    const endpoint = C.formspreeEndpoint;
    if(!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      // Dev mode: simulate success
      await new Promise(r => setTimeout(r, 1200));
      btn.disabled=false;
      $('submit-text').classList.remove('hidden');
      $('submit-loader').classList.add('hidden');
      statusEl.className='form-status success';
      statusEl.textContent='[DEV MODE] Message received! Set formspreeEndpoint in config.js to enable real submissions.';
      statusEl.classList.remove('hidden');
      form.reset();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          subject: $('cf-subject').value.trim(),
          message: msgEl.value.trim(),
        }),
      });
      if(res.ok) {
        statusEl.className='form-status success';
        statusEl.textContent='✓ Message transmitted successfully. Will respond within 24 hours.';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch(err) {
      statusEl.className='form-status error';
      statusEl.textContent='✗ Transmission failed. Please email directly: '+C.email;
    }
    btn.disabled=false;
    $('submit-text').classList.remove('hidden');
    $('submit-loader').classList.add('hidden');
    statusEl.classList.remove('hidden');
  });
}

/* ── SPOTLIGHT EFFECT ────────────────────────────────────────── */
function addSpotlight(card) {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.background = `radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px, rgba(0,212,255,0.06), transparent 60%), rgba(0,212,255,0.025)`;
  });
  card.addEventListener('mouseleave', () => { card.style.background=''; });
}

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
function initCursor() {
  if(!window.matchMedia('(pointer:fine)').matches) return;
  const cur = $('cursor'), dot = $('cursor-dot');
  if(!cur || !dot) return;
  let mx=0,my=0, cx=0,cy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  (function loop(){ cx+=(mx-cx)*0.12; cy+=(my-cy)*0.12; cur.style.left=cx+'px'; cur.style.top=cy+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,[role=button]').forEach(el2 => {
    el2.addEventListener('mouseenter', ()=>cur.classList.add('expanded'));
    el2.addEventListener('mouseleave', ()=>cur.classList.remove('expanded'));
  });
}

/* ── BACKGROUND: GRID + PARTICLES ───────────────────────────── */
function initBackgrounds() {
  // Grid
  const gc = $('grid-canvas');
  const gx = gc.getContext('2d');
  const drawGrid = () => {
    gc.width = window.innerWidth; gc.height = window.innerHeight;
    gx.strokeStyle = 'rgba(0,212,255,0.055)'; gx.lineWidth=1;
    const S=60;
    for(let x=0;x<gc.width;x+=S){ gx.beginPath(); gx.moveTo(x,0); gx.lineTo(x,gc.height); gx.stroke(); }
    for(let y=0;y<gc.height;y+=S){ gx.beginPath(); gx.moveTo(0,y); gx.lineTo(gc.width,y); gx.stroke(); }
  };
  drawGrid(); window.addEventListener('resize', drawGrid);

  // Particles
  const pc = $('particle-canvas');
  const px = pc.getContext('2d');
  const resize = () => { pc.width=window.innerWidth; pc.height=window.innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const pts = Array.from({length:55}, ()=>({
    x:Math.random()*pc.width, y:Math.random()*pc.height,
    vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
    r:Math.random()*1.4+.4, a:Math.random()*.6+.2
  }));
  (function loop(){
    px.clearRect(0,0,pc.width,pc.height);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=pc.width; if(p.x>pc.width)p.x=0;
      if(p.y<0)p.y=pc.height; if(p.y>pc.height)p.y=0;
      px.beginPath(); px.arc(p.x,p.y,p.r,0,Math.PI*2);
      px.fillStyle=`rgba(0,212,255,${p.a*.3})`; px.fill();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){ px.beginPath(); px.moveTo(pts[i].x,pts[i].y); px.lineTo(pts[j].x,pts[j].y);
        px.strokeStyle=`rgba(0,212,255,${.07*(1-d/110)})`; px.lineWidth=.6; px.stroke(); }
    }
    requestAnimationFrame(loop);
  })();
}

/* ── MOBILE NAV ──────────────────────────────────────────────── */
function initMobileNav() {
  const btn = $('nav-hamburger');
  const links = $('nav-links');
  if(!btn||!links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  $$('#nav-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded','false');
  }));
}

/* ── ACTIVE NAV ON SCROLL ────────────────────────────────────── */
function initScrollSpy() {
  const sections = ['home','services','portfolio','qualifications','skills','contact'];
  const dots   = $$('.scroll-dot');
  const links  = $$('.nav-links a');
  const onScroll = () => {
    let cur=0;
    sections.forEach((id,i) => { const s=document.getElementById(id); if(s && window.scrollY >= s.offsetTop-200) cur=i; });
    dots.forEach((d,i)  => d.classList.toggle('active', i===cur));
    links.forEach((l,i) => l.classList.toggle('active', i===cur));
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  dots.forEach((d,i) => d.addEventListener('click', ()=>{ document.getElementById(sections[i])?.scrollIntoView({behavior:'smooth'}); }));
}

/* ── GLITCH HOVER ON HERO NAME ───────────────────────────────── */
function initHeroGlitch() {
  const n = document.querySelector('.hero-name');
  if(!n) return;
  n.addEventListener('mouseenter', () => { n.style.animation='none'; requestAnimationFrame(()=>requestAnimationFrame(()=>n.style.animation='')); });
}

/* ============================================================
   INTERACTIVE TERMINAL ENGINE
   ============================================================ */
const TERM = {
  history:[], histIdx:-1, open:false, maximized:false, minimized:false,
  inputEl:  null,
  outputEl: null,
  overlayEl:null,
  windowEl: null,
};

/* ── OUTPUT HELPERS ──────────────────────────────────────────── */
function tOut(text, type='default') {
  const o = TERM.outputEl; if(!o) return;
  if(type==='spacer') { o.appendChild(el('span','o-spacer',' ')); o.scrollTop=o.scrollHeight; return; }
  if(type==='sep')    { o.appendChild(el('hr','o-sep')); o.scrollTop=o.scrollHeight; return; }
  const d = el('div', `o-line o-${type}`); d.textContent=text; o.appendChild(d);
  o.scrollTop=o.scrollHeight;
}
function tHTML(html, cls='o-default') {
  const o=TERM.outputEl; if(!o) return;
  const d=el('div',`o-line ${cls}`); d.innerHTML=html; o.appendChild(d);
  o.scrollTop=o.scrollHeight;
}
function tEcho(cmd) {
  const o=TERM.outputEl; if(!o) return;
  const d=el('div','t-echo');
  d.innerHTML=`<span class="t-prompt-echo">navin@grid:~$</span><span class="t-cmd-echo"> ${esc(cmd)}</span>`;
  o.appendChild(d);
}
function tPre(text) {
  const o=TERM.outputEl; if(!o) return;
  const p=el('pre','o-ascii'); p.textContent=text; o.appendChild(p); o.scrollTop=o.scrollHeight;
}
function tBar(label, pct) {
  const o=TERM.outputEl; if(!o) return;
  const wrap=el('div','o-bar-wrap');
  wrap.innerHTML=`<span class="o-bar-label">${esc(label)}</span><div class="o-bar-track"><div class="o-bar-fill" data-w="${pct}" style="width:0%"></div></div><span class="o-bar-pct">${pct}%</span>`;
  o.appendChild(wrap);
  setTimeout(()=>wrap.querySelector('.o-bar-fill').style.width=pct+'%',80);
  o.scrollTop=o.scrollHeight;
}

/* ── COMMAND REGISTRY ────────────────────────────────────────── */
const CMDS = {};

CMDS.help = () => {
  const all = [
    ['whoami',      'Identity card & profile'],
    ['about',       'Full bio & career goals'],
    ['skills',      'Proficiency bars for all skills'],
    ['tools',       'Complete tools & technology arsenal'],
    ['projects',    'List all projects'],
    ['project <n>', 'Deep-dive on project (e.g. project 1)'],
    ['education',   'Academic background'],
    ['certs',       'Certifications & training'],
    ['experience',  'Work exposure & experience'],
    ['services',    'Services offered'],
    ['contact',     'All contact info'],
    ['social',      'Clickable social links'],
    ['status',      'Current availability status'],
    ['cv',          'Download CV / resume'],
    ['open',        'Open a URL (e.g. open github)'],
    ['hire',        'Reasons to hire Navin'],
    ['scan',        '[ FUN ] Fake network vulnerability scan'],
    ['crack',       '[ FUN ] Simulate password cracking'],
    ['matrix',      '[ FUN ] Enter the Matrix'],
    ['banner',      'Display ASCII banner'],
    ['theme',       'Switch color theme (theme orange | theme green | theme default)'],
    ['clear',       'Clear terminal output'],
    ['exit',        'Close terminal'],
  ];
  tOut('','spacer');
  tOut('┌─────────────────────────────────────────────────────────────┐','heading');
  tOut('│          NAVIN@GRID :: INTERACTIVE SHELL v2.4.1            │','heading');
  tOut('└─────────────────────────────────────────────────────────────┘','heading');
  tOut('','spacer');
  all.forEach(([cmd,desc]) => tHTML(`  <span style="color:var(--orange);display:inline-block;min-width:160px">${esc(cmd)}</span><span style="color:rgba(0,212,255,0.45)">— ${esc(desc)}</span>`));
  tOut('','spacer');
  tOut('Tips: [Tab] autocomplete · [↑↓] history · Ctrl+L clear · Ctrl+` toggle','dim');
  tOut('','spacer');
};

CMDS.whoami = () => {
  tPre(`
 ███╗   ██╗ █████╗ ██╗   ██╗██╗███╗   ██╗
 ████╗  ██║██╔══██╗██║   ██║██║████╗  ██║
 ██╔██╗ ██║███████║██║   ██║██║██╔██╗ ██║
 ██║╚██╗██║██╔══██║╚██╗ ██╔╝██║██║╚██╗██║
 ██║ ╚████║██║  ██║ ╚████╔╝ ██║██║ ╚████║
 ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝`);
  tOut('','spacer');
  [
    ['NAME',     C.name],
    ['ROLE',     C.tagline],
    ['LOCATION', C.location],
    ['EMAIL',    C.email],
    ['STATUS',   C.available ? 'AVAILABLE FOR OPPORTUNITIES' : 'CURRENTLY UNAVAILABLE'],
  ].forEach(([l,v]) => tHTML(`  <span style="color:var(--orange);min-width:100px;display:inline-block">${l}</span><span style="color:var(--tron)"> ${esc(v)}</span>`));
  tOut('','spacer');
};

CMDS.about = () => {
  tOut('','spacer');
  tOut('[ PROFILE :: '+C.name.toUpperCase()+' ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  // Word-wrap bio into ~60 char lines
  C.bio.match(/.{1,70}(\s|$)/g)?.forEach(l => tOut(l.trim(),'default'));
  tOut('','spacer');
  tOut('OPEN TO:','orange');
  C.openTo.forEach(r => tOut('  → '+r,'default'));
  tOut('','spacer');
};

CMDS.skills = () => {
  tOut('','spacer');
  tOut('[ SKILLS :: PROFICIENCY MATRIX ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.skills.forEach(s => tBar(s.name, s.pct));
  tOut('','spacer');
};

CMDS.tools = () => {
  tOut('','spacer');
  tOut('[ TOOLS & TECHNOLOGY ARSENAL ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.tools.forEach(cat => {
    const o=TERM.outputEl;
    const d=el('div','o-line'); d.style.marginBottom='8px';
    d.innerHTML=`<span style="color:var(--orange);min-width:110px;display:inline-block">// ${esc(cat.cat)}</span>`+
      cat.items.map(t=>`<span class="o-tag">${esc(t)}</span>`).join('');
    o.appendChild(d); o.scrollTop=o.scrollHeight;
  });
  tOut('','spacer');
};

CMDS.projects = () => {
  tOut('','spacer');
  tOut(`[ PROJECTS :: ${C.projects.length} OPERATIONS FOUND ]`,'heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.projects.forEach((p,i) => {
    tHTML(`  <span style="color:var(--orange)">[${esc(p.id)}]</span> <span style="color:var(--tron)">${esc(p.title)}</span>`);
    tHTML(`       <span style="color:rgba(0,212,255,0.4)">Stack: ${esc(p.stack.join(' · '))}</span>`);
    const o=TERM.outputEl;
    const d=el('div','o-line o-link'); d.style.paddingLeft='13px';
    d.textContent='       → '+p.repo.replace('https://','');
    d.onclick=()=>window.open(p.repo,'_blank');
    o.appendChild(d);
    tOut('','spacer');
  });
  tOut(`Tip: "project 1" for detailed view`,'dim');
  tOut('','spacer');
};

CMDS['project'] = (args) => {
  const n = parseInt(args[0]);
  const p = C.projects[n-1];
  if(!p) { tOut(`Error: invalid project. Use 1–${C.projects.length}.`,'error'); return; }
  tOut('','spacer');
  tOut(`[ PROJECT ${n} :: ${p.title.toUpperCase()} ]`,'heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  tOut('DESCRIPTION:','orange');
  p.desc.match(/.{1,68}(\s|$)/g)?.forEach(l=>tOut('  '+l.trim(),'default'));
  tOut('','spacer');
  tOut('TECH STACK:','orange');
  const o=TERM.outputEl;
  const d=el('div','o-line'); d.innerHTML='  '+p.stack.map(t=>`<span class="o-tag">${esc(t)}</span>`).join('');
  o.appendChild(d);
  tOut('','spacer');
  if(p.features?.length) {
    tOut('KEY FEATURES:','orange');
    p.features.forEach(f=>tOut('  ✓ '+f,'success'));
    tOut('','spacer');
  }
  tOut(`STATUS: [ ${p.status} ]`, p.status==='COMPLETED'?'success':'warn');
  const link=el('div','o-line o-link'); link.textContent='REPOSITORY → '+p.repo.replace('https://','');
  link.onclick=()=>window.open(p.repo,'_blank'); o.appendChild(link);
  if(p.live) {
    const ll=el('div','o-line o-link'); ll.textContent='LIVE DEMO → '+p.live.replace('https://','');
    ll.onclick=()=>window.open(p.live,'_blank'); o.appendChild(ll);
  }
  tOut('','spacer');
};

CMDS.education = () => {
  tOut('','spacer');
  tOut('[ EDUCATION :: ACADEMIC RECORD ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.education.forEach(e => {
    tOut(e.year,'orange');
    tOut(e.degree,'info');
    tOut(e.school,'dim');
    tOut(e.desc,'default');
    tOut('','spacer');
  });
};

CMDS.certs = () => {
  tOut('','spacer');
  tOut('[ CERTIFICATIONS & TRAINING ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.certifications.forEach(c => {
    tHTML(`  <span style="color:var(--orange)">[${esc(c.year)}]</span> <span style="color:var(--tron)">${esc(c.name)}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:rgba(0,212,255,0.35)">${esc(c.org)}</span>`);
    tOut('','spacer');
  });
};

CMDS.experience = () => {
  tOut('','spacer');
  tOut('[ EXPERIENCE & EXPOSURE ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  tOut('Project & Lab Experience:','orange');
  ['SOC monitoring & SIEM alert triage','Network vulnerability assessments','Digital forensics case investigations',
   'AI-based threat detection system development','Penetration testing labs (CTF environments)'].forEach(e=>tOut('  → '+e,'default'));
  tOut('','spacer');
  tOut('Open to: Full-time · Part-time · Internship · Remote','success');
  tOut('','spacer');
};

CMDS.services = () => {
  tOut('','spacer');
  tOut('[ SERVICES OFFERED ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  C.services.forEach(s => {
    tHTML(`  <span style="color:var(--orange)">[${esc(s.num)}]</span> <span style="color:var(--tron)">${esc(s.title)}</span>`);
    tOut('       '+s.desc,'dim');
    tOut('','spacer');
  });
};

CMDS.contact = () => {
  tOut('','spacer');
  tOut('[ CONTACT INFORMATION ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  [['EMAIL',C.email],['LOCATION',C.location]].forEach(([l,v])=>
    tHTML(`  <span style="color:var(--orange);display:inline-block;min-width:100px">${l}</span><span style="color:var(--tron)">${esc(v)}</span>`));
  tOut('','spacer');
  tOut('Run "social" to see clickable links.','dim');
  tOut('','spacer');
};

CMDS.social = () => {
  tOut('','spacer');
  tOut('[ SOCIAL LINKS ]','heading');
  tOut('─'.repeat(42),'dim');
  tOut('','spacer');
  Object.entries(C.social).forEach(([key,url]) => {
    const o=TERM.outputEl;
    const d=el('div','o-line o-link');
    d.innerHTML=`  <span style="color:var(--orange);display:inline-block;min-width:90px">${esc(key.toUpperCase())}</span>${esc(url.replace('https://www.','').replace('https://',''))}`;
    d.onclick=()=>window.open(url,'_blank');
    o.appendChild(d);
  });
  tOut('','spacer');
};

CMDS.status = () => {
  tOut('','spacer');
  tOut('Checking availability...','dim');
  setTimeout(()=>{
    tOut('','spacer');
    tHTML(`  <span style="color:var(--green)">◉ STATUS</span>      :: ${C.available?'ONLINE & AVAILABLE':'CURRENTLY UNAVAILABLE'}`);
    tHTML(`  <span style="color:var(--green)">◉ OPEN TO</span>     :: Full-time · Internship · Remote`);
    tHTML(`  <span style="color:var(--tron)">◉ TIMEZONE</span>    :: IST (UTC+5:30)`);
    tHTML(`  <span style="color:var(--tron)">◉ RESPONSE</span>    :: Within 24 hours`);
    tOut('','spacer');
    tOut(`Contact: ${C.email}`,'orange');
    tOut('','spacer');
  }, 600);
};

CMDS.cv = () => {
  tOut('','spacer');
  tOut('Preparing CV download...','dim');
  setTimeout(()=>{
    tOut('[ ████████████████████████████ ] 100%','info');
    setTimeout(()=>{
      const a=document.createElement('a'); a.href=C.cvPath; a.download='Navin_Suresh_CV.pdf'; a.click();
      tOut('✓ CV download initiated: Navin_Suresh_CV.pdf','success');
      tOut('','spacer');
    }, 700);
  }, 400);
};

CMDS.open = (args) => {
  const map = { github:C.social.github, linkedin:C.social.linkedin, discord:C.social.discord, email:`mailto:${C.email}` };
  const key = args[0]?.toLowerCase();
  const url = map[key] || args[0];
  if(!url) { tOut('Usage: open <github|linkedin|discord|email|url>','error'); return; }
  window.open(url,'_blank'); tOut(`Opening ${key||url}...`,'success');
};

CMDS.hire = () => {
  tOut('','spacer');
  tOut('[ WHY HIRE '+C.name.toUpperCase()+'? ]','heading');
  tOut('─'.repeat(52),'dim');
  tOut('','spacer');
  const reasons=[
    'Specialized degree in Cybersecurity & Digital Forensics',
    'Hands-on with industry-standard forensics & pentest tools',
    'Bridges AI/ML with cybersecurity for intelligent threat detection',
    'Strong analytical mindset — built for threat hunting',
    'Self-driven, passionate, and continuously upskilling',
    'Available immediately — zero notice period',
    'Open to relocation and full remote work',
  ];
  reasons.forEach((r,i) => setTimeout(()=>tOut(`  ${i+1}. ${r}`,'success'), i*110));
  setTimeout(()=>{
    tOut('','spacer'); tOut('READY TO CONTRIBUTE FROM DAY ONE.','heading');
    tOut('','spacer'); tOut('→ '+C.email,'orange'); tOut('','spacer');
  }, reasons.length*110+100);
};

CMDS.scan = () => {
  tOut('','spacer');
  tOut('Starting Nmap 7.94 ( https://nmap.org )','dim');
  tOut('Initiating SYN Stealth Scan on 192.168.1.0/24...','info');
  const lines = [
    ['Scanning [65535 ports]...', 300,'dim'],
    ['Discovered open port 22/tcp on 192.168.1.105', 800,'success'],
    ['Discovered open port 80/tcp on 192.168.1.1', 1200,'success'],
    ['Discovered open port 443/tcp on 192.168.1.1', 1500,'success'],
    ['Discovered open port 3389/tcp on 192.168.1.200', 1900,'warn'],
    ['⚠ WEAK CONFIG: RDP exposed without VPN (port 3389)', 2300,'warn'],
    ['⚠ SSH on default port — consider non-standard port', 2600,'warn'],
    ['Scan complete: 3 hosts up, 4 open ports detected', 3100,'info'],
    ['Report: /tmp/scan_report.txt', 3350,'dim'],
    ['','spacer'],
    ['VULNERABILITY SCORE: 3/10 — LOW RISK (fix RDP exposure)', 3600,'success'],
    ['','spacer'],
  ];
  lines.forEach(([msg,delay,cls]) => setTimeout(()=>tOut(msg,cls), delay));
};

CMDS.crack = () => {
  tOut('','spacer');
  tOut('[SIMULATION] Hashcat v6.2.6 Password Analysis Demo','heading');
  tOut('Target Hash: 5f4dcc3b5aa765d61d8327deb882cf99 [MD5]','dim');
  tOut('','spacer');
  const lines=[
    ['Loading wordlist: rockyou.txt (14,344,391 entries)...', 250,'dim'],
    ['Attack mode: Dictionary + Rules', 550,'info'],
    ['Progress: [ ████░░░░░░░░░░ ]  25.4%', 1000,'dim'],
    ['Progress: [ ████████░░░░░░ ]  57.8%', 1600,'dim'],
    ['Progress: [ ████████████░░ ]  86.2%', 2200,'dim'],
    ['Progress: [ ██████████████ ] 100.0%', 2700,'dim'],
    ['','spacer'],
    ['✓ CRACKED!  5f4dcc3b5aa765d61d8327deb882cf99 → "password"', 3000,'success'],
    ['','spacer'],
    ['⚠ LESSON: "password" cracked in under 3 seconds.', 3300,'warn'],
    ['  Use a password manager. 16+ chars. Random. Unique per site.', 3500,'dim'],
    ['','spacer'],
  ];
  lines.forEach(([msg,delay,cls])=>setTimeout(()=>tOut(msg,cls),delay));
};

CMDS.matrix = () => {
  tOut('','spacer');
  tOut('Initializing Matrix protocol...','dim');
  setTimeout(()=>{
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    const canvas=document.createElement('canvas');
    canvas.style.cssText='position:absolute;inset:0;';
    const msg=document.createElement('div');
    msg.style.cssText='position:relative;z-index:2;text-align:center;font-family:"VT323",monospace;font-size:2.2rem;color:#00ff41;text-shadow:0 0 20px #00ff41;';
    msg.innerHTML='THE MATRIX HAS YOU...<br><span style="font-size:1.1rem;opacity:0.6">Click or press any key to escape</span>';
    overlay.appendChild(canvas); overlay.appendChild(msg);
    document.body.appendChild(overlay);
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const ctx=canvas.getContext('2d');
    const cols=Math.floor(canvas.width/18);
    const drops=Array(cols).fill(1);
    const chars='アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const mInt=setInterval(()=>{
      ctx.fillStyle='rgba(0,0,0,0.04)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle='#00ff41'; ctx.font='18px monospace';
      drops.forEach((y,i)=>{ ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*18,y*18); if(y*18>canvas.height&&Math.random()>.975)drops[i]=0; drops[i]++; });
    },45);
    const cleanup=()=>{ clearInterval(mInt); overlay.remove(); tOut('You escaped the Matrix.','success'); };
    overlay.addEventListener('click',cleanup);
    document.addEventListener('keydown',cleanup,{once:true});
  },600);
};

CMDS.banner = () => {
  tPre(`
  ██████╗ ██████╗ ██╗██████╗
 ██╔════╝ ██╔══██╗██║██╔══██╗
 ██║  ███╗██████╔╝██║██║  ██║
 ██║   ██║██╔══██╗██║██║  ██║
 ╚██████╔╝██║  ██║██║██████╔╝
  ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝
       :: CYBERSECURITY ANALYST ::`);
  tOut('','spacer');
  tOut(`${C.name} | ${C.tagline}`,'dim');
  tOut(`${C.email} | github.com/Navin-2003`,'dim');
  tOut('','spacer');
};

CMDS.theme = (args) => {
  const themes = {
    orange:  { '--tron':'#ff8c00', '--tron2':'#ffb347', '--glow':'0 0 10px #ff8c00,0 0 30px #ff8c00' },
    green:   { '--tron':'#00ff88', '--tron2':'#00ffcc', '--glow':'0 0 10px #00ff88,0 0 30px #00ff88' },
    purple:  { '--tron':'#bb44ff', '--tron2':'#cc77ff', '--glow':'0 0 10px #bb44ff,0 0 30px #bb44ff' },
    default: { '--tron':'#00d4ff', '--tron2':'#00ffff', '--glow':'0 0 10px #00d4ff,0 0 30px #00d4ff,0 0 60px rgba(0,212,255,0.35)' },
  };
  const name = args[0]?.toLowerCase();
  if(!name || !themes[name]) {
    tOut('Usage: theme <default|orange|green|purple>','error'); return;
  }
  const root = document.documentElement;
  Object.entries(themes[name]).forEach(([k,v]) => root.style.setProperty(k,v));
  tOut(`Theme applied: ${name}`,'success');
};

CMDS.clear = () => { if(TERM.outputEl) TERM.outputEl.innerHTML=''; };
CMDS.exit  = () => { closeTerminal(); };

/* ── EXECUTE ─────────────────────────────────────────────────── */
function execCmd(raw) {
  const trimmed=raw.trim(); if(!trimmed) return;
  TERM.history.unshift(trimmed); TERM.histIdx=-1;
  tEcho(trimmed);
  const parts=trimmed.split(/\s+/), cmd=parts[0].toLowerCase(), args=parts.slice(1);
  if(CMDS[cmd]) { CMDS[cmd](args); }
  else { tOut(`Command not found: ${cmd}`,'error'); tOut(`Type 'help' to see available commands.`,'dim'); }
  TERM.outputEl.scrollTop=TERM.outputEl.scrollHeight;
}

/* ── AUTOCOMPLETE ────────────────────────────────────────────── */
const CMD_LIST = Object.keys(CMDS);
function autocomplete(val) {
  if(!val) return val;
  return CMD_LIST.find(c=>c.startsWith(val.toLowerCase())) || val;
}

/* ── INPUT BINDINGS ──────────────────────────────────────────── */
function initTerminalInput() {
  const inp = TERM.inputEl;
  if(!inp) return;
  inp.addEventListener('keydown', e => {
    if(e.key==='Enter') { const v=inp.value; inp.value=''; execCmd(v); }
    else if(e.key==='ArrowUp')  { e.preventDefault(); if(TERM.histIdx<TERM.history.length-1){ TERM.histIdx++; inp.value=TERM.history[TERM.histIdx]; } }
    else if(e.key==='ArrowDown'){ e.preventDefault(); TERM.histIdx>0 ? (TERM.histIdx--, inp.value=TERM.history[TERM.histIdx]) : (TERM.histIdx=-1, inp.value=''); }
    else if(e.key==='Tab')      { e.preventDefault(); inp.value=autocomplete(inp.value); }
    else if(e.key==='l'&&e.ctrlKey){ e.preventDefault(); CMDS.clear(); }
  });
  // Keep focus
  $('iterm-body')?.addEventListener('click', ()=>inp.focus());
}

/* ── BOOT SEQUENCE ───────────────────────────────────────────── */
function termBoot() {
  if(!TERM.outputEl) return;
  TERM.outputEl.innerHTML='';
  const lines=[
    ['','spacer'],
    ['████████████████████████████████████████████████████████','heading'],
    ['   '+C.name.toUpperCase()+' :: SECURE TERMINAL v2.4.1','heading'],
    ['   '+C.tagline,'heading'],
    ['████████████████████████████████████████████████████████','heading'],
    ['','spacer'],
    ['Initializing secure connection...','dim'],
    ['Verifying identity signature...... [OK]','success'],
    ['Loading user profile............... [OK]','success'],
    ['Mounting virtual filesystem........ [OK]','success'],
    ['Starting security daemon........... [OK]','success'],
    ['','spacer'],
    ['Welcome, operator. Session established.','info'],
    ['Type "help" for the full command reference.','dim'],
    ['','spacer'],
  ];
  let delay=0;
  lines.forEach(([text,type])=>{
    setTimeout(()=>{ tOut(text,type); TERM.outputEl.scrollTop=TERM.outputEl.scrollHeight; }, delay);
    delay += type==='spacer'?30:70;
  });
}

/* ── OPEN / CLOSE / MINIMIZE / MAXIMIZE ──────────────────────── */
window.toggleTerminal   = () => TERM.open ? closeTerminal() : openTerminal();
window.closeTerminal    = () => { TERM.open=false; TERM.overlayEl?.classList.add('hidden'); TERM.overlayEl?.classList.remove('minimized','maximized'); };
window.minimizeTerminal = () => { TERM.minimized=!TERM.minimized; TERM.overlayEl?.classList.toggle('minimized',TERM.minimized); };
window.maximizeTerminal = () => { TERM.maximized=!TERM.maximized; TERM.overlayEl?.classList.toggle('maximized',TERM.maximized); };

function openTerminal() {
  TERM.open=true; TERM.minimized=false;
  TERM.overlayEl?.classList.remove('hidden','minimized','maximized');
  termBoot();
  setTimeout(()=>TERM.inputEl?.focus(), 320);
}

/* ── DRAGGABLE TITLEBAR ──────────────────────────────────────── */
function initDrag() {
  const titlebar = $('iterm-titlebar');
  const win = TERM.windowEl;
  if(!titlebar || !win) return;
  let dragging=false, ox=0, oy=0;
  titlebar.addEventListener('mousedown', e => {
    if(e.target.classList.contains('iterm-dot') || TERM.maximized) return;
    dragging=true; const r=win.getBoundingClientRect();
    ox=e.clientX-r.left; oy=e.clientY-r.top;
    win.style.transition='none'; win.style.position='absolute'; win.style.margin='0';
  });
  document.addEventListener('mousemove', e => { if(!dragging) return; win.style.left=(e.clientX-ox)+'px'; win.style.top=(e.clientY-oy)+'px'; });
  document.addEventListener('mouseup', ()=>{ dragging=false; win.style.transition=''; });
}

/* ── GLOBAL KEYBOARD SHORTCUTS ──────────────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if(e.ctrlKey && e.key==='`') { e.preventDefault(); window.toggleTerminal(); }
    if(e.key==='Escape' && TERM.open) closeTerminal();
  });
  // Click backdrop to close
  TERM.overlayEl?.addEventListener('click', e => { if(e.target===TERM.overlayEl) closeTerminal(); });
}

/* ── PERFORMANCE: REDUCE MOTION ──────────────────────────────── */
function respectReducedMotion() {
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    document.documentElement.style.setProperty('--transition','0s');
  }
}

/* ── INIT ALL ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Wire up terminal refs
  TERM.inputEl   = $('iterm-input');
  TERM.outputEl  = $('iterm-output');
  TERM.overlayEl = $('iterm-overlay');
  TERM.windowEl  = $('iterm-window');

  initSEO();
  initBranding();
  initHome();
  initServices();
  initProjects();
  initQuals();
  initSkills();
  initContact();
  initCursor();
  initBackgrounds();
  initMobileNav();
  initScrollSpy();
  initHeroGlitch();
  initTerminalInput();
  initDrag();
  initKeyboardShortcuts();
  respectReducedMotion();
});
