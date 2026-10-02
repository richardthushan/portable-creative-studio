import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './pages/AdminDashboard';
import AdminServices from './pages/AdminServices';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminEnquiries from './pages/AdminEnquiries';
import { getPortfolio } from './services/portfolioApi';
import { getPublicSettings } from './services/settingsApi';

import {

  Menu,

  X,

  ArrowUpRight,

  Sparkles,

  PenTool,

  Images,

  Printer,

  Check,

  ChevronRight,

  MessageCircle,

  Mail,

  MapPin,

  Play,

  Layers3,

  Palette,

  Camera,

  WandSparkles,

} from 'lucide-react';



import { getServices } from './services/servicesApi';

import './styles.css';

import AdminLogin from './pages/AdminLogin';

import { sendContact } from './services/contactApi';

const logo = '/brand-logo.png';



const portfolio = [

  {

    category: 'Photography',

    title: 'Light, held gently',

    type: 'Portrait study',

    tone: 'rose',

  },

  {

    category: 'Photo Editing',

    title: 'Warm cinematic finish',

    type: 'AI editing direction',

    tone: 'violet',

  },

  {

    category: 'Albums',

    title: 'A story in spreads',

    type: 'Album design',

    tone: 'sand',

  },

  {

    category: 'Branding',

    title: 'Small marks, big feeling',

    type: 'Identity system',

    tone: 'blue',

  },

];



const nav = [

  'Services',

  'How It Works',

  'Portfolio',

  'Pricing',

  'Printing',

  'About',

  'Contact',

];



function Button({

  children,

  variant = 'primary',

  href = '#contact',

  onClick,

}) {

  return (

    <a className={`btn ${variant}`} href={href} onClick={onClick}>

      {children}

      <ArrowUpRight size={16} />

    </a>

  );

}



function SectionTitle({ eyebrow, title, body }) {

  return (

    <div className="section-title">

      <span className="eyebrow">{eyebrow}</span>

      <h2>{title}</h2>

      {body && <p>{body}</p>}

    </div>

  );

}



function Logo() {

  return (

    <a href="#top" className="brand">

      <img src={logo} alt="Portable Creative Studio" />

      <span>

        PORTABLE

        <br />

        <small>CREATIVE STUDIO</small>

      </span>

    </a>

  );

}



function Nav() {

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);



  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

    };



    window.addEventListener('scroll', handleScroll);

    handleScroll();



    return () => {

      window.removeEventListener('scroll', handleScroll);

    };

  }, []);



  return (

    <header className={scrolled ? 'scrolled' : ''}>

      <div className="nav wrap">

        <Logo />



        <nav className={open ? 'open' : ''}>

          {nav.map((item) => (

            <a

              key={item}

              href={`#${item.toLowerCase().replaceAll(' ', '-')}`}

              onClick={() => setOpen(false)}

            >

              {item}

            </a>

          ))}

        </nav>



        <div className="nav-actions">

          <button className="lang" type="button">

            EN <span>தமிழ்</span>

            <span>සිං</span>

          </button>



          <a className="login" href="#contact">

            Log in

          </a>



          <Button href="#contact">Start creating</Button>

        </div>



        <button

          className="menu"

          type="button"

          aria-label="Toggle menu"

          onClick={() => setOpen((value) => !value)}

        >

          {open ? <X /> : <Menu />}

        </button>

      </div>

    </header>

  );

}



function Hero({ settings }){

  return (

    <section className="hero wrap" id="top">

      <div className="hero-copy">

        <span className="eyebrow">

          <i /> CREATIVE PARTNER / EST. 2022

        </span>



        <h1>

          Your next creative project <em>starts here.</em>

        </h1>



        <p className="lead">

          AI photo editing, custom designs and professional albums made for

          your moments.

        </p>



        <p className="tagline">
  {settings?.tagline || 'Limitless Creativity. Anytime Anywhere.'}
</p>


        <div className="hero-ctas">

          <Button href="#services">Start creating</Button>



          <Button variant="ghost" href="#portfolio">

            Explore services <ChevronRight size={16} />

          </Button>

        </div>



        <div className="hero-note">

          <div className="avatars">

            <span>PC</span>

            <span>AI</span>

            <span>✦</span>

          </div>



          <span>

            Human craft, <b>modern tools.</b>

          </span>

        </div>

      </div>



      <div className="hero-art">

        <div className="art-label">

          CREATIVE DIRECTION <span>01 / 04</span>

        </div>



        <div className="art-main">

          <div className="art-shape one" />

          <div className="art-shape two" />

          <div className="art-shape three" />



          <div className="art-caption">

            <span>PORTABLE</span>

            <b>Ideas in motion</b>

            <small>Explore our creative universe ↗</small>

          </div>

        </div>



        <div className="art-side">

          <div className="side-top">

            <Sparkles size={18} />

            <span>

              AI

              <br />

              EDITING

            </span>

          </div>



          <div className="side-bottom">

            <span>

              SCROLL TO

              <br />

              DISCOVER

            </span>

            <ArrowUpRight size={18} />

          </div>

        </div>

      </div>

    </section>

  );

}



function QuickInfo({ settings }) {
  return (
    <section className="quick wrap" id="printing">

      <div>
        <Sparkles />
        <span>
          <b>AI Creation</b>
          {settings?.ai_trial_text || 'First month free'} ·{' '}
          {settings?.currency || 'LKR'}{' '}
          {settings?.ai_monthly_price || '2000'}/mo
        </span>
      </div>

      <div>
        <PenTool />
        <span>
          <b>Studio Experts</b>
          Custom quotations
        </span>
      </div>

      <div>
        <Images />
        <span>
          <b>Album Design</b>
          From {settings?.currency || 'LKR'}{' '}
          {settings?.album_page_price || '250'}/page
        </span>
      </div>

      <div>
        <Printer />
        <span>
          <b>Printing</b>
          Talk to our studio
        </span>
      </div>

    </section>
  );
}

function Services() {

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');



  useEffect(() => {

    let active = true;



    async function loadServices() {

      try {

        const response = await getServices();



        if (active) {

          setServices(Array.isArray(response?.data) ? response.data : []);

        }

      } catch (err) {

        console.error('Services error:', err);



        if (active) {

          setError('Unable to load services.');

        }

      } finally {

        if (active) {

          setLoading(false);

        }

      }

    }



    loadServices();



    return () => {

      active = false;

    };

  }, []);



  const iconMap = {

    'wand-sparkles': WandSparkles,

    camera: Camera,

    'pen-tool': PenTool,

    sparkles: Sparkles,

    layers: Layers3,

    palette: Palette,

    printer: Printer,

  };



  return (

    <section className="section wrap" id="services">

      <SectionTitle

        eyebrow="OUR SERVICES"

        title={

          <>

            One studio. <em>Many ways</em> to make.

          </>

        }

        body="Choose a starting point. We’ll help you take it somewhere memorable."

      />



      {loading && <p>Loading services...</p>}



      {!loading && error && <p>{error}</p>}



      {!loading && !error && services.length === 0 && (

        <p>No services are available right now.</p>

      )}



      {!loading && !error && services.length > 0 && (

        <div className="service-grid">

          {services.map((service, index) => {

            const Icon = iconMap[service.icon] || Sparkles;



            return (

              <article className="service-card" key={service.id}>

                <div className="service-top">

                  <span className="index">

                    {String(index + 1).padStart(2, '0')}

                  </span>



                  <Icon size={22} />

                </div>



                <h3>{service.name}</h3>



                <p>

                  {service.short_description ||

                    service.description ||

                    'Creative service from Portable Creative Studio.'}

                </p>



                <div className="service-bottom">

                  <span>

                    {service.service_type === 'ai'

                      ? 'AI Creation'

                      : 'Studio Expert'}

                  </span>



                  <ArrowUpRight size={18} />

                </div>

              </article>

            );

          })}

        </div>

      )}

    </section>

  );

}



function Methods() {

  return (

    <section className="dark-section" id="how-it-works">

      <div className="wrap">

        <SectionTitle

          eyebrow="YOUR CREATIVE ROUTE"

          title={

            <>

              Choose how you <em>create.</em>

            </>

          }

          body="Some ideas need speed. Some need a human eye. You can always choose the right kind of help."

        />



        <div className="method-grid">

          <article className="method-card ai">

            <div className="method-icon">

              <WandSparkles />

            </div>



            <span className="eyebrow">01 / SELF-SERVICE</span>



            <h3>AI Creation</h3>



            <p>

              Get a consistent look across your images with a plan built for

              momentum.

            </p>



            <ul>

              <li>

                <Check />

                First month free

              </li>

              <li>

                <Check />

                Batch processing & previews

              </li>

              <li>

                <Check />

                Download when you’re ready

              </li>

            </ul>



            <Button href="#pricing">Try AI creation</Button>

          </article>



          <article className="method-card expert">

            <div className="method-icon">

              <PenTool />

            </div>



            <span className="eyebrow">02 / COLLABORATIVE</span>



            <h3>Studio Expert</h3>



            <p>

              Share your brief and work with a professional designer or editor,

              from first reference to final delivery.

            </p>



            <ul>

              <li>

                <Check />

                Custom quotation

              </li>

              <li>

                <Check />

                Preview & revision workflow

              </li>

              <li>

                <Check />

                Professional final delivery

              </li>

            </ul>



            <Button variant="outline" href="#contact">

              Work with our studio

            </Button>

          </article>

        </div>

      </div>

    </section>

  );

}



function Steps() {

  const steps = [

    'Choose a service',

    'Choose AI or Studio Expert',

    'Tell us what you need',

    'Review & receive',

  ];



  const descriptions = [

    'Start with the kind of creative help you need.',

    'Pick the pace and level of collaboration.',

    'Upload references, preferences or a brief.',

    'We refine, finish and get it to you.',

  ];



  return (

    <section className="section steps wrap">

      <SectionTitle

        eyebrow="A SIMPLE PROCESS"

        title={

          <>

            From thought to <em>finished.</em>

          </>

        }

      />



      <div className="step-grid">

        {steps.map((step, index) => (

          <div className="step" key={step}>

            <span>0{index + 1}</span>



            <div>

              <h3>{step}</h3>

              <p>{descriptions[index]}</p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}



function Editor() {

  return (

    <section className="feature wrap">

      <div className="feature-copy">

        <span className="eyebrow">AI PHOTO EDITING / PREVIEW</span>



        <h2>

          A consistent look. <em>Natural detail.</em>

        </h2>



        <p>

          Set your preferences once, then let a considered workflow do the

          heavy lifting.

        </p>



        <div className="chips">

          <span>

            Retouch <b>Light Natural</b>

          </span>

          <span>

            Preset <b>Warm Cinematic</b>

          </span>

          <span>

            Skin tone <b>Preserve original</b>

          </span>

          <span>

            Lighting <b>Auto correction</b>

          </span>

        </div>



        <Button href="#contact">Adjust sample</Button>

      </div>



      <div className="editor">

        <div className="editor-image before">

          <span>ORIGINAL PHOTO</span>

          <div className="portrait p1" />

        </div>



        <div className="editor-image after">

          <span>EDITED PREVIEW</span>

          <div className="portrait p2" />

        </div>



        <div className="editor-controls">

          <button type="button">

            <Play size={14} /> Compare

          </button>



          <span>01 / 02</span>



          <div className="progress">

            <i />

          </div>

        </div>

      </div>

    </section>

  );

}



function Album() {

  return (

    <section className="album-section">

      <div className="wrap album-wrap">

        <div className="album-copy">

          <span className="eyebrow">ALBUM DESIGN</span>



          <h2>

            Your story, <em>spread by spread.</em>

          </h2>



          <p>

            A quiet, professional layout that gives every image room to be

            remembered.

          </p>



          <div className="price">

            <small>Starting worker rate</small>



            <strong>

              LKR 250<sup>/page</sup>

            </strong>

          </div>



          <small>

            Cover and printing costs may vary depending on project

            requirements.

          </small>



          <Button variant="light" href="#contact">

            Create my album

          </Button>

        </div>



        <div className="album-book">

          <div className="book-page left">

            <span>

              THE

              <br />

              MOMENTS

              <br />

              BETWEEN

            </span>



            <div className="book-photo photo-a" />

          </div>



          <div className="book-page right">

            <div className="book-photo photo-b" />



            <small>

              CHAPTER 01

              <br />

              <b>

                Somewhere

                <br />

                beautiful.

              </b>

            </small>

          </div>



          <div className="page-count">01 — 24</div>

        </div>

      </div>

    </section>

  );

}



function Portfolio() {
  const [active, setActive] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  async function loadPortfolioItems() {
    try {
      setLoading(true);

      const response = await getPortfolio();

      setPortfolioItems(response.data || []);
    } catch (error) {
      console.error('Portfolio loading error:', error);
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  }

  const filters = [
    'All',
    'Photography',
    'Photo Editing',
    'Graphic Design',
    'Albums',
    'Branding',
  ];

  const shown =
    active === 'All'
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category?.name === active
        );

  return (
    <section className="section wrap" id="portfolio">
      <SectionTitle
        eyebrow="SELECTED CREATIVE WORK"
        title={
          <>
            A glimpse of what’s <em>possible.</em>
          </>
        }
      />

      <div className="filters">
        {filters.map((filter) => (
          <button
            type="button"
            className={active === filter ? 'active' : ''}
            onClick={() => setActive(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading && <p>Loading portfolio...</p>}

      {!loading && shown.length === 0 && (
        <p>No portfolio items available.</p>
      )}

      <div className="portfolio-grid">
        {shown.map((item) => (
          <article
  className={`portfolio-card ${item.is_featured ? 'featured' : ''}`}
  key={item.id}
>
            <div className="portfolio-art">
  {(item.thumbnail_path || item.image_path) ? (
    <img
      src={
        (item.thumbnail_path || item.image_path).startsWith('http')
          ? (item.thumbnail_path || item.image_path)
          : `http://127.0.0.1:8000/${(item.thumbnail_path || item.image_path).replace(/^\/+/, '')}`
      }
      alt={item.title}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  ) : (
    <>
      <span>{item.category?.name || 'Portfolio'}</span>
      <div className="orb" />
      <div className="grain" />
    </>
  )}
</div>

            <div className="portfolio-meta">
              <div>
                <h3>{item.title}</h3>

                <p>
                  {item.description ||
                    item.category?.name ||
                    'Creative Project'}
                </p>
              </div>

              <ArrowUpRight size={18} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}



function Pricing({ settings }) {
  return (
    <section className="pricing-section" id="pricing">
      <div className="wrap">
        <SectionTitle
          eyebrow="SIMPLE PRICING"
          title={
            <>
              Start small. <em>Grow from there.</em>
            </>
          }
          body="Clear starting points, with room for the work to become its best self."
        />

        <div className="pricing-grid">
          <div className="price-card featured">
            <span className="eyebrow">AI CREATION</span>

            <h3>Make more room for ideas.</h3>

            <div className="big-price">
              <strong>
                {settings?.currency || 'LKR'} 0
              </strong>

              <span>
                {settings?.ai_trial_text || 'First month free'}
              </span>
            </div>

            <p>
              Then {settings?.currency || 'LKR'}{' '}
              {settings?.ai_monthly_price || '2000'} / month.
              AI subscription services are separate from studio expert work.
            </p>

            <Button href="#contact">
              Start your free month
            </Button>
          </div>

          <div className="price-card">
            <span className="eyebrow">STUDIO EXPERT</span>

            <h3>Made around your brief.</h3>

            <div className="big-price">
              <strong>Custom</strong>
              <span>quotation</span>
            </div>

            <p>
              Professional photo editing, design, albums and print support
              quoted separately for your project.
            </p>

            <Button variant="outline" href="#contact">
              Talk to the studio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


function Contact({ settings }) {

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    service_id: '',

    message: '',

  });



  const [sent, setSent] = useState(false);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState('');



  function handleChange(event) {

    const { name, value } = event.target;



    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  }



  async function handleSubmit(event) {

    event.preventDefault();



    setSending(true);

    setError('');



    try {

      await sendContact({

        name: formData.name,

        email: formData.email,

        service_id: formData.service_id

          ? Number(formData.service_id)

          : null,

        message: formData.message,

      });



      setSent(true);

    } catch (err) {

      console.error('Contact error:', err);

      setError('Unable to send enquiry. Please try again.');

    } finally {

      setSending(false);

    }

  }



  return (

    <section className="contact wrap" id="contact">

      <div className="contact-copy">

        <span className="eyebrow">LET’S MAKE SOMETHING</span>



        <h2>

          Ready to create something <em>memorable?</em>

        </h2>



        <p>

          Tell us a little about the project. We’ll help you find the right

          next step.

        </p>



        <div className="contact-links">

  <a href={`mailto:${settings?.email || 'hello@portablecreative.studio'}`}>
    <Mail />
    {settings?.email || 'hello@portablecreative.studio'}
  </a>

  <a
    href={`https://wa.me/${settings?.whatsapp_number || '94755866297'}`}
    target="_blank"
    rel="noreferrer"
  >
    <MessageCircle />
    {settings?.phone || '0755866297'}
  </a>

  <span>
    <MapPin />
    {settings?.address || 'Matale, Sri Lanka'}
  </span>

</div>

      </div>



      <form onSubmit={handleSubmit}>

        {sent ? (

          <div className="form-success">

            <Check />



            <h3>Thanks — we’ll be in touch.</h3>



            <p>

              Your enquiry has been sent successfully.

            </p>

          </div>

        ) : (

          <>

            <label>

              Name

              <input

                required

                name="name"

                value={formData.name}

                onChange={handleChange}

                placeholder="Your name"

              />

            </label>



            <label>

              Email

              <input

                required

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="you@example.com"

              />

            </label>



            <label>

              What can we help with?

              <select

                name="service_id"

                value={formData.service_id}

                onChange={handleChange}

              >

                <option value="">Choose a service</option>

                <option value="1">AI Photo Editing</option>

                <option value="2">Professional Photo Editing</option>

                <option value="3">Graphic Design</option>

                <option value="4">Invitation Design</option>

                <option value="5">Album Design</option>

                <option value="6">

                  Branding & Social Media Design

                </option>

                <option value="7">Printing Support</option>

              </select>

            </label>



            <label>

              Message

              <textarea

                required

                name="message"

                value={formData.message}

                onChange={handleChange}

                placeholder="Tell us about your project..."

              />

            </label>



            {error && <p>{error}</p>}



            <button

              className="btn primary"

              type="submit"

              disabled={sending}

            >

              {sending ? 'Sending...' : 'Send enquiry'}

              <ArrowUpRight size={16} />

            </button>

          </>

        )}

      </form>

    </section>

  );

}



function Footer() {

  return (

    <footer>

      <div className="wrap footer-top">

        <div>

          <Logo />



          <p>

            Limitless creativity.

            <br />

            Anytime anywhere.

          </p>

        </div>



        <div className="footer-col">

          <b>Explore</b>

          <a href="#services">Services</a>

          <a href="#portfolio">Portfolio</a>

          <a href="#pricing">Pricing</a>

        </div>



        <div className="footer-col">

          <b>Studio</b>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

          <a href="#printing">Printing</a>

        </div>



        <div className="footer-col">

          <b>Follow along</b>



          <div className="social">

            <a

              href="https://wa.me/94755866297"

              target="_blank"

              rel="noreferrer"

              aria-label="WhatsApp"

            >

              <MessageCircle />

            </a>

          </div>

        </div>

      </div>



      <div className="wrap footer-bottom">

        <span>

          © {new Date().getFullYear()} Portable Creative Studio

        </span>



        <span>Terms · Privacy · Cancellation & Refund</span>

      </div>

    </footer>

  );

}



function App() {
const [siteSettings, setSiteSettings] = useState({});
 useEffect(() => {
  async function loadSiteSettings() {
    try {
      const response = await getPublicSettings();

      setSiteSettings(response.data || response || {});
    } catch (error) {
      console.error('Settings loading error:', error);
    }
  }

  loadSiteSettings();
}, []);

if (window.location.pathname === '/admin/login') {

    return <AdminLogin />;

  }
if (window.location.pathname === '/admin/portfolio') {
  return <AdminPortfolio />;
}
if (window.location.pathname === '/admin/enquiries') {
  return <AdminEnquiries />;
}
if (window.location.pathname === '/admin/dashboard') {
  return <AdminDashboard />;
}
if (window.location.pathname === '/admin/services') {
  return <AdminServices />;
}
  return (

    <>

      <Nav />



      <main>

        <Hero settings={siteSettings} />

        <QuickInfo settings={siteSettings} />

        <Services />

        <Methods />

        <Steps />

        <Editor />

        <Album />

        <Portfolio />

       <Pricing settings={siteSettings} />



        <section className="about wrap" id="about">

          <span className="eyebrow">A LITTLE ABOUT US</span>



          <h2>

            Creative ideas.

            <br />

            <em>Professional execution.</em>

          </h2>



          <p>

            Portable Creative Studio is a creative partner for photography,

            editing, graphic design, album design and print-ready work. Since

            2022, we’ve combined modern technology with a human eye for the

            details that matter.

          </p>



          <a href="#contact" className="text-link">

            Meet the studio <ArrowUpRight size={16} />

          </a>

        </section>


<Contact settings={siteSettings} />
      </main>



      <Footer />

    </>

  );

}



createRoot(document.getElementById('root')).render(<App />);
