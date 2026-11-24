'use client';

import { useEffect, useState } from 'react';
import { getOpenStatus, type OpenStatus as Status } from '@/lib/hours';

// The status depends on the visitor's clock, so it is filled in after the page loads
// (the space is held so nothing shifts) and refreshed every 30 seconds.
export default function OpenStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') update();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <span className={`book-open${status && !status.open ? ' is-closed' : ''}${status ? '' : ' is-pending'}`} aria-live="polite">
      <span className="dot" aria-hidden="true" />
      <span>{status ? status.label : 'Now open'}</span>
    </span>
  );
}
