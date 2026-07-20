const workStack = document.getElementById('workStack');
const toggleBtn = document.getElementById('toggleBtn');
const toggleLabel = document.getElementById('toggleLabel');
if (workStack && toggleBtn && toggleLabel) {
  const workCards = Array.from(workStack.querySelectorAll('.work-card'));
  let isOpen = false;
  const STAGGER = 72, GAP = 12;

  function expandStack() {
    const cardH = workCards[0].offsetHeight;
    const total = workCards.length * cardH + (workCards.length - 1) * GAP;
    workStack.style.height = total + 'px';
    workStack.classList.add('expanded');
    workCards.forEach((card, i) => {
      const ri = workCards.length - 1 - i;
      card.style.transitionDelay = `${i * STAGGER}ms`;
      card.style.transform = `translateY(${ri * (cardH + GAP)}px)`;
      card.style.left = '0';
      card.style.right = '0';
      card.style.opacity = '1';
    });
  }

  function collapseStack() {
    workStack.classList.remove('expanded');
    workCards.forEach((card, i) => {
      card.style.transitionDelay = `${i * STAGGER}ms`;
    });
    workCards[0].style.transform = 'translateY(12px)'; workCards[0].style.left = '5%';   workCards[0].style.right = '5%';   workCards[0].style.opacity = '0';
    workCards[1].style.transform = 'translateY(12px)'; workCards[1].style.left = '5%';   workCards[1].style.right = '5%';   workCards[1].style.opacity = '0.72';
    workCards[2].style.transform = 'translateY(6px)';  workCards[2].style.left = '2.5%'; workCards[2].style.right = '2.5%'; workCards[2].style.opacity = '0.88';
    workCards[3].style.transform = 'translateY(0px)';  workCards[3].style.left = '0';    workCards[3].style.right = '0';    workCards[3].style.opacity = '1';
    setTimeout(() => { workStack.style.height = ''; }, 220);
  }

  function toggleHistory() {
    isOpen = !isOpen;
    toggleBtn.classList.toggle('open', isOpen);
    toggleLabel.textContent = isOpen ? 'Show less' : 'Show all';
    if (isOpen) expandStack(); else collapseStack();
  }
  toggleBtn.addEventListener('click', toggleHistory);
  workStack.addEventListener('click', () => { if (!isOpen) toggleHistory(); });
}

const hlTrack = document.getElementById('hlTrack');
const hlDots = document.getElementById('hlDots');
const hlControls = document.getElementById('hlControls');
const hlPlayBtn = document.getElementById('hlPlay');
if (hlTrack && hlDots && hlControls && hlPlayBtn) {
  const hlCards = [...hlTrack.querySelectorAll('.story-card')];
  const HL_DUR = 5000;
  const hlReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hlIdx = 0, hlPlaying = !hlReduced, hlTimer = null, hlVisible = true;

  hlCards.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'hl-dot'; b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Show highlight ' + (i + 1));
    b.innerHTML = '<span class="hl-fill"></span>';
    b.addEventListener('click', () => hlGo(i));
    hlDots.appendChild(b);
  });
  const hlDotEls = [...hlDots.children];

  function hlCardLeft(i) {
    const pad = parseFloat(getComputedStyle(hlTrack).paddingInlineStart) || 0;
    return hlCards[i].offsetLeft - pad;
  }
  function hlPaint() {
    hlDotEls.forEach((d, k) => {
      const on = k === hlIdx;
      d.classList.toggle('active', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
      const fill = d.querySelector('.hl-fill');
      fill.style.animation = 'none'; fill.style.width = '';
      if (on && hlPlaying && hlVisible && !hlReduced) {
        void fill.offsetWidth;
        fill.style.animation = 'hlFill ' + HL_DUR + 'ms linear forwards';
      }
    });
  }
  function hlSchedule() {
    clearTimeout(hlTimer);
    if (!hlPlaying || !hlVisible || hlReduced) return;
    hlTimer = setTimeout(() => hlGo(hlIdx + 1), HL_DUR);
  }
  function hlGo(i) {
    hlIdx = i >= hlCards.length ? 0 : Math.max(0, i);
    hlTrack.scrollTo({ left: hlCardLeft(hlIdx), behavior: 'smooth' });
    hlPaint(); hlSchedule();
  }
  function hlSetPlaying(p) {
    hlPlaying = p;
    hlControls.classList.toggle('paused', !p);
    hlPlayBtn.setAttribute('aria-label', (p ? 'Pause' : 'Play') + ' highlights gallery');
    if (p) { hlPaint(); hlSchedule(); }
    else {
      clearTimeout(hlTimer);
      hlDotEls.forEach(d => {
        const f = d.querySelector('.hl-fill');
        f.style.animation = 'none'; f.style.width = getComputedStyle(f).width;
      });
    }
  }
  hlPlayBtn.addEventListener('click', () => hlSetPlaying(!hlPlaying));

  let hlDownX = null, hlDragged = false;
  hlTrack.addEventListener('pointerdown', e => { hlDownX = e.clientX; hlDragged = false; }, { passive: true });
  hlTrack.addEventListener('pointermove', e => { if (hlDownX != null && Math.abs(e.clientX - hlDownX) > 8) hlDragged = true; }, { passive: true });
  window.addEventListener('pointerup', () => { hlDownX = null; });
  hlCards.forEach((card, i) => card.addEventListener('click', () => { if (!hlDragged) hlGo(i); }));

  let hlRAF;
  hlTrack.addEventListener('scroll', () => {
    cancelAnimationFrame(hlRAF);
    hlRAF = requestAnimationFrame(() => {
      const sl = hlTrack.scrollLeft;
      let closest = 0, minDist = Infinity;
      hlCards.forEach((_, i) => {
        const dist = Math.abs(hlCardLeft(i) - sl);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      if (closest !== hlIdx) { hlIdx = closest; hlPaint(); hlSchedule(); }
    });
  }, { passive: true });

  new IntersectionObserver(es => {
    es.forEach(e => {
      hlVisible = e.isIntersecting;
      if (hlVisible) { hlPaint(); hlSchedule(); } else clearTimeout(hlTimer);
    });
  }, { threshold: 0.3 }).observe(hlTrack);

  if (hlReduced) hlControls.classList.add('paused');
  hlPaint(); hlSchedule();
}

(function () {
  const workSection = document.querySelector('.work-section');
  const cards = [...document.querySelectorAll('.work-section .card')];
  if (!workSection || !cards.length) return;

  const nav = document.createElement('div');
  nav.id = 'case-nav';

  const dots = cards.map((card, i) => {
    const btn = document.createElement('button');
    btn.className = 'case-dot';
    btn.setAttribute('aria-label', 'Jump to case ' + (i + 1));
    btn.addEventListener('click', () => card.scrollIntoView({ behavior: 'smooth' }));
    nav.appendChild(btn);
    return btn;
  });

  document.body.appendChild(nav);

  function updateCaseNav() {
    const vh = window.innerHeight;
    const sectionRect = workSection.getBoundingClientRect();
    const show = sectionRect.top < vh && sectionRect.bottom > 0;
    nav.classList.toggle('visible', show);

    if (!show) return;
    const marker = vh * 0.5;
    let activeIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - marker);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });
    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
  }
  let caseNavFrame = null;
  const queueCaseNav = () => {
    if (caseNavFrame) return;
    caseNavFrame = requestAnimationFrame(() => {
      caseNavFrame = null;
      updateCaseNav();
    });
  };
  window.addEventListener('scroll', queueCaseNav, { passive: true });
  window.addEventListener('resize', queueCaseNav, { passive: true });
  updateCaseNav();
})();
