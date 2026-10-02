import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronDown, CircleHelp, Compass, Heart, LayoutDashboard, MapPin, Menu, Minus, Plus,
  Search, ShieldCheck, SlidersHorizontal, Ticket, TicketCheck, Users, Wallet, X,
} from 'lucide-react'

type Category = 'All events' | 'Music' | 'Nightlife' | 'Food & drink' | 'Culture' | 'Wellness'
type EventItem = {
  id: number; title: string; category: Exclude<Category, 'All events'>; date: string; day: string;
  month: string; time: string; venue: string; area: string; price: number; color: string;
  art: string; badge?: string; attendees: string; description: string
}

const categories: { name: Category; icon: string }[] = [
  { name: 'All events', icon: '✳' }, { name: 'Music', icon: '♫' }, { name: 'Nightlife', icon: '☾' },
  { name: 'Food & drink', icon: '♨' }, { name: 'Culture', icon: '✺' }, { name: 'Wellness', icon: '⌁' },
]
const events: EventItem[] = [
  { id: 1, title: 'Nairobi Jazz Social', category: 'Music', date: 'Sat, 10 Oct', day: '10', month: 'OCT', time: '7:00 PM – late', venue: 'The Alchemist', area: 'Westlands, Nairobi', price: 1500, color: 'lilac', art: 'JAZZ\nAFTER\nDARK', badge: 'Selling fast', attendees: '243 going', description: 'An evening of live jazz, good people and even better energy. Join Nairobi’s brightest musicians for a night that moves between soulful classics and fresh sounds.' },
  { id: 2, title: 'Afrohouse on the Roof', category: 'Nightlife', date: 'Fri, 23 Oct', day: '23', month: 'OCT', time: '8:00 PM – 2:00 AM', venue: 'The Social House', area: 'Lavington, Nairobi', price: 2000, color: 'sunset', art: 'ROOF\nTOP\nRITUAL', badge: 'Almost gone', attendees: '189 going', description: 'Golden hour becomes dance floor magic. A rooftop session for the ones who know the night is always young.' },
  { id: 3, title: 'Sunday at the Garden', category: 'Food & drink', date: 'Sun, 25 Oct', day: '25', month: 'OCT', time: '11:00 AM – 6:00 PM', venue: 'Karura Forest', area: 'Gigiri, Nairobi', price: 800, color: 'garden', art: 'SUNDAY\nIN FULL\nBLOOM', badge: 'Local favourite', attendees: '312 going', description: 'A slow Sunday done right: local makers, beautiful bites, live acoustic sets and a little room to breathe.' },
  { id: 4, title: 'The Nairobi Creative Market', category: 'Culture', date: 'Sat, 07 Nov', day: '07', month: 'NOV', time: '10:00 AM – 7:00 PM', venue: 'Village Market', area: 'Gigiri, Nairobi', price: 500, color: 'blue', art: 'MADE\nIN\nNAIROBI', attendees: '126 going', description: 'Meet the makers shaping the city. A day of independent design, art, music and stories from Nairobi’s creative community.' },
  { id: 5, title: 'Move & Mingle: Rooftop Flow', category: 'Wellness', date: 'Sat, 14 Nov', day: '14', month: 'NOV', time: '8:30 AM – 11:00 AM', venue: 'Kofisi, Riverside', area: 'Riverside, Nairobi', price: 1200, color: 'peach', art: 'FIND\nYOUR\nFLOW', attendees: '74 going', description: 'A feel-good morning of movement, fresh air and new connections. All levels welcome; mats and good vibes included.' },
  { id: 6, title: 'Sauti Sessions: Live', category: 'Music', date: 'Sat, 21 Nov', day: '21', month: 'NOV', time: '6:00 PM – 11:00 PM', venue: 'GoDown Arts Centre', area: 'Industrial Area, Nairobi', price: 1800, color: 'rose', art: 'SOUND\nOF THE\nCITY', badge: 'New', attendees: '98 going', description: 'A live showcase bringing together the next wave of East African sound. Come early, stay curious.' },
  { id: 7, title: 'Nairobi Street Food Fest', category: 'Food & drink', date: 'Sun, 29 Nov', day: '29', month: 'NOV', time: '12:00 PM – 8:00 PM', venue: 'The Waterfront', area: 'Karen, Nairobi', price: 600, color: 'sunset', art: 'A TASTE\nOF THE\nCITY', badge: 'New', attendees: '205 going', description: 'Come hungry for a lively afternoon of Kenyan street food, local makers and music in the open air.' },
  { id: 8, title: 'Laughs at the Junction', category: 'Culture', date: 'Fri, 04 Dec', day: '04', month: 'DEC', time: '7:30 PM – 10:00 PM', venue: 'Junction House', area: 'Ngong Road, Nairobi', price: 1000, color: 'lilac', art: 'GOOD\nNIGHT\nLAUGHS', attendees: '88 going', description: 'A cosy night of sharp stand-up and fresh Nairobi comedy. Grab a seat and bring your best laugh.' },
  { id: 9, title: 'Sunset Sessions: Live Band', category: 'Music', date: 'Sat, 05 Dec', day: '05', month: 'DEC', time: '5:00 PM – 10:00 PM', venue: 'Picazzo Gardens', area: 'Lavington, Nairobi', price: 1600, color: 'rose', art: 'SOUND\nAT SUNSET', attendees: '172 going', description: 'Live East African sounds, a warm sunset and an easy evening with friends in the garden.' },
  { id: 10, title: 'Slow Sunday Brunch Club', category: 'Food & drink', date: 'Sun, 06 Dec', day: '06', month: 'DEC', time: '10:00 AM – 3:00 PM', venue: 'Cultiva', area: 'Karen, Nairobi', price: 1400, color: 'garden', art: 'SUNDAY\nSERVED\nSLOW', attendees: '61 going', description: 'A relaxed brunch gathering with seasonal plates, good coffee and space to catch up.' },
  { id: 11, title: 'Nairobi Night Market', category: 'Nightlife', date: 'Sat, 12 Dec', day: '12', month: 'DEC', time: '4:00 PM – 11:00 PM', venue: 'KICC Rooftop', area: 'CBD, Nairobi', price: 700, color: 'blue', art: 'NIGHT\nMARKET\nNBO', badge: 'Local favourite', attendees: '317 going', description: 'An after-hours market for curious people: local finds, delicious bites, music and city views.' },
  { id: 12, title: 'The Sunday Reset: Yoga & Tea', category: 'Wellness', date: 'Sun, 13 Dec', day: '13', month: 'DEC', time: '9:00 AM – 11:30 AM', venue: 'The Forest', area: 'Karura, Nairobi', price: 900, color: 'peach', art: 'BREATHE\nIN THE\nGREEN', attendees: '53 going', description: 'Stretch, slow down and share a cup of Kenyan tea in a peaceful green setting. All levels welcome.' },
]
const eventPhotos: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1100&q=85',
  2: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1100&q=85',
  3: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=85',
  4: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1100&q=85',
  5: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85',
  6: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85',
  7: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=85',
  8: 'https://images.unsplash.com/photo-1585699324551-f6c3099ecf94?auto=format&fit=crop&w=1100&q=85',
  9: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=85',
  10: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=85',
  11: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1100&q=85',
  12: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85',
}

function App() {
  const [category, setCategory] = useState<Category>('All events')
  const [query, setQuery] = useState('')
  const [activeView, setActiveView] = useState<'discover' | 'tickets' | 'organizer' | 'admin'>('discover')
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [searchOpen, setSearchOpen] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const [toast, setToast] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesCategory = category === 'All events' || event.category === category
    const matchesQuery = `${event.title} ${event.venue} ${event.area} ${event.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [category, query])
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id])
  const openEvent = (event: EventItem) => { setSelected(event); setQuantity(1); setBookingConfirmed(false) }
  const heroEvents = events.slice(0, 4)
  const featuredEvent = heroEvents[heroIndex]
  useEffect(() => {
    if (heroPaused) return
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroEvents.length), 5500)
    return () => window.clearInterval(timer)
  }, [heroEvents.length, heroPaused])

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={() => setActiveView('discover')}><span className="brand-mark">m</span><span>mingle<span className="brand-dot">.</span></span></a>
      <nav className={`main-nav ${mobileNav ? 'is-open' : ''}`}>
        <button className={activeView === 'discover' ? 'nav-link active' : 'nav-link'} onClick={() => { setActiveView('discover'); setMobileNav(false) }}>Discover</button>
        <button className={activeView === 'tickets' ? 'nav-link active' : 'nav-link'} onClick={() => { setActiveView('tickets'); setMobileNav(false) }}>My tickets</button>
        <button className={activeView === 'organizer' ? 'nav-link active' : 'nav-link'} onClick={() => { setActiveView('organizer'); setMobileNav(false) }}>For organizers</button>
      </nav>
      <label className="top-search"><Search size={19}/><input aria-label="Search events and places" placeholder="Search events, places, experiences..." value={query} onChange={(event) => setQuery(event.target.value)}/></label>
      <div className="header-actions">
        <button className="admin-link" onClick={() => setActiveView('admin')}><LayoutDashboard size={15} /> Admin</button>
        <button className="icon-button search-toggle" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
        <button className="avatar" aria-label="Open profile" onClick={() => setActiveView('tickets')}>AM</button>
        <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMobileNav(!mobileNav)}><Menu size={21} /></button>
      </div>
    </header>

    {activeView === 'discover' && <>
      <main>
        <section className="hero-section photo-hero" aria-label="Featured event slideshow" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocus={() => setHeroPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeroPaused(false) }}>
          <img key={featuredEvent.id} className="hero-slide-image" src={eventPhotos[featuredEvent.id]} alt="" />
          <div className="hero-slide-shade" />
          <div className="hero-slide-copy" key={`copy-${featuredEvent.id}`}>
            <div className="hero-slide-eyebrow">FEATURED EVENT <span>·</span> {featuredEvent.category.toUpperCase()}</div>
            <h1>{featuredEvent.title}</h1>
            <p>{featuredEvent.description}</p>
            <button className="hero-slide-button" onClick={() => openEvent(featuredEvent)}><span>Explore event</span><ArrowRight size={19}/></button>
          </div>
          <div className="hero-slide-controls">
            <button aria-label="Previous featured event" onClick={() => setHeroIndex((heroIndex - 1 + heroEvents.length) % heroEvents.length)}><ArrowLeft size={18}/></button>
            <span>0{heroIndex + 1} <i/> 0{heroEvents.length}</span>
            <button aria-label="Next featured event" onClick={() => setHeroIndex((heroIndex + 1) % heroEvents.length)}><ArrowRight size={18}/></button>
          </div>
          <div className="hero-search-dock">
            <div className="search-dock-heading"><span>Find your next experience</span><span className="search-dock-location"><MapPin size={16}/> Nairobi, Kenya <ChevronDown size={15}/></span></div>
            <div className="search-dock-row"><label><Search size={21}/><input aria-label="Search events" placeholder="Search concerts, festivals, comedy, sports..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><button onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>Search events <ArrowRight size={18}/></button></div>
            <div className="search-dock-categories">{categories.slice(1, 5).map((item) => <button key={item.name} onClick={() => { setCategory(item.name); document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) }}>{item.name}</button>)}</div>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="section-heading"><div><div className="eyebrow small-eyebrow">YOUR NEXT YES <span className="eyebrow-sun">✳</span></div><h2>Plans worth <em>showing up for.</em></h2></div>
            <button className="text-link" onClick={() => { setCategory('All events'); setQuery('') }}>Explore all events <ArrowRight size={16}/></button>
          </div>
          <div className="discovery-tools">
            <div className="category-tabs">{categories.map((item) => <button key={item.name} onClick={() => setCategory(item.name)} className={category === item.name ? 'category-tab selected' : 'category-tab'}><span>{item.icon}</span>{item.name}</button>)}</div>
            <button className="filter-button" onClick={() => notify('More filters are coming soon.')}><SlidersHorizontal size={16}/><span>Filters</span></button>
          </div>
          {query && <div className="results-label">{filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'} for “{query}” <button onClick={() => setQuery('')}>Clear</button></div>}
          <div className="event-grid">{filteredEvents.map((event) => <article className="event-card" key={event.id}>
            <button className={`event-art art-${event.color}`} onClick={() => openEvent(event)} aria-label={`View ${event.title}`}>
              <img className="poster-photo" src={eventPhotos[event.id]} alt="" loading="lazy"/><div className="photo-shade"/><span className="art-category">{event.category}</span><div className="art-title">{event.art.split('\n').map((line) => <span key={line}>{line}</span>)}</div>
              <span className="art-orbit"/><span className="art-sun"/><span className="art-footnote">NBO / 2026</span>
            </button>
            {event.badge && <span className="event-badge">{event.badge}</span>}
            <button className={`save-button ${saved.includes(event.id) ? 'is-saved' : ''}`} aria-label={saved.includes(event.id) ? 'Remove saved event' : 'Save event'} onClick={() => toggleSaved(event.id)}><Heart size={17} fill={saved.includes(event.id) ? 'currentColor' : 'none'}/></button>
            <div className="event-info" onClick={() => openEvent(event)} role="button" tabIndex={0} onKeyDown={(key) => key.key === 'Enter' && openEvent(event)}>
              <div className="event-date"><span>{event.month}</span><b>{event.day}</b></div><div className="event-content"><div className="event-overline">{event.date} <span>·</span> {event.time}</div><h3>{event.title}</h3><div className="event-location"><MapPin size={13}/>{event.venue} <span>· {event.area.split(',')[0]}</span></div><div className="event-card-bottom"><span className="going"><Users size={13}/>{event.attendees}</span><strong>{event.price === 0 ? 'Free' : `KES ${event.price.toLocaleString()}`}<small> / person</small></strong></div></div>
            </div>
          </article>)}</div>
          {filteredEvents.length === 0 && <div className="empty-state"><Compass size={30}/><h3>No plans found (yet)</h3><p>Try another search or pick a different category.</p><button className="outline-button" onClick={() => { setQuery(''); setCategory('All events') }}>See all events</button></div>}
        </section>
        <section className="inspiration-section" aria-labelledby="inspiration-heading">
          <div className="section-heading"><div><div className="eyebrow small-eyebrow">YOUR CITY, YOUR KIND OF DAY</div><h2 id="inspiration-heading">Find a plan that <em>feels like you.</em></h2></div><span className="inspiration-note">A little inspiration for your next Nairobi day out.</span></div>
          <div className="guide-grid">{[
            { title: 'Nights that turn into stories', label: 'MUSIC & NIGHTLIFE', category: 'Nightlife' as Category, photo: eventPhotos[2] },
            { title: 'Slow Sundays, served well', label: 'FOOD & DRINK', category: 'Food & drink' as Category, photo: eventPhotos[10] },
            { title: 'Make room for something new', label: 'CULTURE & COMMUNITY', category: 'Culture' as Category, photo: eventPhotos[4] },
          ].map((guide) => <button className="guide-card" key={guide.title} onClick={() => { setCategory(guide.category); setQuery(''); document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ backgroundImage: `linear-gradient(0deg,rgba(12,18,18,.82),rgba(12,18,18,.03) 78%),url(${guide.photo})` }}><span>{guide.label}</span><b>{guide.title}</b><i>Explore plans <ArrowRight size={16}/></i></button>)}</div>
        </section>
        <section className="booking-guide" aria-labelledby="booking-guide-heading">
          <div className="booking-guide-intro"><div className="eyebrow small-eyebrow">ONE SIMPLE WAY TO MAKE A PLAN</div><h2 id="booking-guide-heading">From “let’s go”<br/>to <em>see you there.</em></h2><p>Choose an event, check the ticket details, and you’re ready to go. No confusing detours.</p><button className="text-link" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>Browse upcoming events <ArrowRight size={17}/></button></div>
          <div className="booking-steps"><article><span>01</span><div><b>Pick one good plan</b><p>Browse the listings and open the event you like.</p></div></article><article><span>02</span><div><b>Choose your ticket</b><p>See the sample price and quantity together in one place.</p></div></article><article><span>03</span><div><b>Check your demo confirmation</b><p>Preview what a booking confirmation could look like. No payment is taken.</p></div></article></div>
        </section>
        <section className="faq-section" aria-labelledby="faq-heading"><div><div className="eyebrow small-eyebrow">A FEW QUICK ANSWERS</div><h2 id="faq-heading">Before you head out.</h2><p>This is a visual prototype, so booking actions are only a preview.</p></div><div className="faq-list"><details><summary>Can I buy a ticket here right now?</summary><p>Not yet. The event prices and ticket flow use sample data; checkout and payments are not connected.</p></details><details><summary>What happens when I press Continue?</summary><p>You’ll see a demo confirmation screen in the same window. It does not create a real order or charge you.</p></details><details><summary>Are these real event listings?</summary><p>They are illustrative sample events for showing how event discovery could work in Nairobi.</p></details></div></section>
        <section className="organizer-banner"><div className="banner-scribble">✳</div><div><span className="eyebrow">GOT SOMETHING GOOD PLANNED?</span><h2>Your event deserves<br/>a <em>full house.</em></h2><p>From your first ticket to your final encore, we're here for it.</p></div><button className="banner-button" onClick={() => setActiveView('organizer')}>Host an event <ArrowUpRight size={17}/></button><span className="banner-sun"/></section>
      </main>
      <Footer onAdmin={() => setActiveView('admin')} />
    </>}

    {activeView === 'tickets' && <TicketView onDiscover={() => setActiveView('discover')} notify={notify} />}
    {activeView === 'organizer' && <OrganizerView notify={notify} />}
    {activeView === 'admin' && <AdminView notify={notify} />}

    {searchOpen && <div className="search-popover"><Search size={18}/><input autoFocus placeholder="Search events, places, vibes..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && (setActiveView('discover'), setSearchOpen(false))}/><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18}/></button></div>}
    {selected && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><div className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close dialog"><X size={19}/></button><div className={`modal-art art-${selected.color}`}><img className="poster-photo" src={eventPhotos[selected.id]} alt=""/><div className="photo-shade"/><span className="art-category">{selected.category} · NAIROBI</span><div className="art-title">{selected.art.split('\n').map((line) => <span key={line}>{line}</span>)}</div></div><div className="modal-content"><div className="eyebrow small-eyebrow">{selected.date.toUpperCase()} <span className="eyebrow-sun">✳</span> {selected.time.toUpperCase()}</div><h2 id="modal-title">{selected.title}</h2><div className="modal-venue"><MapPin size={16}/><span>{selected.venue}<small>{selected.area}</small></span></div><p>{selected.description}</p><div className="ticket-row"><div><b>General admission</b><small>One ticket · Entry on the day</small></div><strong>KES {selected.price.toLocaleString()}</strong></div><div className="modal-bottom"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15}/></button><b>{quantity}</b><button aria-label="Increase quantity" onClick={() => setQuantity(Math.min(8, quantity + 1))}><Plus size={15}/></button></div><button className="buy-button" onClick={() => setBookingConfirmed(true)}>Continue · KES {(selected.price * quantity).toLocaleString()} <ArrowRight size={17}/></button></div><div className="secure-note"><ShieldCheck size={14}/> Secure checkout · No hidden fees</div></div></div></div>}
    {bookingConfirmed && selected && <div className="booking-confirm-backdrop"><section className="booking-confirm-card" role="dialog" aria-modal="true" aria-labelledby="booking-confirm-title"><span className="booking-confirm-check"><Check size={28}/></span><div className="eyebrow small-eyebrow">DEMO PREVIEW · NO PAYMENT TAKEN</div><h2 id="booking-confirm-title">Your plan is looking good.</h2><p><b>{quantity} × {selected.title}</b><br/>Sample total: KES {(selected.price * quantity).toLocaleString()}</p><div className="demo-reference">DEMO REF · MG-{selected.id}26</div><button onClick={() => { setBookingConfirmed(false); setSelected(null) }}>Done</button></section></div>}
    {toast && <div className="toast-message"><Check size={17}/>{toast}</div>}
  </div>
}

function TicketView({ onDiscover, notify }: { onDiscover: () => void; notify: (message: string) => void }) {
  return <main className="dashboard-page"><div className="dashboard-heading"><div><div className="eyebrow small-eyebrow">YOUR GOOD TIMES, ALL IN ONE PLACE</div><h1>Your tickets<span>.</span></h1><p>Everything you need for the moments you don’t want to miss.</p></div><button className="outline-button" onClick={onDiscover}><Compass size={16}/> Find an event</button></div><div className="dashboard-tabs"><button className="active">Upcoming <span>2</span></button><button onClick={() => notify('No past events yet — make a new memory!')}>Past events</button><button onClick={() => notify('You haven’t saved any events yet.')}>Saved events</button></div><div className="ticket-list">{events.slice(0, 2).map((event, index) => <div className="ticket-pass" key={event.id}><div className={`pass-art art-${event.color}`}><span>{event.art.split('\n').slice(0, 2).join(' ')}</span><span className="pass-stamp">MINGLE<br/>LIVE</span></div><div className="pass-main"><div className="event-overline">{event.date} <span>·</span> {event.time}</div><h2>{event.title}</h2><p><MapPin size={14}/>{event.venue}, {event.area}</p><div className="pass-meta"><span><Ticket size={14}/> General admission · 1 ticket</span><span><b>Order #MG-208{index + 4}</b></span></div></div><div className="pass-qr"><div className="fake-qr">{Array.from({ length: 49 }, (_, i) => <i key={i} className={(i * 7 + index * 3) % 5 < 2 ? 'dark' : ''}/>)}</div><span>SCAN AT ENTRY</span><button onClick={() => notify('Your ticket is ready to save once checkout is connected.')}>View ticket <ArrowRight size={14}/></button></div></div>)}</div><div className="ticket-help"><CircleHelp size={17}/><span>Need a hand with your tickets?</span><button onClick={() => notify('Our support team will be here soon.')}>Get in touch <ArrowRight size={14}/></button></div></main>
}

function OrganizerView({ notify }: { notify: (message: string) => void }) {
  return <main className="dashboard-page"><div className="dashboard-heading"><div><div className="eyebrow small-eyebrow">YOUR EVENTS, YOUR WAY</div><h1>Organizer studio<span>.</span></h1><p>Make the magic happen. We’ll help you keep the details in order.</p></div><button className="primary-button" onClick={() => notify('Event draft created. Add your event details to get started.')}>＋ Create an event</button></div><div className="stats-grid"><StatCard label="Tickets sold" value="1,284" change="↑ 12% this month" icon={<TicketCheck/>}/><StatCard label="Gross sales" value="KES 2.4M" change="Across 6 events" icon={<Wallet/>}/><StatCard label="Total attendees" value="1,106" change="86% check-in rate" icon={<Users/>}/><StatCard label="Upcoming events" value="3" change="Next one in 4 days" icon={<CalendarDays/>}/></div><div className="studio-grid"><section className="panel"><div className="panel-title"><div><span className="eyebrow small-eyebrow">YOUR LINEUP</span><h2>Upcoming events</h2></div><button className="text-link" onClick={() => notify('Showing all your events.')}>View all <ArrowRight size={15}/></button></div>{events.slice(0, 3).map((event) => <div className="studio-event" key={event.id}><div className={`studio-thumb art-${event.color}`}><span>{event.art.split('\n')[0]}</span></div><div className="studio-event-name"><b>{event.title}</b><small>{event.date} · {event.venue}</small></div><div className="sold-count">{event.id === 1 ? '186' : event.id === 2 ? '142' : '98'} <small>sold</small></div><span className="live-status"><i/> Live</span><button className="row-arrow" onClick={() => notify(`Opening ${event.title} details.`)}><ArrowRight size={16}/></button></div>)}</section><section className="panel quick-panel"><div className="eyebrow small-eyebrow">QUICK TOOLS</div><h2>Ready when you are.</h2><p>Keep your event moving with a few quick actions.</p><button onClick={() => notify('Event draft created. Add your event details to get started.')}><span className="tool-icon"><Plus size={17}/></span><span><b>Create an event</b><small>Start your next great gathering</small></span><ArrowRight size={15}/></button><button onClick={() => notify('Check-in mode is ready for your next event.')}><span className="tool-icon"><TicketCheck size={17}/></span><span><b>Check-in guests</b><small>Scan and verify tickets</small></span><ArrowRight size={15}/></button><button onClick={() => notify('Your sales report is being prepared.')}><span className="tool-icon"><ArrowDownRight size={17}/></span><span><b>Download a report</b><small>See how your events are doing</small></span><ArrowRight size={15}/></button></section></div><section className="checkin-banner"><div className="checkin-icon"><TicketCheck size={24}/></div><div><b>Doors open soon?</b><p>Check tickets at the door. Every QR code is verified in real time.</p></div><button onClick={() => notify('Check-in scanner preview opened.')}>Open check-in <ArrowRight size={16}/></button></section></main>
}

function StatCard({ label, value, change, icon }: { label: string; value: string; change: string; icon: React.ReactNode }) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><i>{icon}</i></div><strong>{value}</strong><small>{change}</small></div> }

function AdminView({ notify }: { notify: (message: string) => void }) {
  return <main className="dashboard-page"><div className="dashboard-heading"><div><div className="eyebrow small-eyebrow">PLATFORM CONTROL</div><h1>Admin overview<span>.</span></h1><p>A little look at what’s happening across Mingle.</p></div><button className="outline-button" onClick={() => notify('Platform settings are coming soon.')}><SlidersHorizontal size={16}/> Settings</button></div><div className="stats-grid"><StatCard label="Platform revenue" value="KES 846K" change="↑ 8.4% this month" icon={<Wallet/>}/><StatCard label="Ticket orders" value="3,482" change="↑ 14% this month" icon={<TicketCheck/>}/><StatCard label="Active organizers" value="128" change="12 new this month" icon={<Users/>}/><StatCard label="Pending review" value="7 events" change="Needs your attention" icon={<ShieldCheck/>}/></div><div className="studio-grid admin-grid"><section className="panel"><div className="panel-title"><div><span className="eyebrow small-eyebrow">NEEDS A LOOK</span><h2>Events awaiting review</h2></div><button className="text-link" onClick={() => notify('You’re all caught up on the review queue.')}>View queue <ArrowRight size={15}/></button></div>{['Nairobi Food & Wine Weekender', 'R&B Under the Stars', 'The Sunday Cycling Club'].map((name, index) => <div className="review-row" key={name}><div className="review-symbol">{['F', '♫', '↗'][index]}</div><div><b>{name}</b><small>Submitted {index + 1}h ago · {['Food & drink', 'Music', 'Wellness'][index]}</small></div><button className="review-button" onClick={() => notify(`${name} approved for review.`)}>Review <ArrowRight size={14}/></button></div>)}</section><section className="panel health-panel"><div className="eyebrow small-eyebrow">PLATFORM HEALTH</div><h2>All looking good.</h2><p>Your ticketing platform is running smoothly today.</p><div className="health-metric"><span><i/> Payments</span><b>Operational</b></div><div className="health-metric"><span><i/> Ticket delivery</span><b>Operational</b></div><div className="health-metric"><span><i/> Check-in</span><b>Operational</b></div><button className="text-link" onClick={() => notify('No recent platform alerts.')}>View activity log <ArrowRight size={14}/></button></section></div><div className="admin-footnote"><ShieldCheck size={15}/> You’re viewing a demo admin dashboard with sample data.</div></main>
}

function Footer({ onAdmin }: { onAdmin: () => void }) { return <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">m</span><span>mingle<span className="brand-dot">.</span></span></a><span>Little moments make a life. <b>Nairobi, Kenya 🇰🇪</b></span><div><button onClick={onAdmin}>For organizers</button><button onClick={onAdmin}>Help & support</button><span>© 2026 Mingle</span></div></footer> }

export default App
