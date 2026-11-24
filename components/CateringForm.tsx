'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { site } from '@/data/site';

export const eventTypes = ['Corporate event', 'Birthday party', 'Wedding', 'Holiday event', 'Something else'] as const;

type Errors = Partial<Record<'type' | 'date' | 'guests' | 'name', string>>;

function today() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function prettyDate(v: string) {
  const [y, m, d] = v.split('-').map(Number);
  if (!y || !m || !d) return v;
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// Builds a ready-to-send email to Joe. No server, no stored data: the guest's own mail app sends it.
function mailtoFor(f: { type: string; date: string; guests: string; name: string; phone: string; details: string }) {
  const subject = `Catering enquiry: ${f.type}, ${prettyDate(f.date)}, ${f.guests} guests`;
  const lines = [
    'Hi Joe,',
    '',
    "I'd like to ask about catering.",
    '',
    `Event: ${f.type}`,
    `Date: ${prettyDate(f.date)}`,
    `Guests: ${f.guests}`,
    `Name: ${f.name}`,
    f.phone ? `Phone: ${f.phone}` : '',
    '',
    f.details ? `Details:\n${f.details}` : '',
    '',
    'Thanks,',
    f.name,
  ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
  const to = site.emailHref.replace('mailto:', '');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`;
}

export default function CateringForm() {
  const id = useId();
  const [min, setMin] = useState<string | undefined>();
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sentHref, setSentHref] = useState('');
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMin(today()), []);

  // The event-type links in the section intro preselect their type here as they jump to the form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>('[data-catering-type]');
      const t = a?.dataset.cateringType;
      if (t && (eventTypes as readonly string[]).includes(t)) {
        setSentHref('');
        setType(t);
        setErrors((x) => ({ ...x, type: undefined }));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const check = (): Errors => {
    const e: Errors = {};
    if (!type) e.type = 'Choose the type of event.';
    if (!date) e.date = 'Add the date of your event.';
    const g = Number(guests);
    if (!guests || !Number.isFinite(g) || g < 1) e.guests = 'Add roughly how many guests.';
    if (!name.trim()) e.name = 'Add your name so Joe knows who to reply to.';
    return e;
  };

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = check();
    setErrors(e);
    const first = (['type', 'date', 'guests', 'name'] as const).find((k) => e[k]);
    if (first) {
      const el = ev.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }
    const href = mailtoFor({ type, date, guests, name: name.trim(), phone: phone.trim(), details: details.trim() });
    setSentHref(href);
    window.location.href = href;
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  const clear = (k: keyof Errors) => setErrors((x) => (x[k] ? { ...x, [k]: undefined } : x));

  if (sentHref) {
    return (
      <div className="cform cform-done" ref={doneRef} tabIndex={-1} role="status">
        <h3 className="cform-title">Your enquiry is ready to send</h3>
        <p className="cform-note">
          Your email app should have opened with everything filled in. Press send and Joe will get back to you with a menu and a quote.
        </p>
        <p className="cform-note">
          If nothing opened, email <a className="ul" href={site.emailHref}>{site.email}</a> or call{' '}
          <a className="ul" href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
        <div className="cform-done-actions">
          <a className="btn btn-brass" href={sentHref}>Open the email again</a>
          <button type="button" className="btn btn-line" onClick={() => setSentHref('')}>Edit the details</button>
        </div>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
      <h3 className="cform-title" id={`${id}-title`}>Tell us about your event</h3>

      <fieldset className="chips" aria-describedby={errors.type ? `${id}-type-err` : undefined}>
        <legend className="cform-lbl">Type of event</legend>
        <div className="chips-row">
          {eventTypes.map((t, i) => (
            <label key={t} className={`chip${type === t ? ' is-on' : ''}`}>
              <input
                type="radio"
                name={`${id}-type`}
                value={t}
                checked={type === t}
                data-field={i === 0 ? 'type' : undefined}
                onChange={() => {
                  setType(t);
                  clear('type');
                }}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {errors.type ? <p className="ferr" id={`${id}-type-err`}>{errors.type}</p> : null}
      </fieldset>

      <div className="cform-row">
        <label className="fld" htmlFor={`${id}-date`}>
          Event date
          <input
            id={`${id}-date`}
            data-field="date"
            type="date"
            min={min}
            value={date}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? `${id}-date-err` : undefined}
            onChange={(e) => {
              setDate(e.target.value);
              clear('date');
            }}
          />
          {errors.date ? <span className="ferr" id={`${id}-date-err`}>{errors.date}</span> : null}
        </label>
        <label className="fld" htmlFor={`${id}-guests`}>
          Number of guests
          <input
            id={`${id}-guests`}
            data-field="guests"
            type="number"
            inputMode="numeric"
            min={1}
            value={guests}
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? `${id}-guests-err` : undefined}
            onChange={(e) => {
              setGuests(e.target.value);
              clear('guests');
            }}
          />
          {errors.guests ? <span className="ferr" id={`${id}-guests-err`}>{errors.guests}</span> : null}
        </label>
      </div>

      <div className="cform-row">
        <label className="fld" htmlFor={`${id}-name`}>
          Your name
          <input
            id={`${id}-name`}
            data-field="name"
            type="text"
            autoComplete="name"
            value={name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            onChange={(e) => {
              setName(e.target.value);
              clear('name');
            }}
          />
          {errors.name ? <span className="ferr" id={`${id}-name-err`}>{errors.name}</span> : null}
        </label>
        <label className="fld" htmlFor={`${id}-phone`}>
          <span>Phone <span className="opt">(optional)</span></span>
          <input id={`${id}-phone`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>

      <label className="fld" htmlFor={`${id}-details`}>
        <span>Anything we should know <span className="opt">(optional)</span></span>
        <textarea
          id={`${id}-details`}
          rows={3}
          value={details}
          placeholder="Location, timing, dietary needs"
          onChange={(e) => setDetails(e.target.value)}
        />
      </label>

      <button type="submit" className="btn btn-brass btn-block cform-btn">Send catering enquiry</button>
      <p className="cform-note">
        This opens your email app with the details filled in, addressed to {site.email}. Prefer to talk? Call{' '}
        <a className="ul" href={site.phoneHref}>{site.phoneDisplay}</a>.
      </p>
    </form>
  );
}
