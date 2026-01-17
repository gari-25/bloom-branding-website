"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock testimonials data - in real app, fetch from backend
  const testimonials = [
    {
      id: 1,
      name: "Mansi Nagdev",
      role: "CEO, TechStart Inc.",
      
      text: "The bloom branding team is really hardworking and efficient. I am associated with bloom since more than a year now and they have taken my brand’s page from 20k followers to 50k + followers. Looking forward to touching 100k followers and many more effective collabs together. So wish they were in my city though to really make organic content for me as I suck at it myself.",
      rating: 5,
      type: "text"
    },
    {
      id: 2,
      name: "Purva Shah",
      role: "Marketing Director, GrowthCo",
      
      text: "Great work done by these people! One stop for all the assistance needed for digital marketing related work. The employees and all the staff here provide all the guidance to the best of your satisfaction.",
      rating: 5,
      type: "text"
    },
    {
      id: 3,
      name: "Nishant Shah",
      role: "Founder, StyleHub",
      
      text: "I’ve been working with Bloom for past 4-5 months and my experience with them has been great! Both the founders are very creative and also the team is flexible managing shoot timings and dates and accommodating special requests needed be! I’d recommend you take that meeting :)",
      rating: 4,
      type: "text"
    },
    {
      id: 4,
      name: "Shwet Tejani",
      role: "CMO, BrandVision",
      
      text: "It was such a nice experience working with Bloom Branding. The way they measure every single detail is amazing, and apart from that, it really helped my business. Keep it up, Bloom Branding and team, and thank you.",
      rating: 5,
      type: "text"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index:number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating:number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
  };

  return (
    <>
      <style>{`
        /* Exact Color Palette from Image */
        :root {
          --color-beige: #DBD7C8;
          --color-blue: #0047AB;
          --color-cream: #F5EDC8;
          --color-brown: #49382D;
          --color-white: #FFFFFF;
        }

        * {
          box-sizing: border-box;
        }

        .testimonials-section {
          background: linear-gradient(135deg, #DBD7C8 0%, #F5EDC8 100%);
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: #0047AB;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(100px);
          animation: float 20s ease-in-out infinite;
        }
/* Footer */
.footer {
  background-color: #3D2925;
  color: #FBF7F4;
  padding: 80px 40px 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  margin-bottom: 60px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 700;
  color: #BDAF62;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-title {
  font-size: 16px;
  font-weight: 700;
  color: #FBF7F4;
  margin-bottom: 10px;
}

.footer-text {
  font-size: 14px;
  color: rgba(251, 247, 244, 0.7);
  line-height: 1.6;
}

.footer-link {
  font-size: 14px;
  color: rgba(251, 247, 244, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: #BDAF62;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-icon {
  font-size: 24px;
  text-decoration: none;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid rgba(251, 247, 244, 0.1);
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 14px;
  color: rgba(251, 247, 244, 0.5);
}

.footer-links {
  display: flex;
  gap: 15px;
  align-items: center;
}

.footer-bottom-link {
  font-size: 14px;
  color: rgba(251, 247, 244, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: #BDAF62;
}

.footer-divider {
  color: rgba(251, 247, 244, 0.3);
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fffaf6;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  object-fit: contain;
}

.main-logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px 40px;
  background: radial-gradient(
    circle at center,
    rgba(255, 236, 220, 0.6),
    transparent 70%
  );
}

.main-logo {
  max-width: 320px;
  height: auto;
  animation: fadeScale 0.8s ease forwards;
}
  .nav {
  display: flex;
  gap: 32px; /* THIS FIXES “CONNECTED” LINKS */
  align-items: center;
}

  .nav-link {
  position: relative;
  font-size: 15px;
  font-weight: 500;
  color: #49382D;
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(135deg, #0047AB, #49382D);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #0047AB;
}

.nav-link:hover::after {
  width: 100%;
}

/* CTA Button */
.header-btn {
  background: linear-gradient(135deg, #0047AB, #49382D);
  color: #FFFFFF;
  border: none;
  padding: 12px 22px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 71, 171, 0.25);
}

.header-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 71, 171, 0.4);
}

/* Mobile */
@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .header-content {
    padding: 14px 20px;
  }
}

        .testimonials-section::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: #49382D;
          border-radius: 50%;
          opacity: 0.08;
          filter: blur(80px);
          animation: float 15s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 50px) scale(1.1);
          }
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInDown 1s ease-out;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-label {
          display: inline-block;
          background: linear-gradient(135deg, #0047AB, #49382D);
          color: #FFFFFF;
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 71, 171, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 71, 171, 0.6);
          }
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: #49382D;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 18px;
          color: #49382D;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Carousel Wrapper */
        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          min-height: 450px;
        }

        .testimonials-carousel {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Testimonial Card */
        .testimonial-card {
          position: absolute;
          width: 100%;
          max-width: 700px;
          background: #FFFFFF;
          border-radius: 24px;
          padding: 50px 60px;
          box-shadow: 0 20px 60px rgba(73, 56, 45, 0.15);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          opacity: 0;
          transform: scale(0.8) translateX(100%);
          pointer-events: none;
          border: 2px solid transparent;
        }

        .testimonial-card.active {
          opacity: 1;
          transform: scale(1) translateX(0);
          pointer-events: all;
          border-color: #F5EDC8;
          animation: cardPulse 2s ease-in-out infinite;
        }

        @keyframes cardPulse {
          0%, 100% {
            box-shadow: 0 20px 60px rgba(0, 71, 171, 0.15);
          }
          50% {
            box-shadow: 0 25px 70px rgba(0, 71, 171, 0.25);
          }
        }

        .testimonial-card.prev {
          opacity: 0.3;
          transform: scale(0.85) translateX(-120%);
        }

        .testimonial-card.next {
          opacity: 0.3;
          transform: scale(0.85) translateX(120%);
        }

        .testimonial-card.hidden {
          opacity: 0;
          transform: scale(0.7);
        }

        .testimonial-card:hover.active {
          transform: scale(1.02) translateX(0);
          box-shadow: 0 30px 80px rgba(0, 71, 171, 0.25);
        }

        /* Quote Icon */
        .quote-icon {
          font-size: 80px;
          color: #0047AB;
          opacity: 0.15;
          line-height: 1;
          font-family: Georgia, serif;
          position: absolute;
          top: 20px;
          left: 40px;
        }

        /* Testimonial Content */
        .testimonial-content {
          position: relative;
          z-index: 1;
        }

        .testimonial-text {
          font-size: 20px;
          line-height: 1.8;
          color: #49382D;
          margin: 0 0 30px 0;
          font-style: italic;
        }

        /* Rating Stars */
        .testimonial-rating {
          margin-bottom: 30px;
        }

        .star {
          font-size: 24px;
          color: #DBD7C8;
          margin-right: 4px;
          transition: all 0.3s ease;
        }

        .star.filled {
          color: #F5EDC8;
          filter: brightness(0.85);
          text-shadow: 0 0 10px rgba(245, 237, 200, 0.5);
          animation: starTwinkle 2s ease-in-out infinite;
        }

        @keyframes starTwinkle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .testimonial-card:hover .star.filled {
          color: #F5EDC8;
          filter: brightness(1);
        }

        /* Author Section */
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .author-image {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #0047AB;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover .author-image {
          transform: scale(1.1) rotate(5deg);
          border-color: #49382D;
          box-shadow: 0 8px 20px rgba(0, 71, 171, 0.3);
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 20px;
          font-weight: 700;
          color: #49382D;
          margin: 0 0 4px 0;
        }

        .author-role {
          font-size: 16px;
          color: #0047AB;
          margin: 0;
          font-weight: 500;
        }

        /* Navigation Buttons */
        .nav-button {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0047AB, #49382D);
          color: #FFFFFF;
          border: none;
          font-size: 32px;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 71, 171, 0.3);
        }

        .nav-button:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(0, 71, 171, 0.5);
          background: #0047AB;
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        .nav-button.prev {
          left: -80px;
        }

        .nav-button.next {
          right: -80px;
        }

        /* Carousel Indicators */
        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #DBD7C8;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator:hover {
          background: #0047AB;
          transform: scale(1.3);
        }

        .indicator.active {
          background: linear-gradient(135deg, #0047AB, #49382D);
          width: 40px;
          border-radius: 6px;
          animation: indicatorPulse 1.5s ease-in-out infinite;
        }

        @keyframes indicatorPulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 71, 171, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 71, 171, 0.6);
          }
        }

        /* Stats Row */
        .stats-row {
          display: flex;
          justify-content: space-around;
          gap: 40px;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

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

        .stat-item {
          text-align: center;
          flex: 1;
          padding: 30px;
          background: #FFFFFF;
          border-radius: 16px;
          transition: all 0.4s ease;
          border: 2px solid transparent;
        }

        .stat-item:hover {
          transform: translateY(-10px);
          border-color: #0047AB;
          box-shadow: 0 20px 40px rgba(0, 71, 171, 0.2);
        }

        .stat-number {
          font-size: 48px;
          font-weight: 700;
          background: linear-gradient(135deg, #0047AB, #49382D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px 0;
          animation: countUp 2s ease-out;
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stat-label {
          font-size: 16px;
          color: #49382D;
          margin: 0;
          font-weight: 500;
          opacity: 0.8;
        }
/* Brands Section */
.brands-section {
  background: #fffaf6;
  padding: 100px 20px;
}

.brands-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.brands-title {
  font-size: 42px;
  font-weight: 700;
  color: #49382D;
  margin-bottom: 12px;
}

.brands-subtitle {
  font-size: 18px;
  color: rgba(73, 56, 45, 0.7);
  margin-bottom: 60px;
}

/* Logo Grid */
.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px;
  align-items: center;
}

.brand-card {
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 35px rgba(0,0,0,0.08);
  transition: all 0.35s ease;
}

.brand-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
}

.brand-card img {
  max-width: 180px;     /* BIGGER */
  max-height: 100px;    /* BIGGER */
  object-fit: contain;
  filter: none;         /* FULL COLOR */
  opacity: 1;           /* FULL VISIBILITY */
  transition: transform 0.3s ease;
}




/* Mobile */
@media (max-width: 768px) {
  .brands-title {
    font-size: 32px;
  }
}

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-button.prev {
            left: -20px;
          }
          
          .nav-button.next {
            right: -20px;
          }
          
          .testimonial-card {
            padding: 40px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 36px;
          }
          
          .testimonial-card {
            padding: 30px;
            max-width: 90%;
          }
          
          .testimonial-text {
            font-size: 18px;
          }
          
          .nav-button {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }
          
          .nav-button.prev {
            left: 10px;
          }
          
          .nav-button.next {
            right: 10px;
          }
          
          .stats-row {
            flex-direction: column;
          }
          
          .stat-number {
            font-size: 36px;
          }
          
          .quote-icon {
            font-size: 60px;
            left: 20px;
          }
            
        }
      `}</style>
{/* Header */}
                  <header className="header">
                    <div className="header-content">
                      <div className="logo">
              <Image
                src="/portfolio/logo.png"
                alt="Bloom Branding Logo"
                width={80}
                height={60}
                priority
              />
              
            </div>
            
                      <nav className="nav">
                        <a href="/ " className="nav-link">Home</a>
                        <a href="/services" className="nav-link">Services</a>
                        <a href="/work" className="nav-link">Our Work</a>
                        <a href="/founder+story" className="nav-link">About</a>
                        <a href="/contact" className="nav-link">Contact</a>
                      </nav>
                      <a href="/contact">
                      <button className="header-btn">Brand Enquiry</button>
                      </a>
                    </div>
                  </header>
      <section className="testimonials-section">
        
        <div className="testimonials-container">
          <div className="section-header">
              
            <span className="section-label">Success Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Discover how we've helped brands amplify their voice and dominate social media
            </p>
          </div>

          <div className="carousel-wrapper">
            <button className="nav-button prev" onClick={prevSlide} aria-label="Previous testimonial">
              ‹
            </button>

            <div className="testimonials-carousel">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`testimonial-card ${
                    index === activeIndex ? 'active' : 
                    index === (activeIndex - 1 + testimonials.length) % testimonials.length ? 'prev' : 
                    index === (activeIndex + 1) % testimonials.length ? 'next' : 'hidden'
                  }`}
                >
                  <div className="quote-icon">"</div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="testimonial-author">
                     
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="nav-button next" onClick={nextSlide} aria-label="Next testimonial">
              ›
            </button>
          </div>

          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <h3 className="stat-number">75+</h3>
              <p className="stat-label">Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100+</h3>
              <p className="stat-label">Brands Bloomed</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4+</h3>
              <p className="stat-label">Years of Experience</p>
            </div>
          </div>
        </div>
     
      </section>
      {/* Brands Section */}
<section className="brands-section">
  <div className="brands-container">
    <h2 className="brands-title">Brands That Trust Us</h2>
    <p className="brands-subtitle">
      Proud to collaborate with brands across industries
    </p>

    <div className="brands-grid">
      {[
        "/portfolio/ambc.png",
        "/portfolio/binal.png",
        "/portfolio/cafewhiteeye.png",
        "/portfolio/dhruv.png",
        "/portfolio/lifebeach.png",
        "/portfolio/izarah.png",
        "/portfolio/tiffinbox.png",
        "/portfolio/petra.png",
        "/portfolio/mansi.png",
        "/portfolio/manisha.png",
        "/portfolio/subhrekha.png",
      ].map((logo, index) => (
        <div className="brand-card" key={index}>
          <Image
            src={logo}
            alt="Brand Logo"
            width={140}
            height={80}
          />
        </div>
      ))}
    </div>
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
              <a href="/founder+story" className="footer-link">About Us</a>
              <a href="/work" className="footer-link">Our Work</a>
              <a href="/founder+story" className="footer-link">Our Story</a>
              <a href="/services" className="footer-link">Services</a>
              <a href="/contact" className="footer-link">Contact</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-title">Get in Touch</h4>
              <p className="footer-text">
                <strong>Email:</strong><br />
               <a href="mailto:hello.bloombranding@gmail.com?subject=Brand Inquiry&body=Hello Bloom Team,">
  Email Us
</a>

                
              </p>
              <p className="footer-text">
                <strong>Phone:</strong><br />
                97270 68674 | 99095 11226
              </p>
              <p className="footer-text">
                <strong>Location:</strong><br />
                Solarium Business Centre, 515, beside Times Corner, Surat, Gujarat 395007
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
    </>
  );
};

export default Testimonials;