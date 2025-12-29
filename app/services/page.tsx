import React from 'react';
import "./service.css";

const ContentProductionWebsite: React.FC = () => {
  return (
    <div className="website-container">
      {/* PAGE 1 - CONTENT CREATION */}
      <section id="page1" className="page">
        <div className="blue-title-section">
          <h1>CONTENT<br />CREATION</h1>
        </div>

        <div className="top-right-section"></div>

        <div className="bottom-left-section">
          <div className="camera-container">
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop&q=90"
              alt="Professional camera setup"
            />
          </div>
        </div>

        <div className="description-section">
          <div className="note-paper"></div>
          <div className="description-content">
            <h2>
              Discovery & Ideation: We dive deep into your brand guidelines and
              target audience to brainstorm concepts that stick.
            </h2>
            <p>Production: Our team of designers and editors</p>
          </div>
        </div>
      </section>

      {/* PAGE 2 - PRODUCTION */}
      <section id="page2" className="page">
        <div className="text-left-section">
          <div className="leaf-stamp">
            <svg
              className="leaf-svg"
              viewBox="0 0 60 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M30 5 Q20 15 17 28 Q14 40 20 50 Q24 58 30 62 Q36 58 40 50 Q46 40 43 28 Q40 15 30 5 Z" fill="#7c9473" stroke="#4a6041" strokeWidth="1.5" />
              <path d="M30 10 L30 60" stroke="#4a6041" strokeWidth="1.5" />
              <path d="M30 20 Q35 23 30 26" stroke="#4a6041" strokeWidth="1" fill="none" />
              <path d="M30 30 Q25 33 30 36" stroke="#4a6041" strokeWidth="1" fill="none" />
              <path d="M30 40 Q35 43 30 46" stroke="#4a6041" strokeWidth="1" fill="none" />
              <path d="M30 50 Q25 53 30 56" stroke="#4a6041" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <h3>Production That<br />Tells Stories</h3>
          <p>
            From concept to final cut, we produce visual experiences that don&apost
            just look beautiful—they drive action, emotion, and results.
          </p>
        </div>

        <div className="production-title-section">
          <h2>PRODUCTION</h2>
        </div>

        <div className="team-image-section">
          <div className="team-container">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&q=90"
              alt="Creative team meeting"
            />
          </div>
        </div>
      </section>

      {/* PAGE 3 - SOCIAL MEDIA BRANDING */}
      <section id="page3" className="page">
        <div className="workspace-image-section">
          <div className="workspace-container">
            <img
              src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&h=800&fit=crop&q=90"
              alt="Social media workspace"
            />
          </div>
        </div>

        <div className="social-title-section">
          <h2>Social Media Branding</h2>
        </div>

        <div className="social-description-section">
          <p>
            Social media isn&apost just about posting—it&aposs about creating a movement.
            We build brands that people connect with, engage with, and champion.
          </p>
        </div>
      </section>

      {/* PAGE 4 - FRONTEND EXPERIENCES */}
      <section id="page4" className="page">
        <div className="frontend-title-section">
          <h2>Frontend-oriented<br />digital experiences</h2>
        </div>

        <div className="frontend-description-section">
          <h3>Experiences<br />Users Love</h3>
          <p>
            Your digital presence is your handshake with the world. We create
            frontend experiences that are beautiful, blazing fast, and built to convert.
          </p>
        </div>

        <div className="outdoor-image-section">
          <div className="outdoor-container">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&q=90"
              alt="Person working outdoors"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentProductionWebsite;
