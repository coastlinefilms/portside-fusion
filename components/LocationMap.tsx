'use client';

import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { site } from '@/data/site';

// Location map for the reservation section. MapLibre + OpenFreeMap tiles (no API key),
// retinted to the Portside navy, with a brass compass pin on the restaurant.
// The map library only loads when the section gets close to the screen.
// The worker file in /public/maplibre must match the installed maplibre-gl version.
const WORKER_URL = '/maplibre/maplibre-gl-worker-6.19.0.mjs';
const STYLE_URL = 'https://tiles.openfreemap.org/styles/fiord';
const CENTER: [number, number] = [site.geo.lng, site.geo.lat];

const NAVY_LAND = '#1b2742';
const NAVY_WATER = '#0b1220';
const NAVY_WOOD = '#1f2d4a';
const ROAD = '#33446a';
const ROAD_MAJOR = '#3f5180';

type MapLike = {
  getStyle: () => { layers: { id: string; type: string }[] };
  setPaintProperty: (id: string, prop: string, value: unknown) => void;
  remove: () => void;
};

function retint(map: MapLike) {
  const set = (id: string, prop: string, value: unknown) => {
    try {
      map.setPaintProperty(id, prop, value);
    } catch {
      /* layer not in this style version */
    }
  };
  for (const layer of map.getStyle().layers) {
    const { id, type } = layer;
    if (type === 'background') set(id, 'background-color', NAVY_LAND);
    else if (id === 'water') set(id, 'fill-color', NAVY_WATER);
    else if (id === 'waterway') set(id, 'line-color', NAVY_WATER);
    else if (id === 'landcover_wood' || id === 'park') {
      set(id, 'fill-color', NAVY_WOOD);
      set(id, 'fill-opacity', 0.7);
    } else if (id === 'landuse_residential') {
      set(id, 'fill-color', '#22304f');
      set(id, 'fill-opacity', 0.5);
    } else if (id === 'building') {
      set(id, 'fill-color', '#2b3a5c');
      set(id, 'fill-opacity', 0.7);
    } else if (type === 'line' && id.startsWith('highway_')) {
      set(id, 'line-color', /major|motorway/.test(id) ? ROAD_MAJOR : ROAD);
    } else if (type === 'symbol') {
      const water = id.startsWith('water');
      set(id, 'text-color', water ? '#6f86a8' : id.startsWith('place_') ? '#d5dbe5' : '#9aa7bd');
      set(id, 'text-halo-color', water ? NAVY_WATER : NAVY_LAND);
    }
  }
}

function pinElement() {
  const el = document.createElement('div');
  el.className = 'map-pin';
  el.innerHTML =
    '<span class="map-pin__badge"><img src="/logo-cream.png" alt="" width="30" height="30"></span>' +
    '<span class="map-pin__label">Portside Fusion</span>';
  return el;
}

export default function LocationMap() {
  const box = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    let map: MapLike | null = null;
    let cancelled = false;

    const load = async () => {
      try {
        const lib = await import('maplibre-gl');
        if (cancelled || !box.current) return;
        lib.setWorkerUrl(WORKER_URL);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const m = new lib.Map({
          container: box.current,
          style: STYLE_URL,
          center: CENTER,
          zoom: 14.2,
          minZoom: 9,
          maxZoom: 18,
          cooperativeGestures: true,
          dragRotate: false,
          pitchWithRotate: false,
          attributionControl: { compact: true },
          fadeDuration: reduce ? 0 : 300,
        });
        m.touchZoomRotate.disableRotation();
        m.addControl(new lib.NavigationControl({ showCompass: false }), 'top-right');
        m.on('style.load', () => retint(m as unknown as MapLike));
        m.on('error', () => {
          /* a single tile failing is fine; total failure is caught below */
        });
        new lib.Marker({ element: pinElement(), anchor: 'left', offset: [-26, 0] }).setLngLat(CENTER).addTo(m);
        map = m as unknown as MapLike;
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void load();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  return (
    <div className="rmap" data-reveal="fade">
      <div ref={box} className="rmap__canvas" role="region" aria-label={`Map showing Portside Fusion at ${site.street}, ${site.locality}`} />
      {failed && <div className="rmap__fallback" aria-hidden="true" />}
      <div className="rmap__card">
        <p className="rmap__name">Portside Fusion</p>
        <p className="rmap__addr">{site.street}, {site.locality}, {site.region} {site.postal}</p>
        <a className="btn btn-brass btn-sm" href={site.directions} target="_blank" rel="noopener">
          Get directions
        </a>
      </div>
    </div>
  );
}
