import Image from 'next/image';
import Header from '@/components/Header';
import HeroVideo from '@/components/HeroVideo';
import BookingForm from '@/components/BookingForm';
import ScrollFx from '@/components/ScrollFx';
import { accompaniments, cocktails, desserts, kitchenRound, menuColumns, type Item } from '@/data/menu';
import { openTableUrl, site } from '@/data/site';

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as React.CSSProperties;

function Tags({ tags }: { tags?: Item['tags'] }) {
  if (!tags?.length) return null;
  return (
    <>
      {tags.map((t) => (
        <span key={t} className="tag" title={t === 'V' ? 'Vegan' : 'Gluten free'}>
          {t}
          <span className="sr-only">{t === 'V' ? ' (vegan)' : ' (gluten free)'}</span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#visit">Skip to content</a>
      <Header />
      <ScrollFx />

      <main>
        {/* 1. Hero */}
        <section id="top" className="hero">
          <HeroVideo />
          <div className="hero-shade" aria-hidden="true" />
          <div className="wrap hero-inner" data-hero-copy>
            <h1 className="serif h1 enter">Casual fine dining<br />in Port Carling</h1>
            <p className="hero-sub enter" style={d(120)}>
              Our goal at Portside Fusion is to introduce the highest standard of food and service, alongside an
              appealing comfortable atmosphere in the Muskoka region.
            </p>
            <div className="enter" style={d(260)}>
              <BookingForm variant="hero" />
            </div>
            <div className="hero-foot enter" style={d(400)}>
              <a className="ul hero-link" href="#menu">View the winter menu</a>
            </div>
          </div>
        </section>

        {/* 2. Visit */}
        <section id="visit" className="sec paper">
          <div className="wrap">
            <div className="visit-head">
              <div>
                <h2 className="serif moment" data-reveal="up">On the patio,<br />or inside</h2>
                <span className="rule" data-reveal="fade" style={d(150)} />
              </div>
              <p className="lead visit-lead" data-reveal="up" style={d(150)}>Our exquisite outdoor patio sits up in the trees, open to the Muskoka sky. When the weather turns, take a table inside for the same menu and the same service.</p>
            </div>
            <div className="ph visit-pano" data-reveal="img">
              <Image src="/images/patio-panorama.jpg" alt="The Portside Fusion patio, raised up in the trees beside the restaurant in Port Carling" fill sizes="(max-width: 1312px) 100vw, 1184px" style={{ objectPosition: '50% 55%' }} />
            </div>
            <div className="facts facts-row">
              <div data-reveal="up" style={d(0)}>
                <h3 className="lbl">Opening hours</h3>
                <p className="muted">Our current operating hours</p>
                <p className="strong">Tuesday to Sunday</p>
                <p className="big">Noon - 10pm</p>
              </div>
              <div data-reveal="up" style={d(100)}>
                <h3 className="lbl">Our address</h3>
                <p className="strong">{site.street}<br />{site.locality}, {site.region} {site.postal}</p>
                <a className="ul cap-link" href={site.directions} target="_blank" rel="noopener">Get directions</a>
              </div>
              <div data-reveal="up" style={d(200)}>
                <h3 className="lbl">Call</h3>
                <p className="strong"><a className="ul" href={site.phoneHref}>{site.phoneDisplay}</a></p>
              </div>
              <div data-reveal="up" style={d(300)}>
                <h3 className="lbl">Email</h3>
                <p className="strong-sm"><a className="ul" href={site.emailHref}>{site.email}</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Welcome / the place */}
        <section className="sec sand">
          <div className="wrap place">
            <div className="place-text">
              <h2 className="serif h2" data-reveal="up">Welcome to Portside Fusion</h2>
              <span className="rule" data-reveal="fade" style={d(150)} />
              <p className="lead" data-reveal="up" style={d(150)}>
                Our team strives to bring together the freshest local ingredients to produce a variety of culturally rich dishes.
              </p>
              <p className="serif quote" data-reveal="up" style={d(250)}>
                The Muskoka lakes are the crown jewel of Ontario cottage country, and as such we seek to bring the food we feel it deserves.
              </p>
              <div data-reveal="up" style={d(350)}>
                <a className="btn btn-navy" href="#menu">See the winter menu</a>
              </div>
            </div>
            <div className="ph place-a" data-reveal="img" style={d(100)}>
              <Image src="/images/guest-laugh.jpg" alt="A guest enjoying dinner on the patio at dusk" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div className="ph place-b" data-reveal="img" style={d(250)}>
              <Image src="/images/table.jpg" alt="Friends sharing dinner on the covered patio" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: '28% 50%' }} />
            </div>
          </div>
        </section>

        {/* 4. Winter menu */}
        <section id="menu" className="sec paper">
          <div className="wrap">
            <div className="menu-head">
              <div>
                <h2 className="serif h2" data-reveal="up">The Winter Menu</h2>
                <span className="rule" data-reveal="fade" style={d(150)} />
              </div>
              <div className="legend" data-reveal="fade" style={d(200)}>
                <span><span className="tag" aria-hidden="true">V</span>Vegan</span>
                <span><span className="tag" aria-hidden="true">GF</span>Gluten free</span>
              </div>
            </div>

            <div className="strip">
              <div className="ph" data-reveal="img" style={d(0)}>
                <Image src="/images/seafood-tower.jpg" alt="A server bringing a chilled seafood tower to the table" fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectPosition: '50% 40%' }} />
              </div>
              <div className="ph" data-reveal="img" style={d(120)}>
                <Image src="/images/linguine.jpg" alt="Seafood linguine with mussels, shrimp and scallops" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
              <div className="ph" data-reveal="img" style={d(240)}>
                <Image src="/images/steak.jpg" alt="A plated steak with pan sauce and potatoes" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
            </div>

            <div className="menu">
              {menuColumns.map((col, ci) => (
                <div className="menu-col" key={ci}>
                  {col.map((cat) => (
                    <div className="menu-cat" key={cat.title} data-reveal="up" style={d(ci * 90)}>
                      <h3 className="cat-title">{cat.title}</h3>
                      <span className="rule rule-sm" />
                      {cat.note ? <p className="cat-note">{cat.note}</p> : null}
                      <ul className="items">
                        {cat.items.map((it) => (
                          <li key={it.name}>
                            <div className="item-row">
                              <span className="item-name">
                                {it.name}
                                <Tags tags={it.tags} />
                              </span>
                              <span className="price">{it.price}</span>
                            </div>
                            {it.desc ? <p className="desc">{it.desc}</p> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="acc-block" data-reveal="up">
              <h3 className="cat-title">Accompaniments</h3>
              <span className="rule rule-sm" />
              <ul className="acc">
                {accompaniments.map((a) => (
                  <li key={a.name}>
                    <span className="item-name">{a.name}</span>
                    <span className="price">{a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="gratuity" data-reveal="fade">Parties of 6 or more are subject to 20% auto gratuity</p>
          </div>
        </section>

        {/* 5. Cocktails + desserts */}
        <section id="drinks" className="sec navy">
          <div className="wrap drinks">
            <div>
              <h2 className="serif h2" data-reveal="up">Cocktails</h2>
              <span className="rule rule-brass" data-reveal="fade" style={d(150)} />
              <p className="note-dark" data-reveal="up" style={d(150)}>All cocktails are 2.5oz</p>
              <ul className="drink-list">
                {cocktails.map((c, i) => (
                  <li key={c.name} data-reveal="up" style={d(i * 70)}>
                    <div className="item-row">
                      <span className="item-name">{c.name}</span>
                      <span className="price">{c.price}</span>
                    </div>
                    <p className="desc">{c.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ph dph" data-reveal="img" style={d(150)}>
              <Image src="/images/oysters-champagne.jpg" alt="Oysters on ice with a bottle of champagne on the patio overlooking the trees" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 100vw, 30vw" style={{ objectPosition: '50% 60%' }} />
            </div>
            <div>
              <h2 className="serif h2" data-reveal="up">Desserts</h2>
              <span className="rule rule-brass" data-reveal="fade" style={d(150)} />
              <p className="note-dark" data-reveal="up" style={d(150)}>From the winter menu</p>
              <ul className="dessert-list">
                {desserts.map((x, i) => (
                  <li key={x.name} data-reveal="up" style={d(i * 70)}>
                    <span className="item-name">{x.name}</span>
                    <span className="price">{x.price}</span>
                  </li>
                ))}
              </ul>
              <div className="round" data-reveal="up" style={d(300)}>
                <span className="serif">{kitchenRound.name}</span>
                <span className="price">{kitchenRound.price}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Reservations */}
        <section id="reserve" className="reserve">
          <div className="ph rph" data-reveal="img">
            <Image src="/images/building.jpg" alt="The Portside Fusion restaurant building and sign in Port Carling" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: '6% 50%' }} />
          </div>
          <div className="reserve-copy">
            <h2 className="serif h2" data-reveal="up">Make a reservation</h2>
            <span className="rule rule-brass" data-reveal="fade" style={d(150)} />
            <p className="lead-dark" data-reveal="up" style={d(150)}>Tuesday to Sunday, Noon - 10pm. Indoor + outdoor seating.</p>
            <div data-reveal="up" style={d(250)}>
              <BookingForm variant="full" />
            </div>
            <p className="call" data-reveal="up" style={d(320)}>
              Prefer to call? <a className="ul" href={site.phoneHref}>{site.phoneDisplay}</a>
            </p>
            <p className="fine" data-reveal="up" style={d(380)}>
              Parties of 6 or more are subject to 20% auto gratuity. Reservations by OpenTable.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="#top" className="foot-brand" aria-label="Back to top">
                <img src="/logo-cream.png" alt="" width={64} height={64} />
                <span className="serif">Portside Fusion</span>
              </a>
              <p className="foot-tag">Casual fine dining + exquisite outdoor patio.</p>
            </div>
            <div>
              <h3 className="lbl">Visit</h3>
              <p>{site.street}<br />{site.locality}, {site.region} {site.postal}</p>
              <p><a className="ul" href={site.directions} target="_blank" rel="noopener">Get directions</a></p>
            </div>
            <div>
              <h3 className="lbl">Hours</h3>
              <p>Tuesday to Sunday<br />Noon - 10pm</p>
              <p><a className="ul" href={site.phoneHref}>{site.phoneDisplay}</a></p>
            </div>
            <div>
              <h3 className="lbl">Follow</h3>
              <p>
                <a className="ul" href={site.instagram} target="_blank" rel="noopener">Instagram</a><br />
                <a className="ul" href={site.facebook} target="_blank" rel="noopener">Facebook</a><br />
                <a className="ul" href={site.emailHref}>{site.email}</a>
              </p>
            </div>
          </div>
          <div className="foot-bar">
            <span>© {new Date().getFullYear()} Portside Fusion | All Rights Reserved</span>
            <span>Created by <a className="ul" href="https://coastlinefilms.ca" target="_blank" rel="noopener">Coastline Films</a></span>
          </div>
        </div>
      </footer>
      <a className="sticky-book" href={openTableUrl()} target="_blank" rel="noopener">Reserve a table</a>
    </>
  );
}
