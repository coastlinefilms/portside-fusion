import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/schibsted-grotesk';
import './globals.css';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Portside Fusion | Casual Fine Dining in Port Carling, Muskoka',
  description:
    'Casual fine dining, a comfortable atmosphere and an exquisite outdoor patio in Port Carling. Open Tuesday to Sunday, Noon - 10pm. See the winter menu and reserve a table.',
  openGraph: {
    title: 'Portside Fusion | Casual Fine Dining in Port Carling',
    description: 'Casual fine dining + exquisite outdoor patio in the Muskoka region. Open Tuesday to Sunday, Noon - 10pm.',
    url: site.url,
    siteName: 'Portside Fusion',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#16213A',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.name,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: '+1-705-765-0003',
  email: 'joe@portsidefusion.com',
  servesCuisine: 'Fusion',
  acceptsReservations: 'True',
  hasMenu: `${site.url}/#menu`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.street,
    addressLocality: site.locality,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: 'CA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '22:00',
    },
  ],
  sameAs: [site.instagram, site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
