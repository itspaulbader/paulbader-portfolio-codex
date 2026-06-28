/* components.js — Single source of truth for nav + footer across all pages.
   Pages must define --gutter, --bg, --ease, --ease-spring in :root. */
(function () {

  /* ── SHARED STYLES ── */
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .topbar {
        width: 100%;
        padding: 11px var(--gutter);
        display: flex; align-items: center; justify-content: space-between;
        background: white;
        position: relative; z-index: 10;
        box-sizing: border-box;
      }
      .topbar-name { font-size: 12px; font-weight: 400; color: #1d1d1f; text-decoration: none; letter-spacing: 0; }
      .topbar-links { display: flex; gap: 24px; list-style: none; }
      .topbar-links a { font-size: 12px; font-weight: 400; color: #1d1d1f; text-decoration: none; opacity: 0.9; transition: opacity 0.2s; }
      .topbar-links a:hover { opacity: 0.55; }

      @keyframes page-enter {
        from { opacity: 0; transform: translateY(2px); }
        to { opacity: 1; transform: translateY(0); }
      }
      body { animation: page-enter 260ms var(--ease) both; }
      body.page-leaving {
        opacity: 0;
        transform: translateY(-2px);
        transition: opacity 160ms ease, transform 200ms var(--ease);
        pointer-events: none;
      }
      @media (prefers-reduced-motion: reduce) {
        body { animation: none; }
        body.page-leaving { transition: none; transform: none; }
      }

      footer { background: #f5f5f7; color: #1d1d1f; padding: clamp(40px, 5vw, 80px) var(--gutter); }
      .footer-card { max-width: 1260px; margin: 0 auto; background: transparent; border-radius: 0; overflow: visible; }
      .footer-inner {
        padding: 88px 0 0;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
        gap: 0 48px;
        align-items: end;
      }
      .footer-cta { grid-column: 1; grid-row: 1; font-size: clamp(36px, 4.2vw, 60px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.15; color: #1d1d1f; margin-bottom: 0; }
      .footer-cta > span:not(.footer-word) { color: #86868b; }
      .footer-word { display: inline-block; color: #1d1d1f; }
      .footer-row { grid-column: 2; grid-row: 1; display: flex; flex-direction: column; align-items: flex-end; text-align: right; gap: 16px; border-top: none; padding: 0; justify-content: flex-end; }
      .footer-label { font-size: 11px; font-weight: 500; letter-spacing: 0; color: #86868b; margin-bottom: 7px; }
      .footer-email {
        font-size: 17px; font-weight: 400; letter-spacing: -0.02em;
        color: #1d1d1f; text-decoration: none;
        transition: color 0.25s var(--ease);
      }
      .footer-email:hover { color: #6e6e73; }
      .footer-socials { display: flex; gap: 8px; }
      .footer-socials a {
        width: 38px; height: 38px; border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.1);
        display: flex; align-items: center; justify-content: center;
        color: #6e6e73; text-decoration: none;
        transition: background 0.32s var(--ease), color 0.32s var(--ease), border-color 0.32s var(--ease), transform 0.4s var(--ease-spring);
      }
      .footer-socials a:hover { background: rgba(0,0,0,0.05); color: #1d1d1f; transform: translateY(-2px); border-color: rgba(0,0,0,0.2); }
      .footer-meta { grid-column: 1 / -1; grid-row: 2; display: flex; justify-content: space-between; padding: 18px 0; border-top: 1px solid rgba(0,0,0,0.07); margin-top: 48px; }
      .footer-meta span { font-size: 11.5px; color: #86868b; font-weight: 500; }
      .footer-wordmark {
        font-size: clamp(50px, 10vw, 156px); font-weight: 700; letter-spacing: -0.04em;
        line-height: 0.9; color: #1d1d1f; white-space: nowrap;
        padding: 32px 0 0; will-change: transform;
        text-align: center;
      }
      @media (max-width: 899px) {
        footer { padding: clamp(32px, 4vw, 64px) var(--gutter); }
        .footer-inner { padding: 64px 0 0; display: block; }
        .footer-cta { font-size: clamp(24px, 4vw, 38px); margin-bottom: 28px; }
        .footer-row { flex-direction: column; align-items: flex-start; text-align: left; gap: 20px; border-top: none; padding: 24px 0 0; }
        .footer-meta { margin-top: 0; }
      }
      @media (max-width: 599px) {
        footer { padding: clamp(24px, 4vw, 48px) var(--gutter); }
        .footer-inner { padding: 40px 0 0; display: block; }
        .footer-cta { font-size: clamp(22px, 7.5vw, 36px); margin-bottom: 28px; }
        .footer-row { flex-direction: column; align-items: flex-start; text-align: left; gap: 20px; border-top: 1px solid rgba(0,0,0,0.1); padding: 24px 0 0; }
        .footer-meta { margin-top: 0; border-top: none; flex-direction: column; gap: 4px; padding: 14px 0; }
        .footer-email { font-size: 15px; }
        .footer-meta span { font-size: 11px; }
        .footer-row > div:last-child .footer-label { text-align: left; }
      }

      .section-progress {
        position: fixed;
        left: clamp(20px, 2.5vw, 40px);
        top: 50%;
        z-index: 80;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 9px;
        transform: translateY(-50%);
        mix-blend-mode: difference;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s var(--ease);
        width: auto;
        padding: 0;
        background: transparent;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        animation: none;
        white-space: normal;
      }
      .section-progress.is-visible { opacity: 1; pointer-events: auto; }
      .section-progress-tick {
        width: 12px;
        height: 3px;
        padding: 0;
        border: 0;
        border-radius: 1px;
        background: rgba(255,255,255,0.28);
        cursor: pointer;
        transform: scaleX(1);
        transition: background 0.3s var(--ease), transform 0.45s var(--ease);
      }
      .section-progress-tick.is-active {
        background: rgba(255,255,255,0.82);
        transform: scaleX(1.35);
      }
      .section-progress-tick:hover { background: rgba(255,255,255,0.58); transform: scaleX(1.2); }
      .section-progress-tick.is-active:hover { background: #fff; transform: scaleX(1.35); }
      @media (max-width: 899px) { .section-progress { display: none; } }
    </style>
  `);

  /* ── NAV ── */
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="topbar">
      <a href="./" class="topbar-name">it's Paul Bader</a>
      <ul class="topbar-links">
        <li><a href="./#work">Work</a></li>
        <li><a href="mailto:hello@itspaulbader.xyz">Contact</a></li>
      </ul>
    </header>
  `);

  /* ── FOOTER ── */
  document.body.insertAdjacentHTML('beforeend', `
    <footer id="contact">
      <div class="footer-card">
      <div class="footer-inner">
        <h2 class="footer-cta reveal">
          Let's <span class="footer-word">design</span><br><span>incredible work together.</span>
        </h2>
        <div class="footer-row reveal reveal-d1">
          <div>
            <p class="footer-label">Email</p>
            <a href="mailto:itspaulbader@gmail.com" class="footer-email">itspaulbader@gmail.com</a>
          </div>
          <div>
            <p class="footer-label">Social</p>
            <div class="footer-socials">
              <a href="https://linkedin.com/in/itspaulbader" target="_blank" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://dribbble.com/itspaulbader" target="_blank" aria-label="Dribbble">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.812 0-1.6.107-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.316-6.386z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-meta">
          <span>Based in Copenhagen, Denmark</span>
          <span>© 2026 It's Paul Bader</span>
        </div>
      </div>
      </div>
    </footer>
  `);

  /* ── CASE-STUDY SECTION PROGRESS ── */
  if (document.body.dataset.case) {
    const sections = [...document.body.querySelectorAll(':scope > section')]
      .filter(section => !section.classList.contains('cs-foot'));

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

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseFloat(e.target.style.getPropertyValue('--d') || 0);
        e.target.style.transitionDelay = d + 's';
        e.target.classList.add('in');
        setTimeout(() => { e.target.style.transitionDelay = '0s'; }, (d + 1.2) * 1000);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── MORE WORK RAIL (case-study pages) ──
     Pulls cards live from index.html's work section instead of hardcoding
     copy/images per page, so editing a case there keeps every case page in sync. */
  const ncRail = document.getElementById('ncRail');
  if (ncRail) {
    const currentCase = document.body.dataset.case || '';
    const fallbackCards = [
      {
        caseId: 'bershka',
        co: 'Bershka',
        titleHTML: 'A smoother<br>self-checkout',
        desc: 'Redesigning the in-store experience to reduce friction and speed up payment.',
        desktopImg: 'images/bershka-desk.png',
        mobileImg: 'images/bershka-desk-mobile2.png',
        href: '#',
        iconHTML: '<img src="images/bershka-icon.jpg" alt="Bershka logo">'
      },
      {
        caseId: 'sheer',
        co: 'Sheer',
        titleHTML: 'Quicker & better<br>onboarding',
        desc: 'Creating a seamless entry point so users could start strong without friction.',
        desktopImg: 'images/sheer-desktop.png',
        mobileImg: 'images/sheer-mobile.png',
        href: '#',
        iconHTML: '<img src="images/sheer-icon.jpeg" alt="Sheer logo">'
      },
      {
        caseId: 'meta-learn',
        co: 'Meta Learn',
        titleHTML: 'Mental fitness,<br>made intuitive',
        desc: 'Meta Learn is a mobile app for stress relief, focus, and emotional resilience.',
        desktopImg: 'images/meta-learn-hero.png',
        mobileImg: 'images/ml-mobile.png',
        href: 'meta-learn.html',
        iconHTML: 'ML',
        iconStyle: 'background:#dbeafe;color:#1d4ed8;'
      },
      {
        caseId: 'grundfos',
        co: 'Grundfos',
        titleHTML: 'From print to<br>PowerApp',
        desc: 'UX-driven internal tool used by 200+, replacing 80% of printed material.',
        desktopImg: 'images/grundfos-hero.png',
        mobileImg: 'images/grundfos-mobile.png',
        href: '#',
        iconHTML: '<img src="images/grundfos-icon.png" alt="Grundfos logo">'
      }
    ];

    function renderCards(cards) {
      ncRail.innerHTML = '';
      cards
        .filter(card => card.caseId !== currentCase)
        .forEach((card, i) => {
          const a = document.createElement('a');
          a.href = card.href || '#';
          a.className = 'nc';
          a.innerHTML = `
            <div class="nc-img" style="--nc-img-desktop:url('${card.desktopImg}'); --nc-img-mobile:url('${card.mobileImg || card.desktopImg}')"></div>
            <div class="nc-copy">
              <div class="nc-meta">
                <span class="nc-icon"></span>
                <span class="nc-co">${card.co}</span>
              </div>
              <p class="nc-title">${card.titleHTML}</p>
              <p class="nc-desc">${card.desc}</p>
            </div>`;
          const ncIcon = a.querySelector('.nc-icon');
          ncIcon.innerHTML = card.iconHTML || '';
          if (card.iconStyle) ncIcon.setAttribute('style', card.iconStyle);
          ncRail.appendChild(a);
        });
    }

    fetch('index.html')
      .then(r => {
        if (!r.ok) throw new Error('index.html unavailable');
        return r.text();
      })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const cards = [...doc.querySelectorAll('.card-featured[data-case]')].map(card => {
          const iconEl = card.querySelector('.card-icon');
          return {
            caseId: card.dataset.case,
            co: card.querySelector('.card-co')?.textContent.trim() || '',
            titleHTML: card.querySelector('.card-title')?.innerHTML || '',
            desc: card.querySelector('.card-desc')?.textContent.trim() || '',
            desktopImg: card.querySelector('.card-visual img')?.getAttribute('src') || '',
            mobileImg: card.querySelector('.card-img-below img')?.getAttribute('src') || card.querySelector('.card-visual img')?.getAttribute('src') || '',
            href: card.querySelector('.btn-soon') ? '#' : (card.querySelector('.card-cta a')?.getAttribute('href') || '#'),
            iconHTML: iconEl?.innerHTML || '',
            iconStyle: iconEl?.getAttribute('style') || ''
          };
        });
        renderCards(cards.length ? cards : fallbackCards);
      })
      .catch(() => renderCards(fallbackCards));
  }

  /* ── SUBTLE PAGE TRANSITIONS ── */
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const destination = new URL(link.href, location.href);
    const samePage = destination.pathname === location.pathname
      && destination.search === location.search;
    if (destination.origin !== location.origin || samePage) return;

    event.preventDefault();
    document.body.classList.add('page-leaving');
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160;
    setTimeout(() => { location.href = destination.href; }, delay);
  });

  addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));

  /* ── FOOTER WORDMARK PARALLAX ── */
  const wordmark = document.querySelector('.footer-wordmark');
  if (wordmark) {
    window.addEventListener('scroll', () => {
      const r = wordmark.closest('footer').getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        wordmark.style.transform = `translateX(${(1 - r.top / window.innerHeight) * -34}px)`;
      }
    }, { passive: true });
  }

  /* ── FOOTER ROTATING WORD ── */
  const footerWord = document.querySelector('.footer-word');
  if (footerWord) {
    const words = ['design', 'build', 'create', 'craft'];
    let wi = 0;
    const ease = 'cubic-bezier(0.22,1,0.36,1)';
    setInterval(() => {
      footerWord.style.transition = 'opacity 0.42s ease-in, transform 0.42s ease-in, filter 0.5s ease-in';
      footerWord.style.opacity = '0';
      footerWord.style.transform = 'translateY(7px)';
      footerWord.style.filter = 'blur(7px)';
      setTimeout(() => {
        wi = (wi + 1) % words.length;
        footerWord.textContent = words[wi];
        footerWord.style.transition = 'none';
        footerWord.style.transform = 'translateY(-5px)';
        footerWord.style.filter = 'blur(7px)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          footerWord.style.transition = `opacity 0.55s ease-out, transform 0.65s ${ease}, filter 0.6s ease-out`;
          footerWord.style.opacity = '1';
          footerWord.style.transform = 'translateY(0)';
          footerWord.style.filter = 'blur(0px)';
        }));
      }, 460);
    }, 3200);
  }

})();
