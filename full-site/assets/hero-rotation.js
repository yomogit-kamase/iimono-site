(() => {
  const initialize = () => {
    document.querySelectorAll('[data-hero-rotation]').forEach((rotator) => {
      if (rotator.dataset.heroInitialized === 'true') return;

      const slides = [...rotator.querySelectorAll('[data-hero-slide]')];
      const dots = [...rotator.querySelectorAll('[data-hero-dot]')];
      if (slides.length < 2) return;

      rotator.dataset.heroInitialized = 'true';
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let current = 0;
      let timer = null;

      const show = (index) => {
        current = (index + slides.length) % slides.length;
        rotator.dataset.heroIndex = String(current);
        slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
        dots.forEach((dot, dotIndex) => {
          const active = dotIndex === current;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-current', String(active));
        });
      };

      const stop = () => {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
      };

      const start = () => {
        stop();
        if (!reducedMotion && !document.hidden) {
          timer = window.setInterval(() => show(current + 1), 8000);
        }
      };

      dots.forEach((dot, index) => dot.addEventListener('click', () => {
        show(index);
        start();
      }));
      rotator.addEventListener('pointerenter', stop);
      rotator.addEventListener('pointerleave', start);
      rotator.addEventListener('focusin', stop);
      rotator.addEventListener('focusout', start);
      document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

      show(0);
      start();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
