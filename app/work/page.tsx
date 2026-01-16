"use client";
import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock testimonials data - in real app, fetch from backend
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      image: "https://i.pravatar.cc/150?img=1",
      text: "This agency transformed our social media presence completely. Our engagement increased by 300% in just 3 months!",
      rating: 5,
      type: "text"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      image: "https://i.pravatar.cc/150?img=13",
      text: "Professional, creative, and results-driven. They understand branding like no other agency we've worked with.",
      rating: 5,
      type: "text"
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Founder, StyleHub",
      image: "https://i.pravatar.cc/150?img=5",
      text: "The team's creativity and strategic approach to our social media campaigns exceeded all expectations. Highly recommend!",
      rating: 5,
      type: "text"
    },
    {
      id: 4,
      name: "David Martinez",
      role: "CMO, BrandVision",
      image: "https://i.pravatar.cc/150?img=12",
      text: "From strategy to execution, everything was flawless. Our brand voice is now consistent and engaging across all platforms.",
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
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="author-image"
                      />
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
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">300%</h3>
              <p className="stat-label">Avg. Growth</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50M+</h3>
              <p className="stat-label">Reach Generated</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;