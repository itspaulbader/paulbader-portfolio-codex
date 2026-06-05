/* components.js — Single source of truth for nav + footer across all pages */
(function () {

  /* ── NAV ── */
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="progress-bar"></div>
    <nav>
      <div class="nav-photo">
        <div class="nav-photo-placeholder">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
        </div>
      </div>
      <a href="/" class="nav-name">it's Paul Bader</a>
      <div class="nav-divider"></div>
      <ul class="nav-links">
        <li><a href="/#work">Work</a></li>
        <li><a href="mailto:itspaulbader@gmail.com">Contact</a></li>
      </ul>
      <span class="nav-dots" id="navDots"><span></span><span></span><span></span></span>
    </nav>
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

  /* ── PROGRESS BAR ── */
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
  }, { passive: true });

  /* ── NAV COMPACT + DOTS ── */
  const nav = document.querySelector('nav');
  let lastScrollY = 0, isCompact = false;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const goingDown = y > lastScrollY;
    lastScrollY = y;
    if (y < 40) {
      if (isCompact) { isCompact = false; nav.classList.remove('compact', 'scrolled'); }
    } else if (goingDown && !isCompact) {
      isCompact = true; nav.classList.add('compact', 'scrolled');
    } else if (!goingDown && isCompact) {
      isCompact = false; nav.classList.remove('compact');
      nav.classList.add('scrolled');
    } else {
      nav.classList.add('scrolled');
    }
  }, { passive: true });

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
