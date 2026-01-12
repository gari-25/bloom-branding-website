'use client';

import React, { useState, useEffect, useRef } from 'react';
import './service.css';

interface Service {
  id: number;
  title: string;
  impact: string;
  description: string;
  icon: string;
}

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which cards are visible
      serviceRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isVisible && !visibleCards.includes(index)) {
            setVisibleCards(prev => [...prev, index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCards]);

  const services: Service[] = [
    {
      id: 1,
      title: 'Brand Strategy',
      impact: 'Transform your vision into a powerful market position',
      description: 'We craft strategic foundations that resonate with your audience and differentiate you in the marketplace.',
      icon: '🎯'
    },
    {
      id: 2,
      title: 'Content Creation',
      impact: 'Stories that captivate and convert',
      description: 'Compelling narratives that engage your audience and drive meaningful action across all platforms.',
      icon: '✨'
    },
    {
      id: 3,
      title: 'Production',
      impact: 'Bring your brand to life with stunning visuals',
      description: 'From concept to execution, we produce high-quality content that elevates your brand presence.',
      icon: '🎬'
    },
    {
      id: 4,
      title: 'Social Media Branding',
      impact: 'Build communities, not just followers',
      description: 'Strategic social presence that creates authentic connections and drives sustainable growth.',
      icon: '📱'
    },
    {
      id: 5,
      title: 'Digital Experiences',
      impact: 'Interfaces that inspire and perform',
      description: 'Frontend-oriented digital solutions that combine beautiful design with seamless functionality.',
      icon: '💻'
    }
  ];

  const scrollToServices = () => {
    const servicesSection = document.querySelector('.services-section');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="services-container">
      {/* Floating Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div 
            className="hero-title-wrapper"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <h1 className="hero-title">
              <span className="title-line">Services That</span>
              <span className="hero-accent">Bloom</span>
            </h1>
          </div>
          <p 
            className="hero-subtitle"
            style={{ 
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.15}px)` 
            }}
          >
            We don't just deliver services—we cultivate growth, nurture brands, and help businesses flourish
          </p>
          <button className="hero-cta" onClick={scrollToServices}>
            Explore Services
            <span className="arrow">↓</span>
          </button>
        </div>
        <div className="hero-decor-1"></div>
        <div className="hero-decor-2"></div>
        <div className="hero-gradient"></div>
      </section>

      {/* Scroll Indicator */}
      <div 
        className="scroll-indicator"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <div className="scroll-line"></div>
      </div>

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-header" data-scroll>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Each service is designed to create impact and drive measurable results
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => serviceRefs.current[index] = el}
              className={`service-card ${visibleCards.includes(index) ? 'visible' : ''} ${activeService === service.id ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-glow"></div>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-impact">{service.impact}</p>
              <p className="service-description">{service.description}</p>
              
              <div className="service-hover">
                <button className="learn-more">
                  <span>Explore Service</span>
                  <span className="arrow-right">→</span>
                </button>
              </div>

              <div className="card-number">0{service.id}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">250+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Industry Awards</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-header">
          <span className="section-label">How We Work</span>
          <h2 className="process-title">Our Approach</h2>
        </div>
        <div className="process-timeline">
          {[
            { number: '01', title: 'Discover', text: 'Deep dive into your brand, audience, and goals', color: '#892F1A' },
            { number: '02', title: 'Design', text: 'Craft strategic solutions tailored to your needs', color: '#BDAF62' },
            { number: '03', title: 'Deliver', text: 'Execute with precision and measure results', color: '#624A41' },
            { number: '04', title: 'Grow', text: 'Iterate and optimize for continuous improvement', color: '#892F1A' }
          ].map((step, index) => (
            <div key={step.number} className="process-step">
              <div className="step-connector"></div>
              <div className="step-circle" style={{ borderColor: step.color }}>
                <span className="process-number" style={{ color: step.color }}>{step.number}</span>
              </div>
              <div className="step-content">
                <h4 className="process-step-title">{step.title}</h4>
                <p className="process-step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Bloom?</h2>
          <p className="cta-text">
            Let's create something extraordinary together
          </p>
          <button className="cta-button">
            <span>Start Your Project</span>
            <div className="button-glow"></div>
          </button>
        </div>
        <div className="cta-pattern"></div>
      </section>
    </div>
  );
};

export default ServicesPage;