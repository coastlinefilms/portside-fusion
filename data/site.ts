export const site = {
  name: 'Portside Fusion',
  url: 'https://portsidefusion.com',
  phoneDisplay: '+1 (705) 765-0003',
  phoneHref: 'tel:+17057650003',
  email: 'Joe@portsidefusion.com',
  emailHref: 'mailto:joe@portsidefusion.com',
  street: '98 Joseph St',
  locality: 'Port Carling',
  region: 'ON',
  postal: 'P0B 1J0',
  hours: 'Tuesday to Sunday, Noon - 10pm',
  openTableId: '1042168',
  directions:
    'https://www.google.com/maps/dir//portside/@45.1187111,-79.5806272,15.79z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4d2af57269e96603:0xc0b63c6e3aab158d!2m2!1d-79.5772946!2d45.1187464?entry=ttu',
  instagram: 'https://www.instagram.com/portsidefusion',
  facebook: 'https://www.facebook.com/portsidefusion',
  geo: { lat: 45.1187464, lng: -79.5772946 },
};

export function openTableUrl(opts?: { date?: string; time?: string; covers?: number }) {
  const p = new URLSearchParams({ rid: site.openTableId, restref: site.openTableId, lang: 'en-CA' });
  if (opts?.date && opts?.time) p.set('datetime', `${opts.date}T${opts.time}`);
  if (opts?.covers) p.set('covers', String(opts.covers));
  return `https://www.opentable.ca/restref/client/?${p.toString()}`;
}
