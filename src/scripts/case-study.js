if (document.body.dataset.case) {
  const sections = [...document.body.querySelectorAll(':scope > section')]
    .filter(section => !section.classList.contains('cs-foot') && !section.dataset.progressSkip);

  if (sections.length > 1) {
    const progress = document.createElement('nav');
    progress.className = 'section-progress';
    progress.setAttribute('aria-label', 'Case study sections');

    const ticks = sections.map((section, index) => {
      const tick = document.createElement('button');
      const label = section.querySelector('.eyebrow, [class$="-eyebrow"], h1, h2')?.textContent.trim()
        || `Section ${index + 1}`;
      tick.type = 'button';
      tick.className = 'section-progress-tick';
      tick.setAttribute('aria-label', `Jump to ${label}`);
      tick.title = label;
      tick.addEventListener('click', () => section.scrollIntoView({ behavior: 'smooth' }));
      progress.appendChild(tick);
      return tick;
    });

    document.body.appendChild(progress);

    const setActive = index => ticks.forEach((tick, tickIndex) => {
      tick.classList.toggle('is-active', tickIndex === index);
      tick.setAttribute('aria-current', tickIndex === index ? 'step' : 'false');
    });

    const updateProgress = () => {
      const marker = innerHeight * 0.5;
      let active = 0;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= marker) active = index;
      });
      setActive(active);

      const first = sections[0].getBoundingClientRect();
      const last = sections[sections.length - 1].getBoundingClientRect();
      progress.classList.toggle('is-visible', first.top < innerHeight && last.bottom > 0);
    };

    let progressFrame = null;
    const requestProgressUpdate = () => {
      if (progressFrame) return;
      progressFrame = requestAnimationFrame(() => {
        progressFrame = null;
        updateProgress();
      });
    };
    addEventListener('scroll', requestProgressUpdate, { passive: true });
    addEventListener('resize', requestProgressUpdate, { passive: true });
    updateProgress();
  }
}

const moreWorkRail = document.getElementById('ncRail');
const moreWorkPrev = document.getElementById('ncPrev');
const moreWorkNext = document.getElementById('ncNext');
if (moreWorkRail && moreWorkPrev && moreWorkNext) {
  function ncStep() {
    const card = moreWorkRail.querySelector('.nc');
    return card ? card.offsetWidth + 12 : 392;
  }
  function ncSync() {
    moreWorkPrev.disabled = moreWorkRail.scrollLeft <= 4;
    moreWorkNext.disabled = moreWorkRail.scrollLeft >= moreWorkRail.scrollWidth - moreWorkRail.clientWidth - 4;
  }
  moreWorkPrev.addEventListener('click', () => moreWorkRail.scrollBy({ left: -ncStep(), behavior: 'smooth' }));
  moreWorkNext.addEventListener('click', () => moreWorkRail.scrollBy({ left: ncStep(), behavior: 'smooth' }));
  moreWorkRail.addEventListener('scroll', ncSync, { passive: true });
  moreWorkRail.querySelectorAll('.nc[data-placeholder="true"]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
  });
  requestAnimationFrame(ncSync);
}
