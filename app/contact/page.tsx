"use client";

import { useState } from "react";
import styles from "./ContactPage.module.css";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
    budget: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });

      alert("Thank you! We will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectDetails: "",
        budget: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Something went wrong. Please try again or contact us directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🌸</span>
            Bloom Branding
          </div>

          <nav className={styles.nav}>
            <a href="/ " className={styles.navLink}>Home</a>
            <a href="/services" className={styles.navLink}>Services</a>
            <a href="/work" className={styles.navLink}>Our Work</a>
            <a href="/founder+story" className={styles.navLink}>About</a>
            <a href="/contact" className={styles.navLinkActive}>Contact</a>
          </nav>

          <button className={styles.headerBtn}>Brand Enquiry</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroBlue}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Let’s Collaborate</h1>

          <p className={styles.heroSubtitle}>
            Whether you're starting fresh or reimagining your brand, we’re here to
            help you bring it to life — strategically and beautifully.
          </p>

          <p className={styles.heroNote}>
            Share a few details about your project and we’ll take it from there.
          </p>
        </div>
      </section>



      <div className={styles.mainContent}>
        {/* Contact Form */}
        <div className={styles.formContainer}>
          <h2>Brand Enquiry Form</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label>
              Name<span className={styles.required}>*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email<span className={styles.required}>*</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </label>

            <label>
              Phone<span className={styles.required}>*</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </label>

            <label>
              Project Details<span className={styles.required}>*</span>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder="Brief description of your project"
                required
              />
            </label>

            <label>
              Estimated Budget
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Optional"
              />
            </label>

            <label>
              Preferred Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className={styles.contactCta} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit & Collaborate"}
            </button>
          </form>
        </div>

        {/* Why Choose Us */}
        <div className={styles.infoContainer}>
          <h2>Why Choose Bloom Branding?</h2>
          <ul>
            <li>Creative & Innovative Designs</li>
            <li>Professional Approach & Timely Delivery</li>
            <li>Custom Solutions Tailored to Your Brand</li>
            <li>Dedicated Support & Collaboration</li>
          </ul>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <p>Email: contact@bloombranding.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
            <div className={styles.socialLinks}>
              <a href="#">LinkedIn</a> | <a href="#">Instagram</a> |{" "}
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Map / Placeholder */}
      <div className={styles.mapContainer}>
        <h2>Our Location</h2>
        <div className={styles.mapPlaceholder}>
          Google Maps Embed Here
        </div>
      </div>
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

export default ContactPage;
