'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      setPaused(true);
      return;
    }
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => setPaused(true));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <div className="hero-media" data-hero-media aria-hidden="true">
        <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.jpg">
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <button type="button" className="video-toggle" onClick={toggle} aria-label={paused ? 'Play background video' : 'Pause background video'}>
        {paused ? (
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
        ) : (
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
        )}
      </button>
    </>
  );
}
