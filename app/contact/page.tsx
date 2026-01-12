"use client";

import { useState } from "react";
import styles from "./ContactPage.module.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
    budget: "",
    startDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call or server action
    console.log("Form submitted:", formData);
    alert("Thank you! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectDetails: "",
      budget: "",
      startDate: "",
    });
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>Let's Collaborate</h1>
        <p>Share your project details and we’ll get back to you promptly.</p>
      </div>

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

            <button type="submit" className={styles.contactCta}>
              Submit & Collaborate
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
    </div>
  );
};

export default ContactPage;
