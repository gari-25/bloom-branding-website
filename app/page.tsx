'use client';

import React, { useState, useEffect } from 'react';
import './page.css';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  const services = [
    { icon: '🎯', title: 'Brand Strategy', desc: 'Strategic foundations that resonate' },
    { icon: '✨', title: 'Content Creation', desc: 'Stories that captivate and convert' },
    { icon: '🎬', title: 'Production', desc: 'Stunning visuals that elevate' },
    { icon: '📱', title: 'Social Media', desc: 'Build communities, not followers' },
    { icon: '💻', title: 'Digital Experiences', desc: 'Interfaces that inspire' }
  ];

  const portfolio = [
  {
    id: 1,
    title: 'Fashion Brand Revival',
    category: 'Branding',
    image: '/portfolio/fashion.jpeg'
  },
  {
    id: 2,
    title: 'Jewellery Launch',
    category: 'Strategy',
    image: '/portfolio/jewellery.jpeg'
  },
  {
    id: 3,
    title: 'Lifestyle Identity',
    category: 'Design',
    image: '/portfolio/lifstyle.jpeg'
  },
  {
    id: 4,
    title: 'Thyme and whisk',
    category: 'Digital',
    image: '/portfolio/restaurant.jpeg'
  }
];


  const stats = [
    { number: '4+', label: 'Years of Experience' },
    { number: '75+', label: 'Happy Clients' },
    { number: '100+', label: 'Projects Completed' },
    
  ];

  type Testimonial = {
  text: string;
  author: string;
  company: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    text: 'Great work done by these people! One stop for all the assistance needed for digital marketing related work. The employees and all the staff here provide all the guidance to the best of your satisfaction.',
    author: 'Purva Shah',
    company: 'Lifestyle Brand',
    rating: 5
  },
  {
    text: 'I’ve been working with Bloom for past 4-5 months and my experience with them has been great! Both the founders are very creative and also the team is flexible managing shoot timings and dates and accommodating special requests needed be! I’d recommend you take that meeting :)',
    author: 'Nishant Shah',
    company: 'Startup Founder',
    rating: 4
  },
  {
    text: 'The bloom branding team is really hardworking and efficient. I am associated with bloom since more than a year now and they have taken my brand’s page from 20k followers to 50k + followers. Looking forward to touching 100k followers and many more effective collabs together.',
    author: 'Mansi Nagdev',
    company: 'Content Creator',
    rating: 5
  }
];


  const clients = [
    'Thyme and whisk', 'Kaffyn', 'Amar - fastfood center', "life's a beach", 'ShoP', "B'there", 
    'The Right Cut', 'Binal Patel', 'SubhRekha', 'Mansi Nagdev', 'Dhruv Gems', 'Vardhaman Diam'
  ];

  // Thyme and whisk, kaffyn, amar - fastfood center, life's a beach, ShoP, B'there, The Right Cut, 
  // Binal Patel,  SubhRekha, Mansi Nagdev, Dhruv Gems, Bafna Marble, Vardhaman Diam, AMBC Gems

  const instaPosts = [
    { id: 1, color: '#003DA5' },
    { id: 2, color: '#892F1A' },
    { id: 3, color: '#BDAF62' },
    { id: 4, color: '#624A41' },
    { id: 5, color: '#003DA5' },
    { id: 6, color: '#892F1A' }
  ];

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌸</span>
            Bloom Branding
          </div>
          <nav className="nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="/services" className="nav-link">Services</a>
            <a href="#work" className="nav-link">Our Work</a>
            <a href="/founder+story" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </nav>
          <button className="header-btn">Brand Enquiry</button>
        </div>
      </header>

      {/* Floating Background */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <div 
            className="hero-tag"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.3, 50)}px)`,
              opacity: Math.max(0, 1 - scrollY / 400)
            }}
          >
            <span className="tag-dot"></span>
            Where Brands Bloom
          </div>
          <h1 
            className="hero-title"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <span className="title-line">Blooming</span>
            <span className="title-accent">Your Brand</span>
            <span className="title-line">Into Greatness</span>
          </h1>
          <p 
            className="hero-subtitle"
            style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
          >
            Bringing synergy of aesthetics and expertise to help your brand bloom
            <br />we nurture your vision into a thriving brand that stands out and flourishes.
          </p>
          <div className="hero-cta">
            <button className="primary-btn">
              Start Your Journey
              <span className="btn-arrow">→</span>
            </button>
            <button className="secondary-btn">View Our Work</button>
          </div>
        </div>
        
        {/* Animated Brand Elements */}
        <div className="floating-elements">
          <div className="floating-item float-1">🌱</div>
          <div className="floating-item float-2">🌸</div>
          <div className="floating-item float-3">✨</div>
          <div className="floating-item float-4">🎨</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Services That Make Brands Bloom</h2>
          <p className="section-subtitle">
            Comprehensive branding solutions tailored to your unique needs
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${activeService === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-number">0{index + 1}</div>
            </div>
          ))}
        </div>

        <div className="services-footer">
          <button className="view-all-btn">
            Explore All Services
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="portfolio-section" id="work">
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Brands We've Helped Bloom</h2>
        </div>

        <div className="portfolio-grid">
  {portfolio.map((project) => (
    <div key={project.id} className="portfolio-card">
      <div className="portfolio-image">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <span className="portfolio-category">{project.category}</span>
        </div>
      </div>

      <div className="portfolio-content">
        <h3 className="portfolio-title">{project.title}</h3>
        <button className="portfolio-btn"></button>
      </div>
    </div>
  ))}
</div>


        <div className="portfolio-footer">
          <button className="view-all-btn">
            View Full Portfolio
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Stats/Journey Section */}
      <section className="stats-section">
        <div className="stats-content">
          <div className="stats-header">
            <h2 className="stats-title">Our Journey in Numbers</h2>
            <p className="stats-subtitle">
              Years of dedication, countless stories, and brands that flourish
            </p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="reviews-section">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className="testimonial-container">
          <button 
            className="testimonial-nav"
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            ←
          </button>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <span key={i} className="star">⭐</span>
              ))}
            </div>
            <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[currentTestimonial].author.charAt(0)}
              </div>
              <div>
                <div className="author-name">{testimonials[currentTestimonial].author}</div>
                <div className="author-company">{testimonials[currentTestimonial].company}</div>
              </div>
            </div>
          </div>

          <button 
            className="testimonial-nav"
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
          >
            →
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentTestimonial === index ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="clients-section">
        <div className="section-header">
          <span className="section-label">Trusted By</span>
          <h2 className="section-title">Brands That Chose to Bloom With Us</h2>
        </div>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-card">
              <div className="client-logo">{client}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Preview */}
      <section className="insta-section">
        <div className="section-header">
          <span className="section-label">Follow Our Journey</span>
          <h2 className="section-title">
            <span className="insta-icon">📷</span>
            @BloomBranding on Instagram
          </h2>
          <p className="section-subtitle">
            Daily inspiration, behind-the-scenes, and brand stories
          </p>
        </div>

        <div className="insta-grid">

  <blockquote
    className="instagram-media"
    data-instgrm-permalink="https://www.instagram.com/reel/C62yD1UNiZf/?utm_source=ig_embed&amp;utm_campaign=loading"
    data-instgrm-version="14"
  ></blockquote>

  <blockquote
    className="instagram-media"
    data-instgrm-permalink="https://www.instagram.com/reel/DMsJ2MVozcW/?utm_source=ig_embed&amp;utm_campaign=loading"
    data-instgrm-version="14"
  ></blockquote>

  <blockquote
    className="instagram-media"
    data-instgrm-permalink="https://www.instagram.com/reel/C4Sybe_NrDO/?utm_source=ig_embed&amp;utm_campaign=loading"
    data-instgrm-version="14"
  ></blockquote>

  <blockquote
    className="instagram-media"
    data-instgrm-permalink="https://www.instagram.com/reel/C6dtVd-NksW/?utm_source=ig_embed&amp;utm_campaign=loading"
    data-instgrm-version="14"
  ></blockquote>

</div>

        <div className="insta-footer">
  <a
    href="https://www.instagram.com/bloom.branding_/"
    target="_blank"
    rel="noopener noreferrer"
    className="insta-btn"
  >
    <span className="insta-icon-small">📱</span>
    Follow Us on Instagram
  </a>
</div>

      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Make Your Brand Bloom?</h2>
          <p className="cta-text">
            Let's cultivate something extraordinary together. Your brand's journey to greatness starts here.
          </p>
          <button className="cta-button">
            <span>Start Brand Enquiry</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-logo">
                <span className="logo-icon">🌸</span>
                Bloom Branding
              </h3>
              <p className="footer-text">
                Cultivating brands that flourish. We help businesses grow from seed to full bloom.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">💼</a>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-title">Services</h4>
              <a href="#" className="footer-link">Brand Strategy</a>
              <a href="#" className="footer-link">Content Creation</a>
              <a href="#" className="footer-link">Production</a>
              <a href="#" className="footer-link">Social Media</a>
              <a href="#" className="footer-link">Digital Experiences</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-title">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Our Work</a>
              <a href="#" className="footer-link">Our Story</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-title">Get in Touch</h4>
              <p className="footer-text">
                <strong>Email:</strong><br />
                hello.bloombranding@gmail.com
              </p>
              <p className="footer-text">
                <strong>Phone:</strong><br />
                97270 68674 | 99095 11226
              </p>
              <p className="footer-text">
                <strong>Location:</strong><br />
                123 Creative Street, Design City
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2026 Bloom Branding. All rights reserved.</p>
            <div className="footer-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <span className="footer-divider">|</span>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <span className="footer-divider">|</span>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;