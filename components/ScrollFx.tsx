'use client';

import { useEffect } from 'react';

/**
 * Scroll animations for the whole page.
 * - Elements with data-reveal ("up" | "img" | "fade") animate in once when they enter the viewport.
 *   A --d custom property on the element staggers the delay.
 * - The hero copy drifts and fades as the hero scrolls away (one scroll-linked moment).
 * - With prefers-reduced-motion everything simply shows, nothing moves.
 */
export default function ScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    const hero = document.querySelector<HTMLElement>('[data-hero-copy]');
    const media = document.querySelector<HTMLElement>('[data-hero-media]');
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const h = window.innerHeight || 1;
      const t = Math.min(1, Math.max(0, y / (h * 0.85)));
      if (hero) {
        hero.style.transform = `translate3d(0, ${t * 70}px, 0)`;
        hero.style.opacity = String(1 - t * 0.85);
      }
      if (media) media.style.transform = `scale(${1 + t * 0.06})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
