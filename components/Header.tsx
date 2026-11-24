'use client';

import { useEffect, useRef, useState } from 'react';
import { openTableUrl, site } from '@/data/site';

const links = [
  { href: '#menu', label: 'Winter menu' },
  { href: '#drinks', label: 'Cocktails' },
  { href: '#visit', label: 'Visit' },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      document.documentElement.classList.toggle('past-hero', window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label="Portside Fusion home" onClick={close}>
          <img src="/logo-cream.png" alt="" width={48} height={48} />
          <span className="serif">Portside Fusion</span>
        </a>
        <nav aria-label="Main" className="nav">
          {links.map((l) => (
            <a key={l.href} className="nl ul" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="nl ul nav-phone" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <a className="btn btn-brass btn-sm" href={openTableUrl()} target="_blank" rel="noopener">
            Reserve
          </a>
          <button
            ref={toggleBtn}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
            )}
          </button>
        </nav>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="wrap mobile-menu-inner">
          <nav aria-label="Mobile" className="mobile-links">
            {links.map((l, i) => (
              <a key={l.href} ref={i === 0 ? firstLink : undefined} href={l.href} className="serif" onClick={close}>
                {l.label}
              </a>
            ))}
            <a href="#reserve" className="serif" onClick={close}>
              Reservations
            </a>
          </nav>
          <div className="mobile-meta">
            <a className="btn btn-brass" href={openTableUrl()} target="_blank" rel="noopener">
              Find a table
            </a>
            <a className="btn btn-line" href={site.phoneHref}>
              Call {site.phoneDisplay}
            </a>
            <p>{site.hours}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
