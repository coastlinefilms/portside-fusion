'use client';

import { useEffect, useId, useState } from 'react';
import { openTableUrl, site } from '@/data/site';
import OpenStatus from '@/components/OpenStatus';

const times: { value: string; label: string }[] = [];
for (let h = 12; h <= 21; h++) {
  for (const m of [0, 30]) {
    if (h === 21 && m === 30) continue;
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const label = `${h === 12 ? 12 : h - 12}:${mm} ${h === 12 ? 'p.m.' : 'p.m.'}`;
    times.push({ value: `${hh}:${mm}`, label: h === 12 && m === 0 ? 'Noon' : label });
  }
}

function today() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

export default function BookingForm({ variant }: { variant: 'hero' | 'full' }) {
  const id = useId();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [covers, setCovers] = useState(2);

  useEffect(() => setDate(today()), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(openTableUrl({ date: date || today(), time, covers }), '_blank', 'noopener');
  };

  if (variant === 'hero') {
    return (
      <form className="book" onSubmit={submit} aria-label="Find a table">
        <div className="book-fact">
          <OpenStatus />
          <span className="book-hours">{site.hours}</span>
        </div>
        <label className="sel" htmlFor={`${id}-d`}>
          Date
          <input id={`${id}-d`} type="date" value={date} min={date || undefined} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="sel" htmlFor={`${id}-t`}>
          Time
          <select id={`${id}-t`} value={time} onChange={(e) => setTime(e.target.value)}>
            {times.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="sel" htmlFor={`${id}-p`}>
          Party
          <select id={`${id}-p`} value={covers} onChange={(e) => setCovers(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-brass book-btn">Find a table</button>
      </form>
    );
  }

  return (
    <form className="book-full" onSubmit={submit} aria-label="Make a reservation">
      <div className="fields">
        <label className="fld" htmlFor={`${id}-fd`}>
          Date
          <input id={`${id}-fd`} type="date" value={date} min={date || undefined} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="fld" htmlFor={`${id}-ft`}>
          Time
          <select id={`${id}-ft`} value={time} onChange={(e) => setTime(e.target.value)}>
            {times.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="fld" htmlFor={`${id}-fp`}>
          Party
          <select id={`${id}-fp`} value={covers} onChange={(e) => setCovers(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="btn btn-brass btn-block">Find a table</button>
    </form>
  );
}
