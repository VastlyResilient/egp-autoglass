/* Shared: menu (the reference's button had no handler), reveals, year. */
(() => {
  const root = document.documentElement, btn = document.querySelector('.header-menu'), menu = document.getElementById('menu');
  if (btn && menu) {
    menu.inert = true;
    const items = () => [...menu.querySelectorAll('a')];
    const set = (open) => {
      root.classList.toggle('menu-open', open); btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); menu.inert = !open;
      document.querySelectorAll('.header-login, .header-logo, .header-nav').forEach((el) => { el.inert = open; });
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) items()[0]?.focus(); else btn.focus({ preventScroll: true });
    };
    btn.addEventListener('click', () => set(!root.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => {
      if (!root.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); set(false); }
      if (e.key === 'Tab') { const f = [btn, ...items()], i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f.at(-1).focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    });
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const els = [...document.querySelectorAll('.rv')].filter((el) => el.getBoundingClientRect().top > innerHeight * 0.92);
    els.forEach((el) => el.classList.add('pre'));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    setTimeout(() => els.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.remove('pre'); }), 2500);
  }
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
/* header fade: off at the very top of the film (text-free opening), on once scrolled */
(() => { const h = document.querySelector('.header'); if (!h) return; let q = false;
  const f = () => { q = false; h.style.setProperty('--hdr-fade', scrollY > 40 ? '1' : '0'); };
  addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(f); } }, { passive: true }); f(); })();
