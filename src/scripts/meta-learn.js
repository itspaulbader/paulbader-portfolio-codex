const goalsSection = document.getElementById('values');
const goalCloud = document.getElementById('goalsMoment');
const goalBubbles = goalCloud ? [...goalCloud.querySelectorAll('.goal-bubble')] : [];
if (goalsSection && goalCloud && goalBubbles.length) {
  const goalsReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let goalsRAF = null;
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const easeScroll = t => 1 - Math.pow(1 - t, 3);
  function renderGoals() {
    goalsRAF = null;
    const rect = goalsSection.getBoundingClientRect();
    const total = Math.max(1, goalsSection.offsetHeight - innerHeight);
    const raw = goalsReduced ? 1 : clamp01(-rect.top / total);
    const grouped = easeScroll(clamp01(raw / 0.68));
    const vision = clamp01((raw - 0.66) / 0.24);
    const fadeIn = clamp01((innerHeight * 0.82 - rect.top) / (innerHeight * 0.46));
    const fadeOut = clamp01((rect.bottom - innerHeight * 0.18) / (innerHeight * 0.46));
    const bg = goalsReduced ? 1 : Math.min(fadeIn, fadeOut);
    goalsSection.style.setProperty('--goal-vision', vision.toFixed(3));
    goalsSection.style.setProperty('--goal-bg', bg.toFixed(3));
    const cloudRect = goalCloud.getBoundingClientRect();
    const vw = cloudRect.width / 100;
    const vh = cloudRect.height / 100;
    goalBubbles.forEach(bubble => {
      const x0 = Number(bubble.dataset.x0 || 0) * vw;
      const y0 = Number(bubble.dataset.y0 || 0) * vh;
      const x1 = Number(bubble.dataset.x1 || 0) * vw;
      const y1 = Number(bubble.dataset.y1 || 0) * vh;
      const s0 = Number(bubble.dataset.s0 || 1);
      const s1 = Number(bubble.dataset.s1 || 1);
      const x = x0 + (x1 - x0) * grouped;
      const y = y0 + (y1 - y0) * grouped;
      const scale = s0 + (s1 - s0) * grouped;
      const groupedOpacity = bubble.classList.contains('is-main') ? 1 : 0.58;
      const baseOpacity = 1 + (groupedOpacity - 1) * grouped;
      const finalOpacity = Math.max(0.12, baseOpacity * (1 - vision * 0.78));
      bubble.style.setProperty('--tx', `${x.toFixed(1)}px`);
      bubble.style.setProperty('--ty', `${y.toFixed(1)}px`);
      bubble.style.setProperty('--sc', scale.toFixed(3));
      bubble.style.setProperty('--op', finalOpacity.toFixed(3));
    });
  }
  function queueGoals() {
    if (!goalsRAF) goalsRAF = requestAnimationFrame(renderGoals);
  }
  renderGoals();
  window.addEventListener('scroll', queueGoals, { passive: true });
  window.addEventListener('resize', queueGoals);
}

const explorePhone = document.getElementById('explorePhone');
const exploreViewer = document.querySelector('.explore-viewer');
const exploreControls = document.getElementById('exploreControls');
const explorePills = [...document.querySelectorAll('.explore-pill')];
const exploreClose = document.getElementById('exploreClose');
const explorePrev = document.getElementById('explorePrev');
const exploreNext = document.getElementById('exploreNext');
if (explorePhone && exploreViewer && exploreControls && explorePills.length && exploreClose && explorePrev && exploreNext) {
  const exploreMobile = matchMedia('(max-width: 599px)');
  let exploreIdx = 0;
  function setExplore(i, expand = !exploreMobile.matches) {
    exploreIdx = (i + explorePills.length) % explorePills.length;
    const pill = explorePills[exploreIdx];
    if (!pill) return;
    explorePills.forEach(p => {
      p.classList.remove('is-active');
      p.classList.remove('is-expanded');
    });
    pill.classList.add('is-active');
    if (expand) pill.classList.add('is-expanded');
    exploreViewer.classList.toggle('is-expanded', expand);
    explorePrev.disabled = exploreIdx === 0;
    exploreNext.disabled = exploreIdx === explorePills.length - 1;
    explorePhone.classList.add('is-changing');
    const nextScreen = pill.dataset.screen || '0';
    const nextAlt = pill.dataset.alt || 'Abstract mobile interface placeholder';
    setTimeout(() => {
      explorePhone.dataset.screen = nextScreen;
      explorePhone.setAttribute('aria-label', nextAlt);
      explorePhone.classList.remove('is-changing');
    }, 140);
  }
  explorePills.forEach((pill, i) => {
    pill.addEventListener('click', () => {
      setExplore(i);
      if (exploreMobile.matches) pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
  });
  exploreClose.addEventListener('click', () => setExplore(exploreIdx, false));
  explorePrev.addEventListener('click', () => setExplore(exploreIdx - 1));
  exploreNext.addEventListener('click', () => setExplore(exploreIdx + 1));
  let exploreScrollFrame = null;
  exploreControls.addEventListener('scroll', () => {
    if (!exploreMobile.matches || exploreScrollFrame) return;
    exploreScrollFrame = requestAnimationFrame(() => {
      exploreScrollFrame = null;
      const rail = exploreControls.getBoundingClientRect();
      let nearest = exploreIdx;
      let nearestDistance = Infinity;
      explorePills.forEach((pill, index) => {
        const rect = pill.getBoundingClientRect();
        const distance = Math.abs(rect.left - rail.left);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      if (nearest !== exploreIdx) setExplore(nearest, false);
    });
  }, { passive: true });
  setExplore(0, false);
}

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
      if (on) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
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
  let rmInertTargets = [];

  function rFocusable() {
    if (!rModal) return [];
    return [...rModal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
  }

  function rSetBackgroundInert(inert) {
    if (!rModal) return;
    if (inert) {
      rmInertTargets = [...document.body.children].filter(el => el !== rModal);
      rmInertTargets.forEach(el => { el.inert = true; });
    } else {
      rmInertTargets.forEach(el => { el.inert = false; });
      rmInertTargets = [];
    }
  }

  function rOpen(i) {
    const d = rData[i];
    if (!d || !rModal || !rmLabel || !rmTitle || !rmBody || !rmX) return;
    rmLabel.textContent = d.label;
    rmTitle.textContent = d.title;
    rmBody.innerHTML = d.body;
    rmLastFocus = document.activeElement;
    rModal.classList.add('open');
    rModal.setAttribute('aria-hidden', 'false');
    rSetBackgroundInert(true);
    document.body.style.overflow = 'hidden';
    rmX.focus();
  }
  function rClose() {
    if (!rModal) return;
    rModal.classList.remove('open');
    rModal.setAttribute('aria-hidden', 'true');
    rSetBackgroundInert(false);
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
  document.addEventListener('keydown', e => {
    if (!rModal?.classList.contains('open')) return;
    if (e.key === 'Escape') {
      rClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = rFocusable();
    if (!focusable.length) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
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
    const value = Math.round(pct);
    baKnob.setAttribute('aria-valuenow', String(value));
    baKnob.setAttribute('aria-valuetext', `${value}% after view`);
  }
  function fromEvent(e) {
    const rect = baWrap.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    return ((x - rect.left) / rect.width) * 100;
  }
  setPct(50);
  baWrap.addEventListener('mousedown', e => { dragging = true; setPct(fromEvent(e)); });
  baWrap.addEventListener('touchstart', e => { dragging = true; setPct(fromEvent(e)); }, { passive: true });
  baKnob.addEventListener('keydown', e => {
    const current = Number(baKnob.getAttribute('aria-valuenow') || 50);
    let next = current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = current - 5;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = current + 5;
    else if (e.key === 'Home') next = 5;
    else if (e.key === 'End') next = 95;
    else return;
    e.preventDefault();
    setPct(next);
  });
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
    const value = Math.round(pct);
    knob.setAttribute('aria-valuenow', String(value));
    knob.setAttribute('aria-valuetext', `${value}% after view`);
  };
  const pctFrom = e => {
    const r = card.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };
  const touchPctFrom = e => {
    const r = card.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    return ((touch.clientX - r.left) / r.width) * 100;
  };
  knob.addEventListener('pointerdown', e => {
    drag = true; pid = e.pointerId;
    knob.setPointerCapture(pid);
    e.preventDefault();
  });
  knob.addEventListener('pointermove', e => { if (drag) set(pctFrom(e)); });
  knob.addEventListener('touchstart', e => { drag = true; set(touchPctFrom(e)); }, { passive: true });
  knob.addEventListener('touchmove', e => { if (drag) set(touchPctFrom(e)); }, { passive: true });
  knob.addEventListener('keydown', e => {
    const current = Number(knob.getAttribute('aria-valuenow') || 50);
    let next = current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = current - 5;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = current + 5;
    else if (e.key === 'Home') next = 6;
    else if (e.key === 'End') next = 94;
    else return;
    e.preventDefault();
    set(next);
  });
  const end = () => { drag = false; if (pid != null) { try { knob.releasePointerCapture(pid); } catch (_) {} pid = null; } };
  knob.addEventListener('pointerup', end);
  knob.addEventListener('pointercancel', end);
  knob.addEventListener('touchend', end);
  knob.addEventListener('touchcancel', end);
  set(50);
});
