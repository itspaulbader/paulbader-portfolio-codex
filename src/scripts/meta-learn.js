const hlTrack = document.getElementById('hlTrack');
const hlCards = hlTrack ? [...hlTrack.querySelectorAll('.hl-card')] : [];
const hlDots = document.getElementById('hlDots');
const hlControls = document.getElementById('hlControls');
const hlPlayBtn = document.getElementById('hlPlay');

if (hlTrack && hlCards.length && hlDots && hlControls && hlPlayBtn) {
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

  function hlStep() { return hlCards[0].offsetWidth + 20; }
  function hlPaint() {
    hlDotEls.forEach((d, k) => {
      const on = k === hlIdx;
      d.classList.toggle('active', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
      const fill = d.querySelector('.hl-fill');
      fill.style.animation = 'none';
      fill.style.width = '';
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
  const PARALLAX_SPEED = 0.28;
  let hlParaRAF;
  function hlParallax() {
    const sl = hlTrack.scrollLeft;
    const step = hlStep();
    hlCards.forEach((card, i) => {
      const inner = card.querySelector('.hl-card-inner');
      if (!inner) return;
      const offset = sl - i * step;
      const ratio = offset / step;
      const tx = -offset * PARALLAX_SPEED;
      const op = Math.max(0, 1 - Math.abs(ratio) * 1.5);
      inner.style.transition = 'none';
      inner.style.transform = `translateX(${tx}px)`;
      inner.style.opacity = op;
    });
  }
  function hlGo(i) {
    hlIdx = (i + hlCards.length) % hlCards.length;
    hlTrack.scrollTo({ left: hlIdx * hlStep(), behavior: 'smooth' });
    hlPaint();
    hlSchedule();
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
        const w = getComputedStyle(f).width;
        f.style.animation = 'none';
        f.style.width = w;
      });
    }
  }
  hlPlayBtn.addEventListener('click', () => hlSetPlaying(!hlPlaying));

  let hlDownX = null, hlDragged = false;
  hlTrack.addEventListener('pointerdown', e => { hlDownX = e.clientX; hlDragged = false; }, { passive: true });
  hlTrack.addEventListener('pointermove', e => { if (hlDownX != null && Math.abs(e.clientX - hlDownX) > 8) hlDragged = true; }, { passive: true });
  window.addEventListener('pointerup', () => { hlDownX = null; });
  hlCards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => { if (!hlDragged) hlGo(i); });
  });

  let hlRAF;
  hlTrack.addEventListener('scroll', () => {
    cancelAnimationFrame(hlParaRAF);
    hlParaRAF = requestAnimationFrame(hlParallax);
    cancelAnimationFrame(hlRAF);
    hlRAF = requestAnimationFrame(() => {
      const i = Math.round(hlTrack.scrollLeft / hlStep());
      if (i !== hlIdx && i >= 0 && i < hlCards.length) {
        hlIdx = i; hlPaint(); hlSchedule();
      }
    });
  }, { passive: true });

  new IntersectionObserver(es => {
    es.forEach(e => {
      hlVisible = e.isIntersecting;
      if (hlVisible) { hlPaint(); hlSchedule(); }
      else clearTimeout(hlTimer);
    });
  }, { threshold: 0.3 }).observe(hlTrack);

  if (hlReduced) hlControls.classList.add('paused');
  hlPaint();
  hlParallax();
  hlSchedule();
}

const rTrack = document.getElementById('rTrack');
const rCards = rTrack ? [...rTrack.querySelectorAll('.r-card')] : [];
const rPrev = document.getElementById('rPrev');
const rNext = document.getElementById('rNext');
if (rTrack && rCards.length && rPrev && rNext) {
  let rIdx = 0;
  function rStep() { return rCards[0].offsetWidth + 20; }
  function rSync() {
    rIdx = Math.round(rTrack.scrollLeft / rStep());
    rPrev.disabled = rTrack.scrollLeft <= 4;
    rNext.disabled = rTrack.scrollLeft >= rTrack.scrollWidth - rTrack.clientWidth - 4;
  }
  function rGo(i) {
    const target = Math.max(0, Math.min(i, rCards.length - 1));
    rTrack.scrollTo({ left: target * rStep(), behavior: 'smooth' });
  }
  rPrev.addEventListener('click', () => rGo(rIdx - 1));
  rNext.addEventListener('click', () => rGo(rIdx + 1));
  rTrack.addEventListener('scroll', rSync, { passive: true });
  rSync();

  const dataEl = document.getElementById('researchModalData');
  const rData = dataEl ? JSON.parse(dataEl.textContent || '[]') : [];
  const rModal = document.getElementById('rModal');
  const rmLabel = document.getElementById('rmLabel');
  const rmTitle = document.getElementById('rmTitle');
  const rmBody = document.getElementById('rmBody');
  const rmX = document.getElementById('rmX');
  let rmLastFocus = null;

  function rOpen(i) {
    const d = rData[i];
    if (!d || !rModal || !rmLabel || !rmTitle || !rmBody || !rmX) return;
    rmLabel.textContent = d.label;
    rmTitle.textContent = d.title;
    rmBody.innerHTML = d.body;
    rmLastFocus = document.activeElement;
    rModal.classList.add('open');
    rModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    rmX.focus();
  }
  function rClose() {
    if (!rModal) return;
    rModal.classList.remove('open');
    rModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (rmLastFocus) { try { rmLastFocus.focus(); } catch (_) {} }
  }

  let rDownX = null, rDragged = false;
  rTrack.addEventListener('pointerdown', e => { rDownX = e.clientX; rDragged = false; }, { passive: true });
  rTrack.addEventListener('pointermove', e => { if (rDownX != null && Math.abs(e.clientX - rDownX) > 8) rDragged = true; }, { passive: true });
  window.addEventListener('pointerup', () => { rDownX = null; });
  rCards.forEach((card, i) => {
    card.addEventListener('click', () => { if (!rDragged) rOpen(i); });
  });
  rModal?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', rClose));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && rModal?.classList.contains('open')) rClose(); });
}

const baWrap = document.getElementById('baWrap');
const baClip = document.getElementById('baClip');
const baLine = document.getElementById('baLine');
const baKnob = document.getElementById('baKnob');
if (baWrap && baClip && baLine && baKnob) {
  let dragging = false;
  function setPct(pct) {
    pct = Math.max(5, Math.min(95, pct));
    baClip.style.width = pct + '%';
    baLine.style.left = pct + '%';
    baKnob.style.left = pct + '%';
  }
  function fromEvent(e) {
    const rect = baWrap.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    return ((x - rect.left) / rect.width) * 100;
  }
  setPct(50);
  baWrap.addEventListener('mousedown', e => { dragging = true; setPct(fromEvent(e)); });
  baWrap.addEventListener('touchstart', e => { dragging = true; setPct(fromEvent(e)); }, { passive: true });
  window.addEventListener('mousemove', e => { if (dragging) setPct(fromEvent(e)); });
  window.addEventListener('touchmove', e => { if (dragging) setPct(fromEvent(e)); }, { passive: true });
  window.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('touchend', () => { dragging = false; });
}

document.querySelectorAll('.bac-card').forEach(card => {
  const clip = card.querySelector('.bac-clip');
  const line = card.querySelector('.bac-line');
  const knob = card.querySelector('.bac-knob');
  if (!clip || !line || !knob) return;
  let drag = false, pid = null;
  const set = pct => {
    pct = Math.max(6, Math.min(94, pct));
    clip.style.width = pct + '%';
    line.style.left = pct + '%';
    knob.style.left = pct + '%';
  };
  const pctFrom = e => {
    const r = card.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };
  knob.addEventListener('pointerdown', e => {
    drag = true; pid = e.pointerId;
    knob.setPointerCapture(pid);
    e.preventDefault();
  });
  knob.addEventListener('pointermove', e => { if (drag) set(pctFrom(e)); });
  const end = () => { drag = false; if (pid != null) { try { knob.releasePointerCapture(pid); } catch (_) {} pid = null; } };
  knob.addEventListener('pointerup', end);
  knob.addEventListener('pointercancel', end);
  set(50);
});
