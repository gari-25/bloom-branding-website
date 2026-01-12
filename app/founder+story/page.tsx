"use client";
import React, { useState, useEffect, useRef } from 'react';

const FounderStoryPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Track active section
      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>Bloom Branding</div>
          <nav style={styles.nav}>
            <a href="#home" style={styles.navLink}>Home</a>
            <a href="#services" style={styles.navLink}>Services</a>
            <a href="#story" style={styles.navLink}>Our Story</a>
            <a href="#founder" style={styles.navLink}>Founder</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </nav>
          <button style={styles.headerBtn}>Let's Talk</button>
        </div>
      </header>

      {/* Floating Background */}
      <div style={styles.bgShapes}>
        <div style={{...styles.shape, ...styles.shape1}}></div>
        <div style={{...styles.shape, ...styles.shape2}}></div>
        <div style={{...styles.shape, ...styles.shape3}}></div>
      </div>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={{
            ...styles.heroTitleWrapper,
            transform: `translateY(${scrollY * 0.3}px)`
          }}>
            <h1 style={styles.heroTitle}>
              <span style={styles.titleLine}>Where Brands</span>
              <span style={styles.heroAccent}>Bloom</span>
            </h1>
          </div>
          <p style={{
            ...styles.heroSubtitle,
            opacity: Math.max(0, 1 - scrollY / 400)
          }}>
            A journey of passion, creativity, and growth
          </p>
        </div>
        <div style={styles.heroDecor}></div>
      </section>

      {/* Story Introduction */}
      <section 
        ref={el => sectionRefs.current['story'] = el}
        style={styles.storyIntro}
      >
        <div style={styles.contentContainer}>
          <div style={styles.storyGrid}>
            <div style={styles.storyContent}>
              <span style={styles.sectionLabel}>Our Story</span>
              <h2 style={styles.sectionTitle}>The Seed of an Idea</h2>
              <p style={styles.storyParagraph}>
                Every great brand has a story. Ours began with a simple belief: that every business, 
                no matter how small, deserves to bloom. In a world saturated with noise, we saw an 
                opportunity to help authentic voices rise above the clutter.
              </p>
              <p style={styles.storyParagraph}>
                Bloom Branding was born from the intersection of creativity and strategy, where 
                artistry meets analytics, and where brands don't just grow—they flourish.
              </p>
            </div>
            <div style={styles.storyImageWrapper}>
              <div style={styles.storyImage}>
                <div style={styles.imagePlaceholder}>🌱</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.contentContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Our Values</span>
            <h2 style={styles.sectionTitle}>What We Stand For</h2>
          </div>
          <div style={styles.valuesGrid}>
            {[
              { icon: '🌸', title: 'Authenticity', desc: 'We believe in genuine connections and honest storytelling' },
              { icon: '🎨', title: 'Creativity', desc: 'Innovation and imagination fuel everything we create' },
              { icon: '🌿', title: 'Growth', desc: 'We nurture brands through every stage of their journey' },
              { icon: '✨', title: 'Excellence', desc: 'Quality and attention to detail in every project' }
            ].map((value, i) => (
              <div key={i} style={styles.valueCard} className="value-card">
                <div style={styles.valueIcon}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDesc}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={styles.timelineSection}>
        <div style={styles.contentContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Our Journey</span>
            <h2 style={styles.sectionTitle}>Growing Together</h2>
          </div>
          <div style={styles.timeline}>
            {[
              { year: '2018', title: 'The Beginning', text: 'Started with a vision to transform how brands tell their stories' },
              { year: '2020', title: 'Expanding Horizons', text: 'Grew our team and services, reaching 100+ clients' },
              { year: '2022', title: 'Award Recognition', text: 'Received industry accolades for creative excellence' },
              { year: '2024', title: 'Blooming Forward', text: 'Pioneering new approaches in digital branding and strategy' }
            ].map((milestone, i) => (
              <div key={i} style={styles.timelineItem}>
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineContent}>
                  <span style={styles.timelineYear}>{milestone.year}</span>
                  <h3 style={styles.timelineTitle}>{milestone.title}</h3>
                  <p style={styles.timelineText}>{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section 
        ref={el => sectionRefs.current['founder'] = el}
        style={styles.founderSection}
      >
        <div style={styles.contentContainer}>
          <div style={styles.founderGrid}>
            <div style={styles.founderImageWrapper}>
              <div style={styles.founderImage}>
                <div style={styles.founderPlaceholder}>👤</div>
              </div>
              <div style={styles.founderDecor}></div>
            </div>
            <div style={styles.founderContent}>
              <span style={styles.sectionLabel}>Meet the Founder</span>
              <h2 style={styles.founderName}>Your Name Here</h2>
              <p style={styles.founderTitle}>Founder & Creative Director</p>
              
              <div style={styles.founderBio}>
                <p style={styles.bioParagraph}>
                  "I've always believed that branding is more than just aesthetics—it's about 
                  creating meaningful connections between businesses and their audiences."
                </p>
                <p style={styles.bioParagraph}>
                  With over 15 years in the creative industry, I've had the privilege of working 
                  with brands across diverse sectors, from ambitious startups to established 
                  enterprises. My journey has been driven by one constant: a passion for helping 
                  brands discover their authentic voice and bloom in their markets.
                </p>
                <p style={styles.bioParagraph}>
                  At Bloom Branding, we don't just create campaigns—we cultivate relationships, 
                  nurture ideas, and watch brands flourish. Every project is a new opportunity 
                  to make something extraordinary.
                </p>
              </div>

              <div style={styles.founderStats}>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>15+</span>
                  <span style={styles.statLabel}>Years Experience</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>250+</span>
                  <span style={styles.statLabel}>Brands Served</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>50+</span>
                  <span style={styles.statLabel}>Awards Won</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={styles.philosophySection}>
        <div style={styles.contentContainer}>
          <div style={styles.philosophyContent}>
            <h2 style={styles.philosophyTitle}>Our Creative Philosophy</h2>
            <div style={styles.philosophyGrid}>
              <div style={styles.philosophyCard} className="philosophy-card">
                <h3 style={styles.philosophyCardTitle}>Listen First</h3>
                <p style={styles.philosophyCardText}>
                  Understanding your unique story is where every great brand begins
                </p>
              </div>
              <div style={styles.philosophyCard} className="philosophy-card">
                <h3 style={styles.philosophyCardTitle}>Create Boldly</h3>
                <p style={styles.philosophyCardText}>
                  Push boundaries while staying true to your authentic voice
                </p>
              </div>
              <div style={styles.philosophyCard} className="philosophy-card">
                <h3 style={styles.philosophyCardTitle}>Grow Together</h3>
                <p style={styles.philosophyCardText}>
                  Your success is our success—we're partners in your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Let's Make Your Brand Bloom</h2>
          <p style={styles.ctaText}>
            Ready to tell your story and grow your brand?
          </p>
          <button style={styles.ctaButton}>
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div style={styles.footerCol}>
              <h3 style={styles.footerLogo}>Bloom Branding</h3>
              <p style={styles.footerText}>
                Cultivating brands that flourish
              </p>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Quick Links</h4>
              <a href="#services" style={styles.footerLink}>Services</a>
              <a href="#story" style={styles.footerLink}>Our Story</a>
              <a href="#founder" style={styles.footerLink}>Founder</a>
              <a href="#contact" style={styles.footerLink}>Contact</a>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Connect</h4>
              <a href="#" style={styles.footerLink}>Instagram</a>
              <a href="#" style={styles.footerLink}>LinkedIn</a>
              <a href="#" style={styles.footerLink}>Twitter</a>
              <a href="#" style={styles.footerLink}>Behance</a>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Get in Touch</h4>
              <p style={styles.footerText}>hello@bloombranding.com</p>
              <p style={styles.footerText}>+1 (555) 123-4567</p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>© 2024 Bloom Branding. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes scroll {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
        
        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(137, 47, 26, 0.1);
        }
        
        .philosophy-card:hover {
          transform: translateY(-5px);
          border-color: #892F1A;
          box-shadow: 0 15px 40px rgba(137, 47, 26, 0.15);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FBF7F4',
    position: 'relative' as const,
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  contentContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
  },
  
  // Header Styles
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(251, 247, 244, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(137, 47, 26, 0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#892F1A',
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    gap: '40px',
  },
  navLink: {
    color: '#3D2925',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  headerBtn: {
    backgroundColor: '#892F1A',
    color: '#FBF7F4',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Background Shapes
  bgShapes: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  shape: {
    position: 'absolute' as const,
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.15,
  },
  shape1: {
    width: '600px',
    height: '600px',
    background: 'linear-gradient(135deg, #003DA5 0%, #BDAF62 100%)',
    top: '-200px',
    right: '-200px',
    animation: 'float 20s ease-in-out infinite',
  },
  shape2: {
    width: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #BDAF62 0%, #3D2925 100%)',
    bottom: '-150px',
    left: '-150px',
    animation: 'float 25s ease-in-out infinite reverse',
  },
  shape3: {
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #892F1A 0%, #003DA5 100%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'float 30s ease-in-out infinite',
  },

  // Hero Section
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    paddingTop: '80px',
  },
  heroContent: {
    textAlign: 'center' as const,
    zIndex: 1,
    maxWidth: '900px',
    padding: '0 40px',
  },
  heroTitleWrapper: {
    marginBottom: '30px',
  },
  heroTitle: {
    fontSize: '96px',
    fontWeight: '800',
    lineHeight: '1.1',
    margin: 0,
    color: '#3D2925',
  },
  titleLine: {
    display: 'block',
    color: '#3D2925',
  },
  heroAccent: {
    display: 'block',
    background: 'linear-gradient(135deg, #892F1A 0%, #BDAF62 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '24px',
    color: '#624A41',
    marginBottom: '40px',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  heroDecor: {
    position: 'absolute' as const,
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '2px',
    height: '80px',
    background: 'linear-gradient(to bottom, #892F1A, transparent)',
    animation: 'scroll 2s ease-in-out infinite',
  },

  // Story Section
  storyIntro: {
    padding: '120px 0',
    position: 'relative' as const,
    zIndex: 1,
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  storyContent: {
    padding: '40px 0',
  },
  sectionLabel: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#892F1A',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '52px',
    fontWeight: '700',
    color: '#3D2925',
    marginBottom: '30px',
    lineHeight: '1.2',
  },
  storyParagraph: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#624A41',
    marginBottom: '25px',
  },
  storyImageWrapper: {
    position: 'relative' as const,
  },
  storyImage: {
    width: '100%',
    aspectRatio: '4/5',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#003DA5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: '120px',
  },

  // Values Section
  valuesSection: {
    padding: '120px 0',
    backgroundColor: 'rgba(189, 175, 98, 0.05)',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '80px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
  },
  valueCard: {
    backgroundColor: '#FFFFFF',
    padding: '40px 30px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(137, 47, 26, 0.1)',
  },
  valueIcon: {
    fontSize: '60px',
    marginBottom: '25px',
  },
  valueTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#3D2925',
    marginBottom: '15px',
  },
  valueDesc: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#624A41',
  },

  // Timeline Section
  timelineSection: {
    padding: '120px 0',
  },
  timeline: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative' as const,
  },
  timelineItem: {
    display: 'flex',
    gap: '40px',
    marginBottom: '60px',
    position: 'relative' as const,
  },
  timelineDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#892F1A',
    border: '4px solid #FBF7F4',
    boxShadow: '0 0 0 2px #892F1A',
    flexShrink: 0,
    marginTop: '5px',
    position: 'relative' as const,
    zIndex: 2,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '20px',
  },
  timelineYear: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '700',
    color: '#BDAF62',
    marginBottom: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  timelineTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#3D2925',
    marginBottom: '12px',
  },
  timelineText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#624A41',
  },

  // Founder Section
  founderSection: {
    padding: '120px 0',
    backgroundColor: 'rgba(0, 61, 165, 0.03)',
  },
  founderGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '80px',
    alignItems: 'center',
  },
  founderImageWrapper: {
    position: 'relative' as const,
  },
  founderImage: {
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#003DA5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    zIndex: 1,
  },
  founderPlaceholder: {
    fontSize: '180px',
    opacity: 0.3,
  },
  founderDecor: {
    position: 'absolute' as const,
    top: '30px',
    left: '30px',
    right: '-30px',
    bottom: '-30px',
    border: '3px solid #BDAF62',
    borderRadius: '20px',
    zIndex: 0,
  },
  founderContent: {
    padding: '20px 0',
  },
  founderName: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#3D2925',
    marginBottom: '10px',
  },
  founderTitle: {
    fontSize: '20px',
    color: '#892F1A',
    fontWeight: '600',
    marginBottom: '40px',
  },
  founderBio: {
    marginBottom: '50px',
  },
  bioParagraph: {
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#624A41',
    marginBottom: '20px',
  },
  founderStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  statNumber: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#892F1A',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#624A41',
    fontWeight: '500',
  },

  // Philosophy Section
  philosophySection: {
    padding: '120px 0',
    backgroundColor: 'rgba(137, 47, 26, 0.03)',
  },
  philosophyContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  philosophyTitle: {
    fontSize: '52px',
    fontWeight: '700',
    color: '#3D2925',
    textAlign: 'center' as const,
    marginBottom: '80px',
  },
  philosophyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  philosophyCard: {
    backgroundColor: '#FFFFFF',
    padding: '50px 40px',
    borderRadius: '20px',
    border: '2px solid rgba(137, 47, 26, 0.1)',
    transition: 'all 0.3s ease',
  },
  philosophyCardTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#892F1A',
    marginBottom: '20px',
  },
  philosophyCardText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#624A41',
  },

  // CTA Section
  ctaSection: {
    padding: '120px 40px',
    background: 'linear-gradient(135deg, #892F1A 0%, #624A41 100%)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center' as const,
    position: 'relative' as const,
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: '56px',
    fontWeight: '800',
    color: '#FBF7F4',
    marginBottom: '20px',
  },
  ctaText: {
    fontSize: '22px',
    color: 'rgba(251, 247, 244, 0.9)',
    marginBottom: '40px',
  },
  ctaButton: {
    backgroundColor: '#BDAF62',
    color: '#3D2925',
    border: 'none',
    padding: '18px 50px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },

  // Footer
  footer: {
    backgroundColor: '#3D2925',
    color: '#FBF7F4',
    padding: '80px 40px 40px',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '60px',
    marginBottom: '60px',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#BDAF62',
    marginBottom: '10px',
  },
  footerTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#FBF7F4',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '14px',
    color: 'rgba(251, 247, 244, 0.7)',
    lineHeight: '1.6',
  },
  footerLink: {
    fontSize: '14px',
    color: 'rgba(251, 247, 244, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  footerBottom: {
    borderTop: '1px solid rgba(251, 247, 244, 0.1)',
    paddingTop: '30px',
    textAlign: 'center' as const,
  },
  copyright: {
    fontSize: '14px',
    color: 'rgba(251, 247, 244, 0.5)',
  },
};

export default FounderStoryPage;