'use client';

import { useEffect, useRef, useState } from 'react';
import { openTableUrl, site } from '@/data/site';

// Same header behaviour as coastlinefilms.ca: full-width and transparent over the hero,
// then it tightens into a centred frosted pill once the page scrolls.
const links = [
  { href: '#menu', label: 'Winter menu' },
  { href: '#drinks', label: 'Cocktails' },
  { href: '#visit', label: 'Patio' },
  { href: '#reserve', label: 'Reservations' },
];

function Arrow() {
  return (
    <svg className="pf-nav__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      document.documentElement.classList.toggle('past-hero', window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The reserve pill leans toward the cursor as it gets close (desktop only, like coastlinefilms.ca).
  useEffect(() => {
    const el = cta.current;
    if (!el) return;
    const still =
      window.matchMedia('(max-width: 991px)').matches ||
      'ontouchstart' in window ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) return;
    const MAX = 18;
    const RANGE = 280;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > RANGE) {
        el.style.transform = '';
        return;
      }
      const s = 1 - d / RANGE;
      el.style.transform = `perspective(500px) rotateY(${(dx / RANGE) * MAX}deg) rotateX(${(-dy / RANGE) * MAX}deg) scale(${1 + 0.06 * s})`;
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burger.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`pf-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="pf-nav__inner">
        <a href="#top" className="pf-nav__logo" aria-label="Portside Fusion home">
          <img src="/logo-cream.png" alt="" width={48} height={48} />
          <span className="serif">Portside Fusion</span>
        </a>
        <nav className="pf-nav__links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="pf-nav__link">
              <span className="pf-nav__t">{l.label}</span>
              <span className="pf-nav__t is-on" aria-hidden="true">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="pf-nav__right">
          <a ref={cta} className="pf-nav__cta" href={openTableUrl()} target="_blank" rel="noopener">
            Reserve a table <Arrow />
          </a>
          <button
            ref={burger}
            type="button"
            className="pf-nav__burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`pf-nav__mobile${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <button ref={closeBtn} type="button" className="pf-nav__mobile-close" aria-label="Close menu" onClick={close} tabIndex={open ? 0 : -1}>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <a href="#top" className="pf-nav__mobile-logo" aria-label="Portside Fusion home" onClick={close} tabIndex={open ? 0 : -1}>
          <img src="/logo-cream.png" alt="" width={56} height={56} />
        </a>
        <nav className="pf-nav__mobile-menu" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="serif" onClick={close} tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
          <a className="pf-nav__mobile-cta" href={openTableUrl()} target="_blank" rel="noopener" onClick={close} tabIndex={open ? 0 : -1}>
            Reserve a table <Arrow />
          </a>
          <a className="pf-nav__mobile-call" href={site.phoneHref} tabIndex={open ? 0 : -1}>
            Call {site.phoneDisplay}
          </a>
          <p className="pf-nav__mobile-hours">{site.hours}</p>
        </nav>
      </div>
    </header>
  );
}
