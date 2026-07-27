const hlTrack = document.getElementById('hlTrack');
const hlDots = document.getElementById('hlDots');
const hlControls = document.getElementById('hlControls');
const hlPlayBtn = document.getElementById('hlPlay');
if (hlTrack && hlDots && hlControls && hlPlayBtn) {
  const hlCards = [...hlTrack.querySelectorAll('.story-card')];
  const HL_DUR = 5000;
  const hlReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hlIdx = 0, hlPlaying = !hlReduced, hlTimer = null, hlVisible = true;

  if (hlReduced) {
    hlTrack.querySelectorAll('video').forEach(video => video.pause());
    hlPlayBtn.setAttribute('aria-label', 'Play highlights gallery');
  }

  hlCards.forEach((card, i) => {
    const b = document.createElement('button');
    b.className = 'hl-dot'; b.type = 'button';
    const label = card.querySelector('.sc-caption strong')?.textContent?.trim();
    b.setAttribute('aria-label', label ? `Show ${label.replace(/\.$/, '')} highlight` : `Show highlight ${i + 1}`);
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
      if (on) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
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
    hlTrack.scrollTo({ left: hlCardLeft(hlIdx), behavior: hlReduced ? 'auto' : 'smooth' });
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
  const nav = document.getElementById('case-nav');
  const workSection = document.querySelector('.work-section');
  const footer = document.getElementById('contact');
  const dots = nav ? [...nav.querySelectorAll('[data-project-target]')] : [];
  const cards = dots.map(dot => document.getElementById(dot.dataset.projectTarget));
  if (!nav || !workSection || !footer || !cards.length || cards.some(card => !card)) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const navAvailable = matchMedia('(min-width: 900px)');

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      cards[index].scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: 'center'
      });
    });
  });

  function updateCaseNav() {
    const vh = window.innerHeight;
    const sectionRect = workSection.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const show = navAvailable.matches && sectionRect.top < vh && sectionRect.bottom > 0 && footerRect.top >= vh;
    nav.classList.toggle('visible', show);
    nav.toggleAttribute('inert', !show);
    nav.setAttribute('aria-hidden', String(!show));

    if (!show) return;
    let activeIndex = 0;
    let greatestVisibleHeight = -1;
    let closestDistance = Infinity;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - vh / 2);
      if (visibleHeight > greatestVisibleHeight || (visibleHeight === greatestVisibleHeight && distance < closestDistance)) {
        greatestVisibleHeight = visibleHeight;
        closestDistance = distance;
        activeIndex = index;
      }
    });
    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
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
  navAvailable.addEventListener('change', queueCaseNav);

  const caseObserver = new IntersectionObserver(queueCaseNav, {
    threshold: Array.from({ length: 21 }, (_, index) => index / 20)
  });
  [workSection, footer, ...cards].forEach(element => caseObserver.observe(element));

  updateCaseNav();
})();
