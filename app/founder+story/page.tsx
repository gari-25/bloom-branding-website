"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FounderStory.module.css";

const FounderStory: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Detect active section
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    {
      title: "Authenticity",
      description: "We believe every brand has a unique story waiting to bloom. Authenticity isn't just a buzzword—it's the root of meaningful connections.",
      icon: "🌱"
    },
    {
      title: "Innovation",
      description: "Like flowers reaching for the sun, we constantly evolve, embracing new technologies and creative approaches to help brands flourish.",
      icon: "💡"
    },
    {
      title: "Partnership",
      description: "Growth happens together. We cultivate lasting relationships, nurturing your brand's journey from seed to full bloom.",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "Every petal matters. We pour passion and precision into every project, ensuring your brand blossoms beautifully.",
      icon: "⭐"
    }
  ];

  return (
    <div className={styles.container}>
      <header className="site-header">
  <div className="header-inner">
    {/* Logo */}
    <div className="header-logo">
      <span className="logo-flower">🌸</span>
      <span className="logo-text">Bloom Branding</span>
    </div>

    {/* Navigation */}
    <nav className="header-nav">
      <a href="/ " className="nav-item">Home</a>
      <a href="/services" className="nav-item">Services</a>
      <a href="/work" className="nav-item">Our Work</a>
      <a href="/founder+story" className="nav-item">About</a>
      <a href="/contact" className="nav-item">Contact</a>
    </nav>

    {/* CTA */}
    <a href="/contact" className="header-cta">
      Brand Enquiry
    </a>
  </div>
</header>

      {/* Hero Section with 3D Effect */}
      <section className={styles.hero}>
        <div 
          className={styles.heroContent}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className={styles.floatingFlower}>🌸</div>
          <h1 className={styles.heroTitle}>
            Where Brands
            <span className={styles.bloomText}> Bloom</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A journey of creativity, passion, and growth
          </p>
        </div>
        <div 
          className={styles.heroBackground}
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
          }}
        />
      </section>

      {/* Story Section */}
      <section 
        className={styles.storySection}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className={styles.storyGrid}>
          <div className={styles.storyImage}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.imageContent}>
                <span className={styles.imageIcon}>🌺</span>
              </div>
            </div>
          </div>
          <div className={styles.storyContent}>
            <span className={styles.sectionLabel}>Our Beginning</span>
            <h2 className={styles.sectionTitle}>The Seed of an Idea</h2>
            <p className={styles.paragraph}>
              In 2020, amidst a world in transformation, Bloom Branding was born from a simple yet powerful belief: every brand deserves to flourish. What started as a small studio with big dreams has grown into a creative powerhouse, helping businesses of all sizes find their unique voice and visual identity.
            </p>
            <p className={styles.paragraph}>
              Like a garden tended with care, we've cultivated our craft, learning, evolving, and blooming alongside our clients. Each project is a new seed planted, each success story a flower that adds to our ever-growing garden.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section with Parallax */}
      <section 
        className={styles.philosophySection}
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div 
          className={styles.philosophyBackground}
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div className={styles.philosophyContent}>
          <span className={styles.sectionLabel}>Our Philosophy</span>
          <h2 className={styles.sectionTitleLight}>Blooming the Brand</h2>
          <p className={styles.philosophyText}>
            We don't just design brands—we nurture them. Like a gardener who understands that each plant needs unique care, we recognize that every brand has its own rhythm, its own story, its own time to bloom.
          </p>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <div className={styles.cardNumber}>01</div>
              <h3>Plant the Seed</h3>
              <p>Understanding your vision, values, and voice</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.cardNumber}>02</div>
              <h3>Nurture Growth</h3>
              <p>Crafting strategy and creative solutions</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.cardNumber}>03</div>
              <h3>Watch it Bloom</h3>
              <p>Launching and evolving your brand</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        className={styles.valuesSection}
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <span className={styles.sectionLabel}>Our Values</span>
        <h2 className={styles.sectionTitle}>Rooted in Purpose</h2>
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div 
              key={index}
              className={styles.valueCard}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={styles.valueIcon}>{value.icon}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section 
        className={styles.founderSection}
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className={styles.founderGrid}>
          <div className={styles.founderImageContainer}>
            <div className={styles.founderImage}>
              <div className={styles.founderImagePlaceholder}>
                <span className={styles.founderIcon}>👤</span>
              </div>
              <div className={styles.floatingElement} style={{ top: '10%', left: '10%' }}>✨</div>
              <div className={styles.floatingElement} style={{ top: '70%', right: '15%' }}>🌟</div>
              <div className={styles.floatingElement} style={{ bottom: '15%', left: '20%' }}>💫</div>
            </div>
          </div>
          <div className={styles.founderContent}>
            <span className={styles.sectionLabel}>Meet the Founder</span>
            <h2 className={styles.sectionTitle}>Sarah Chen</h2>
            <p className={styles.founderRole}>Creative Director & Founder</p>
            <p className={styles.paragraph}>
              "I've always believed that branding is more than aesthetics—it's about capturing the essence of a dream and giving it wings to fly."
            </p>
            <p className={styles.paragraph}>
              With over 15 years in the creative industry, I've had the privilege of working with startups finding their voice and established brands rediscovering their purpose. My journey began in a small design studio in Mumbai, where I learned that the most powerful brands are those that stay true to their roots while reaching for the sky.
            </p>
            <p className={styles.paragraph}>
              At Bloom Branding, we've created a space where creativity flourishes, where ideas are nurtured, and where every project is an opportunity to make something beautiful and meaningful. This isn't just my company—it's a garden we all tend together.
            </p>
            <div className={styles.founderStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>200+</div>
                <div className={styles.statLabel}>Brands Bloomed</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Awards Won</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section 
        className={styles.timelineSection}
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <span className={styles.sectionLabel}>The Journey</span>
        <h2 className={styles.sectionTitle}>Our Growth Story</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2020</div>
            <div className={styles.timelineContent}>
              <h3>The Beginning</h3>
              <p>Founded Bloom Branding with a vision to transform how brands tell their stories</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2021</div>
            <div className={styles.timelineContent}>
              <h3>First Bloom</h3>
              <p>Expanded team and launched 50+ successful brand identities</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2022</div>
            <div className={styles.timelineContent}>
              <h3>Recognition</h3>
              <p>Won Best Branding Agency award and opened second office</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2023</div>
            <div className={styles.timelineContent}>
              <h3>Global Reach</h3>
              <p>Partnered with international brands across 15 countries</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2024</div>
            <div className={styles.timelineContent}>
              <h3>Innovation Hub</h3>
              <p>Launched AI-powered branding tools and creative workshops</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Bloom?</h2>
          <p className={styles.ctaText}>
            Let's nurture your brand together and watch it flourish into something extraordinary.
          </p>
          <button className={styles.ctaButton}>Start Your Journey</button>
        </div>
        <div className={styles.floatingFlowers}>
          <span className={styles.flower}>🌸</span>
          <span className={styles.flower}>🌺</span>
          <span className={styles.flower}>🌼</span>
          <span className={styles.flower}>🌻</span>
          <span className={styles.flower}>🌷</span>
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

export default FounderStory;