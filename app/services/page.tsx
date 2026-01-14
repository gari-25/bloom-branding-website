'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  accent: string;
}

const ServicesPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const services: Service[] = [
    {
      id: 1,
      title: 'Brand Strategy',
      subtitle: 'Building Foundations That Last',
      impact: 'Position your brand for lasting market dominance',
      description: 'We architect your brand\'s DNA—from positioning and messaging to visual identity systems. Through deep market analysis and audience insights, we create strategic frameworks that differentiate you in crowded markets.',
      features: [
        'Brand Positioning & Architecture',
        'Market Research & Competitive Analysis',
        'Visual Identity Systems',
        'Messaging & Voice Development'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      color: '#0047AB',
      accent: '#F4E8B2'
    },
    {
      id: 2,
      title: 'Content Creation',
      subtitle: 'Stories That Resonate',
      impact: 'Transform ideas into engagement engines',
      description: 'From scroll-stopping social media posts to thought leadership articles, we craft narratives that resonate. Our content strategy blends creativity with data-driven insights to produce material that drives measurable business outcomes.',
      features: [
        'Editorial & Copywriting',
        'Social Media Content',
        'Blog & Thought Leadership',
        'Content Strategy & Planning'
      ],
      image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1200&q=80',
      color: '#4A4A4A',
      accent: '#F4E8B2'
    },
    {
      id: 3,
      title: 'Production',
      subtitle: 'Visual Excellence',
      impact: 'Cinematic storytelling that elevates your brand',
      description: 'End-to-end production services including video campaigns, photography, and multimedia content. We handle everything from concept development to final delivery—creating visual experiences that leave lasting impressions.',
      features: [
        'Video Production & Editing',
        'Commercial Photography',
        'Motion Graphics & Animation',
        'Post-Production & Color Grading'
      ],
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
      color: '#0047AB',
      accent: '#E8E4D9'
    },
    {
      id: 4,
      title: 'Social Media Branding',
      subtitle: 'Communities That Grow',
      impact: 'Build audiences that become advocates',
      description: 'Strategic social media management that goes beyond posting. We develop platform-specific strategies, create thumb-stopping content, engage communities authentically, and leverage analytics to optimize performance.',
      features: [
        'Platform Strategy & Management',
        'Community Engagement',
        'Influencer Partnerships',
        'Analytics & Performance Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
      color: '#F4E8B2',
      accent: '#0047AB'
    },
    {
      id: 5,
      title: 'Digital Experiences',
      subtitle: 'Interfaces That Convert',
      impact: 'Websites that turn visitors into customers',
      description: 'Frontend-focused web development that merges stunning design with flawless functionality. We build responsive, performant digital experiences using modern frameworks and design systems that scale with your business.',
      features: [
        'Custom Web Development',
        'Responsive Design Systems',
        'E-commerce Solutions',
        'Performance Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
      color: '#4A4A4A',
      accent: '#0047AB'
    }
  ];

  const scrollToServices = () => {
    sectionRefs.current[0]?.scrollIntoView({ behavior: 'smooth' });
  };

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 50;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 50;
const navLinkStyle = (scrollY: number) => ({
  color: scrollY > 50 ? '#E8E4D9' : '#4A4A4A',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
});

  return (
    <div style={{ 
      backgroundColor: '#E8E4D9',
      color: '#4A4A4A',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrollY > 50 ? '#624A41' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrollY > 50 ? '1px solid rgba(244, 232, 178, 0.2)' : 'none'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
           
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: scrollY > 50 ? '#F4E8B2' : '#4A4A4A',
              transition: 'color 0.3s ease'
            }}>
              Bloom Branding
            </span>
          </div>
          
         <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link href="/" style={navLinkStyle(scrollY)}>Home</Link>
  <Link href="/services" style={navLinkStyle(scrollY)}>Services</Link>
  <Link href="/founder+story" style={navLinkStyle(scrollY)}>About</Link>
  <Link href="/work" style={navLinkStyle(scrollY)}>Work</Link>
  <Link href="/contact" style={navLinkStyle(scrollY)}>Contact</Link>
</nav>

        </div>
      </header>

      {/* Hero Section with Enhanced 3D Elements */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #E8E4D9 0%, #F5F3EA 100%)',
        overflow: 'hidden',
        paddingTop: '80px'
      }}>
        {/* 3D Background Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: 0.6
        }}>
          {/* Large Floating Sphere */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #0047AB, rgba(0, 71, 171, 0.3))',
            top: '10%',
            left: '5%',
            transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5 + scrollY * 0.3}px)`,
            opacity: 0.4,
            filter: 'blur(60px)',
            animation: 'float1 20s ease-in-out infinite',
            transition: 'transform 0.3s ease-out',
            boxShadow: '0 0 100px rgba(0, 71, 171, 0.3)'
          }}/>
          
          {/* Medium Floating Sphere */}
          <div style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #F4E8B2, rgba(244, 232, 178, 0.2))',
            top: '50%',
            right: '10%',
            transform: `translate(${parallaxX * -0.3}px, ${parallaxY * -0.3 + scrollY * 0.2}px)`,
            opacity: 0.5,
            filter: 'blur(50px)',
            animation: 'float2 15s ease-in-out infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
          
          {/* Dark Sphere */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #4A4A4A, rgba(74, 74, 74, 0.2))',
            bottom: '15%',
            left: '15%',
            transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4 + scrollY * 0.25}px)`,
            opacity: 0.3,
            filter: 'blur(40px)',
            animation: 'float3 18s ease-in-out infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
          
          {/* 3D Cube Elements */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #0047AB, #4A4A4A)',
            top: '20%',
            right: '30%',
            transform: `rotate(${scrollY * 0.2}deg) translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
            opacity: 0.15,
            animation: 'rotate3d 25s linear infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
          
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #F4E8B2, #E8E4D9)',
            bottom: '30%',
            right: '15%',
            transform: `rotate(${-scrollY * 0.15}deg) translate(${parallaxX * -0.4}px, ${parallaxY * -0.4}px)`,
            opacity: 0.2,
            animation: 'rotate3dReverse 20s linear infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
          
          {/* Rotating 3D Rings */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            border: '3px solid #0047AB',
            borderRadius: '50%',
            top: '30%',
            right: '20%',
            opacity: 0.15,
            transform: `rotate(${scrollY * 0.1}deg) translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px) rotateX(60deg)`,
            animation: 'rotate 30s linear infinite',
            transition: 'transform 0.3s ease-out',
            boxShadow: '0 10px 50px rgba(0, 71, 171, 0.2)'
          }}/>
          
          <div style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            border: '3px solid #F4E8B2',
            borderRadius: '50%',
            bottom: '25%',
            left: '25%',
            opacity: 0.2,
            transform: `rotate(${-scrollY * 0.15}deg) translate(${parallaxX * -0.2}px, ${parallaxY * -0.2}px) rotateY(45deg)`,
            animation: 'rotateReverse 25s linear infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
          
          {/* Floating Geometric Shapes */}
          <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: '86px solid #0047AB',
            top: '60%',
            left: '40%',
            opacity: 0.1,
            transform: `translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px) rotateZ(${scrollY * 0.3}deg)`,
            animation: 'float1 22s ease-in-out infinite',
            transition: 'transform 0.3s ease-out'
          }}/>
        </div>
        
        <div style={{
          textAlign: 'center',
          zIndex: 1,
          padding: '0 2rem',
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollY / 600)
        }}>
          <div style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#0047AB',
            letterSpacing: '0.3em',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            fontWeight: 400,
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            WHAT WE DO
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
            animation: 'fadeInUp 1s ease-out 0.4s both'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #4A4A4A 0%, #0047AB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              transform: `translateY(${scrollY * 0.1}px)`
            }}>
              Services That
            </span>
            <br/>
            <span style={{ 
              color: '#0047AB',
              display: 'inline-block',
              transform: `translateY(${scrollY * 0.15}px)`
            }}>
              Bloom
            </span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            maxWidth: '700px',
            margin: '2rem auto',
            color: '#4A4A4A',
            lineHeight: 1.6,
            fontWeight: 400,
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}>
            We cultivate growth, nurture brands, and help businesses flourish
          </p>
          
          <button onClick={scrollToServices} style={{
            padding: '1.2rem 3rem',
            fontSize: '1rem',
            background: 'transparent',
            color: '#0047AB',
            border: '2px solid #0047AB',
            cursor: 'pointer',
            marginTop: '2rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.4s ease',
            fontWeight: 600,
            animation: 'fadeInUp 1s ease-out 0.8s both',
            borderRadius: '0'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0047AB';
            e.currentTarget.style.color = '#E8E4D9';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 71, 171, 0.3)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#0047AB';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            EXPLORE SERVICES ↓
          </button>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, -40px); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-40px, 30px); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(25px, 25px); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes rotateReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          @keyframes rotate3d {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            50% { transform: rotateX(180deg) rotateY(180deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
          
          @keyframes rotate3dReverse {
            0% { transform: rotateX(360deg) rotateY(360deg); }
            50% { transform: rotateX(180deg) rotateY(180deg); }
            100% { transform: rotateX(0deg) rotateY(0deg); }
          }
        `}</style>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          ref={el => sectionRefs.current[index] = el}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '4rem 2rem',
            background: index % 2 === 0 ? '#E8E4D9' : '#F5F3EA'
          }}
        >
          <div style={{
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{
              order: index % 2 === 0 ? 1 : 2,
              opacity: activeSection === index ? 1 : 0.4,
              transform: `translateX(${activeSection === index ? 0 : (index % 2 === 0 ? -30 : 30)}px)`,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: service.color === '#F4E8B2' ? '#4A4A4A' : service.color,
                letterSpacing: '0.2em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                0{service.id}
              </div>
              
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                margin: '0 0 1rem 0',
                color: service.color === '#F4E8B2' ? '#4A4A4A' : service.color,
                lineHeight: 1.2
              }}>
                {service.title}
              </h2>
              
              <h3 style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                fontWeight: 300,
                margin: '0 0 2rem 0',
                color: '#4A4A4A'
              }}>
                {service.subtitle}
              </h3>
              
              <p style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                lineHeight: 1.8,
                color: '#4A4A4A',
                marginBottom: '1.5rem',
                fontWeight: 600
              }}>
                {service.impact}
              </p>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4A4A4A',
                marginBottom: '3rem'
              }}>
                {service.description}
              </p>
              
              <div style={{ marginBottom: '3rem' }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    opacity: activeSection === index ? 1 : 0,
                    transform: `translateY(${activeSection === index ? 0 : 20}px)`,
                    transition: `all 0.5s ease ${idx * 0.1}s`
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: service.color === '#F4E8B2' ? '#0047AB' : service.color,
                      marginRight: '1rem',
                      flexShrink: 0
                    }}/>
                    <span style={{
                      fontSize: '1rem',
                      color: '#4A4A4A'
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
             
            </div>

            <div style={{
              order: index % 2 === 0 ? 2 : 1,
              position: 'relative',
              height: '600px',
              opacity: activeSection === index ? 1 : 0.5,
              transform: `scale(${activeSection === index ? 1 : 0.95})`,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-20px',
                background: `linear-gradient(135deg, ${service.color}40 0%, ${service.accent}30 100%)`,
                filter: 'blur(40px)',
                opacity: activeSection === index ? 0.6 : 0.2,
                transition: 'opacity 0.8s ease'
              }}/>
              
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                border: `3px solid ${service.color === '#F4E8B2' ? '#0047AB' : service.color}`
              }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${activeSection === index ? 1.05 : 1})`,
                    transition: 'transform 0.8s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${service.color}50 0%, transparent 100%)`,
                  mixBlendMode: 'multiply'
                }}/>
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-30px',
                fontSize: '12rem',
                fontWeight: 900,
                color: service.color === '#F4E8B2' ? '#0047AB' : service.color,
                opacity: 0.08,
                lineHeight: 1,
                pointerEvents: 'none'
              }}>
                0{service.id}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0047AB 0%, #4A4A4A 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '4rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          zIndex: 1,
          maxWidth: '800px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#E8E4D9'
          }}>
            Ready to Bloom?
          </h2>
          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            marginBottom: '3rem',
            color: '#F4E8B2',
            lineHeight: 1.6
          }}>

            Let's create something extraordinary together
          </p>
          <button style={{
            padding: '1.5rem 4rem',
            fontSize: '1.1rem',
            background: '#F4E8B2',
            color: '#4A4A4A',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(244, 232, 178, 0.4)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Start Your Project
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
        <p className="footer-text"><strong>Email:</strong><br />hello.bloombranding@gmail.com</p>
        <p className="footer-text"><strong>Phone:</strong><br />97270 68674 | 99095 11226</p>
        <p className="footer-text"><strong>Location:</strong><br />123 Creative Street, Design City</p>
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
    <style>{`
.footer {
  background: #624A41;
  color: #E8E4D9;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-icon {
  margin-right: 0.5rem;
}

.footer-title {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #F4E8B2;
  letter-spacing: 0.08em;
}

.footer-text {
  color: #E8E4D9;
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-link {
  display: block;
  color: #E8E4D9;
  text-decoration: none;
  margin-bottom: 0.6rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #F4E8B2;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
}

.social-icon {
  font-size: 1.2rem;
  text-decoration: none;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(244,232,178,0.2);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-link {
  color: #E8E4D9;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-divider {
  margin: 0 0.5rem;
  opacity: 0.5;
}

.copyright {
  font-size: 0.85rem;
  opacity: 0.8;
}
`}</style>

  </div>
</footer>

    </div>
  );
};

export default ServicesPage;