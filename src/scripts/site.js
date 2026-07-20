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
  const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260;
  setTimeout(() => { location.href = destination.href; }, delay);
});

addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));

const wordmark = document.querySelector('.footer-wordmark');
if (wordmark) {
  window.addEventListener('scroll', () => {
    const r = wordmark.closest('footer').getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      wordmark.style.transform = `translateX(${(1 - r.top / window.innerHeight) * -34}px)`;
    }
  }, { passive: true });
}

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
